import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
  Card,
  Dropdown,
  Badge,
  Modal,
  ModalTitle,
  InputGroup,
} from "react-bootstrap";
import React from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";
import ajax from "../services/FetchService";
import NavigationBar from "../NavBar/NavigationBar";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import axios from "axios";

const Dashboard = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [exercises, setExercises] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    ajax("/api/exercises", "get", jwt).then((exercisesRequest) => {
      setExercises(exercisesRequest);
    });
  }, []);

  function showModalFunc() {
    ajax("/api/exercises/new", "get", jwt).then((exercisesRequest) => {
      setNewExercise(exercisesRequest);
    });
    setShowModal(true);
  }

  function updateExercise(text, prop) {
    var newEX = { ...newExercise };
    newEX[prop] = text;
    setNewExercise(newEX);
  }

  function cancelModal() {
    ajax(`/api/exercises/${newExercise.id}`, "delete", jwt).then(() => {
      setShowModal(false);
    });
  }

  function createExerciseCategory() {
    var formData = new FormData();
    console.log(image);
    if (image) {
      formData.append("imageFile", image, image.name);
    }
    formData.append("name", newExercise.name);
    formData.append("description", newExercise.description);
    //formData.append("body", JSON.stringify(newExercise));
    var headers = new Headers();
    headers.append("Authorization", `Bearer ${jwt}`);
    var config = {
      method: "post",
      url: "/api/exercises",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        Authorization: `Bearer ${jwt}`,
      },
      data: formData,
    };
    axios(config).then((response) => {
      console.log(response.data);
      setExercises(response.data);
      setShowModal(false);
    });

    /* ajax("/api/exercises", "post", jwt, newExercise).then((response) => {
      setExercises(response);
      setShowModal(false);
    });*/
  }

  return (
    <Container>
      <NavigationBar></NavigationBar>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Create New Exercise Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup>
              <InputGroup.Text id="name">Name</InputGroup.Text>
              <Form.Control
                placeholder="Workout Name"
                onChange={(e) => {
                  updateExercise(e.target.value, "name");
                }}
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text id="description">Description</InputGroup.Text>
              <Form.Control
                onChange={(e) => {
                  updateExercise(e.target.value, "description");
                }}
                as="textarea"
                placeholder="Describe the Tonal layout"
              />
            </InputGroup>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => createExerciseCategory()}>
            Create
          </Button>
          <Button onClick={() => cancelModal()} variant="danger">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Container className="m-4 text-center d-flex flex-row justify-content-center">
        <Button
          className="m-3"
          variant="success"
          onClick={() => showModalFunc()}
        >
          Create Exercise Category
        </Button>
      </Container>
      <Container
        fluid
        className="d-grid gap-5 justify-content-center text-center"
        style={{ gridTemplateColumns: "repeat(auto-fill, 18rem)" }}
      >
        {(() => {
          if (exercises !== null && exercises.length !== 0) {
            return exercises.map((exercise) => (
              <Card
                onClick={() => {
                  window.location.href = `/exercises/${exercise.id}`;
                }}
                key={exercise.id}
                style={{ cursor: "pointer", width: "18rem", height: "18rem" }}
              >
                <Card.Body
                  className="d-flex flex-column justify-content-spacing"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Card.Title>
                    <u>{exercise.name}</u>
                  </Card.Title>
                  <Card.Text>
                    <Container
                      style={{
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    >
                      <ResponsiveContainer width={"100%"} height={200}>
                        <LineChart
                          margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
                          data={exercise.exercises}
                          className="mb-3"
                          style={{ cursor: "pointer" }}
                        >
                          <XAxis dataKey="date" tick={false}></XAxis>
                          <YAxis dataKey="weight" tick={false}></YAxis>
                          <Line
                            type="monotone"
                            dataKey="weight"
                            stroke="#ff7300"
                            yAxisId={0}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Container>
                  </Card.Text>
                </Card.Body>
              </Card>
            ));
          } else {
            return (
              <Container className="text-center">
                <p>No Exercise Categories to display</p>
              </Container>
            );
          }
        })()}
      </Container>
    </Container>
  );
};

export default Dashboard;
