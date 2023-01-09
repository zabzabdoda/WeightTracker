import React, { useEffect, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import {
  Accordion,
  Badge,
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  Modal,
} from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import { redirect } from "react-router-dom";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Buffer } from "buffer";
import Arrows from "../Arrows";
import NavigationBar from "../NavBar/NavigationBar";
import ajax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";
import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import axios from "axios";

const ExerciseView = () => {
  const exerciseId = window.location.href.split("/exercises/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newExercise, setNewExercise] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [exercises, setExercises] = useState([]);
  const [image, setImage] = useState(null);

  function save() {
    ajax(
      `/api/exercises/${exerciseId}/newExercise`,
      "post",
      jwt,
      newExercise
    ).then((response) => {
      setExercises(response.exercises);
      setName(response.name);
      setDescription(response.description);
      setShowModal(false);
    });
  }

  function getImageFromBytes(byteString) {
    if (byteString !== null) {
      const base64String = Buffer.from(
        String.fromCharCode(...new Uint8Array(byteString))
      );
      return base64String;
    }
    return null;
  }

  function showModalFunc() {
    ajax(`/api/exercises/${exerciseId}/exercise`, "post", jwt).then(
      (exercisesRequest) => {
        exercisesRequest.date = require("moment")()
          .add(1, "days")
          .format("YYYY-MM-DD");
        setNewExercise(exercisesRequest);
      }
    );
    setShowModal(true);
  }

  function ue() {
    ajax(`/api/exercises/${exerciseId}`, "get", jwt).then(
      (exerciseResponse) => {
        let exerciseData = exerciseResponse.exercises;
        setExercises(exerciseData);
        console.log(exerciseResponse);
        setName(exerciseResponse.name);
        setDescription(exerciseResponse.description);
        setImage(exerciseResponse.image);
        console.log(getImageFromBytes(exerciseResponse.image));
      }
    );
  }

  function shortenDate() {
    var temp = cloneDeep(exercises);
    exercises.forEach(funct);
    return temp.reverse();
    function funct(item, index) {
      temp[index].date = item.date.substring(2);
    }
  }

  function deleteCategory() {
    ajax(`/api/exercises/${exerciseId}`, "delete", jwt).then((response) => {
      //setExercises(response.exercises);

      //setName(response.name);
      //setDescription(response.description);
      window.location.href = "/exercises";
    });
  }

  function cancelModal() {
    ajax(
      `/api/exercises/${exerciseId}/exercise`,
      "delete",
      jwt,
      newExercise
    ).then((response) => {
      setExercises(response.exercises);
      setName(response.name);
      setDescription(response.description);
      setShowModal(false);
    });
  }

  function showEditModalFunct() {
    console.log(name);
    setNewName(name);
    setNewDescription(description);
    setShowEditModal(true);
  }

  function updateExercise(text, prop, obj, setMethod) {
    var newEX = { ...obj };
    newEX[prop] = text;
    setMethod(newEX);
  }

  useEffect(() => {
    ue();
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function deleteExercise(id) {
    console.log(
      exercises.filter((e) => {
        return e.id === id;
      })[0]
    );
    ajax(
      `/api/exercises/${exerciseId}/exercise`,
      "delete",
      jwt,
      exercises.filter((e) => {
        return e.id === id;
      })[0]
    ).then((response) => {
      setExercises(response.exercises);
      setName(response.name);
      setDescription(response.description);
      setShowModal(false);
    });
  }

  function updateExerciseCategory() {
    var formData = new FormData();
    formData.append("name", newName);
    formData.append("description", newDescription);
    var headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);
    var config = {
      method: "post",
      url: `/api/exercises/${exerciseId}/edit`,
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: `Bearer ${jwt}`,
      },
      data: formData,
    };
    axios(config).then((response) => {
      console.log(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setShowEditModal(false);
    });

    /* ajax("/api/exercises", "post", jwt, newExercise).then((response) => {
      setExercises(response);
      setShowModal(false);
    });*/
  }

  return (
    <div className="text-center">
      <NavigationBar></NavigationBar>

      <Modal show={showEditModal}>
        <Modal.Header>
          <Modal.Title>Update Exercise Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <InputGroup.Text id="name">Name</InputGroup.Text>
              <Form.Control
                placeholder="Workout Name"
                defaultValue={newName}
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="description">Description</InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  setNewDescription(e.target.value);
                }}
                as="textarea"
                defaultValue={newDescription}
                placeholder="Describe the Tonal layout"
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => updateExerciseCategory()}>
            Update
          </Button>
          <Button onClick={() => setShowEditModal(false)} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Create New Exercise Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <InputGroup.Text id="name">Weight</InputGroup.Text>
              <Form.Control
                placeholder="Weight lifted"
                type="number"
                onChange={(e) => {
                  updateExercise(
                    e.target.value,
                    "weight",
                    newExercise,
                    setNewExercise
                  );
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="description">Reps</InputGroup.Text>
              <Form.Control
                type="number"
                onChange={(e) => {
                  updateExercise(
                    e.target.value,
                    "reps",
                    newExercise,
                    setNewExercise
                  );
                }}
                placeholder="How many reps did you do?"
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="description">Sets</InputGroup.Text>
              <Form.Control
                type="number"
                onChange={(e) => {
                  updateExercise(
                    e.target.value,
                    "sets",
                    newExercise,
                    setNewExercise
                  );
                }}
                placeholder="How many sets did you do?"
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => save()}>
            Create
          </Button>
          <Button onClick={() => cancelModal()} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="w-90 text-center">
        <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>
          <u>{name}</u>
        </h2>
        <h4 className="m-4">
          {(() => {
            var s = description.split("\n");
            return s.map((line) => {
              return <p>{line}</p>;
            });
          })()}
        </h4>
        {image ? (
          <Container style={{ width: "90%" }}>
            <Image fluid src={`data:image/jpeg;base64,${image}`}></Image>
          </Container>
        ) : (
          <></>
        )}
        {exercises.length > 0 ? (
          <Container
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ResponsiveContainer width={"99%"} height={300}>
              <LineChart data={shortenDate()} className="mb-3">
                <XAxis
                  dataKey="date"
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    offset: -5,
                  }}
                ></XAxis>
                <YAxis
                  dataKey="weight"
                  type="number"
                  label={{
                    value: "Weight",
                    angle: -90,
                    position: "insideLeft",
                  }}
                ></YAxis>

                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#ff7300"
                  yAxisId={0}
                />
              </LineChart>
            </ResponsiveContainer>
          </Container>
        ) : (
          <div className="text-center">
            <h2>No data to display</h2>
          </div>
        )}
        <Button className="m-3" onClick={() => showModalFunc()}>
          Add Workout
        </Button>
        <Accordion className="mt-3">
          {(() => {
            return exercises.map((exercise) => {
              return (
                <Accordion.Item key={exercise.id} eventKey={exercise.id}>
                  <Accordion.Header>{exercise.date}</Accordion.Header>
                  <Accordion.Body>
                    <p>Weight: {exercise.weight}</p>
                    <p>Reps: {exercise.reps}</p>
                    <p>Sets: {exercise.sets}</p>
                    <Button
                      variant="danger"
                      onClick={() => deleteExercise(exercise.id)}
                    >
                      Delete
                    </Button>
                  </Accordion.Body>
                </Accordion.Item>
              );
            });
          })()}
        </Accordion>
      </Container>
      <Button
        variant="success"
        className="my-5 mx-4"
        onClick={() => showEditModalFunct()}
      >
        Edit
      </Button>
      <Button
        variant="danger"
        className="my-5 mx-4"
        onClick={() => deleteCategory()}
      >
        Delete
      </Button>
      <Arrows></Arrows>
    </div>
  );
};

export default ExerciseView;
