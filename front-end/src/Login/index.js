import React, { useState } from "react";
import ajax from "../services/FetchService";
import {
  Container,
  Row,
  Col,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { useLocalState } from "../util/useLocalStorage";
import NavigationBar from "../NavBar/NavigationBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwt, setJwt] = useLocalState("", "jwt");

  function updateUsername(value) {
    setUsername(value);
  }

  function updatePassword(value) {
    setPassword(value);
  }

  function sendLoginRequest() {
    const requestBody = {
      username: username,
      password: password,
    };
    fetch("/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else return Promise.reject("Invalid login attempt");
      })
      .then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "/exercises";
      });
  }

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="w-50">
        <Form className="mt-3">
          <Form.Group className="text-center h1">
            <Form.Label>Login</Form.Label>
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              controlId="username"
              label="Username"
              className="mb-3"
              htmlFor="username"
            >
              <Form.Control
                type="email"
                value={username}
                onChange={(e) => updateUsername(e.target.value)}
                placeholder="name@example.com"
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel
              controlId="password"
              label="Password"
              className="mb-3"
              htmlFor="password"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => updatePassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="text-center">
            <Button
              className="w-50"
              type="submit"
              id="submit"
              variant="success"
              onClick={() => sendLoginRequest()}
            >
              Login
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default Login;
