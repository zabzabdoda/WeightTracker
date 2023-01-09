import React, { useEffect, useState } from "react";
import ajax from "../services/FetchService";
import { useLocalState } from "../util/useLocalStorage";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Button, Container } from "react-bootstrap";

const Arrows = () => {
  const [exercises, setExercises] = useState(null);
  const [current, setCurrent] = useState(null);
  const [jwt, setJwt] = useLocalState("", "jwt");

  function cycle(change) {
    var index = exercises.findIndex((obj) => obj.id === current.id);
    index += change;
    if (index > exercises.length - 1) {
      setCurrent(exercises[0]);
      window.location.href = `/exercises/${exercises[0].id}`;
    } else if (index < 0) {
      setCurrent(exercises[exercises.length - 1]);
      window.location.href = `/exercises/${exercises[exercises.length - 1].id}`;
    } else {
      setCurrent(exercises[index]);
      window.location.href = `/exercises/${exercises[index].id}`;
    }
    //window.location.href = `/exercises/${current.id}`;
  }

  useEffect(() => {
    const exerciseId = window.location.href.split("/exercises/")[1];
    ajax("/api/exercises", "get", jwt).then((exercisesRequest) => {
      console.log(exercisesRequest);
      setExercises(exercisesRequest);
      setCurrent(
        exercisesRequest[
          exercisesRequest.findIndex((obj) => obj.id === +exerciseId)
        ]
      );
    });
  }, []);

  return (
    <>
      <Container
        style={{
          position: "absolute",
          height: "100%",
          width: 10,
          right: 20,
          top: 0,
        }}
      >
        <Button
          variant="secondary"
          className="sticky-top"
          onClick={() => cycle(1)}
          style={{
            margin: 0,
            padding: 0,
            height: 50,
            width: "30px",
            top: "50%",
          }}
        >
          <BsArrowRight></BsArrowRight>
        </Button>
      </Container>

      <Container
        style={{
          position: "absolute",
          height: "100%",
          width: 10,
          left: -10,
          top: 0,
        }}
      >
        <Button
          variant="secondary"
          className="sticky-top"
          onClick={() => cycle(-1)}
          style={{
            margin: 0,
            padding: 0,
            height: 50,
            width: "30px",
            top: "50%",
          }}
        >
          <BsArrowLeft></BsArrowLeft>
        </Button>
      </Container>
    </>
  );
};

export default Arrows;
