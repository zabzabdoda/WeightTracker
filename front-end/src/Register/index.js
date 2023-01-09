import React, { useEffect, useState } from "react";
import { Alert, Button, Container, FloatingLabel, Form } from "react-bootstrap";
import NavigationBar from "../NavBar/NavigationBar";
import { useLocalState } from "../util/useLocalStorage";

const Register = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function register() {
    setShowError(false);
    setErrorMsg("");
    const userPass = {
      username: username,
      password: password,
      confirmpassword: confPass,
    };
    fetch("/api/auth/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body: JSON.stringify(userPass),
    })
      .then((response) => {
        console.log(response.status);
        return Promise.all([
          response.status,
          response.json(),
          response.headers,
        ]);
      })
      .then(([status, body, headers]) => {
        if (status === 200) {
          console.log(body);
          setJwt(headers.get("authorization"));
          window.location.href = "/exercises";
        } else if (status === 201) {
          console.log(body.msg);
          setErrorMsg(body.msg);
          setShowError(true);
        }
      });
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
      <Container className="w-50">
        <Alert show={showError} variant="danger">
          {errorMsg}
        </Alert>
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
                type="text"
                onChange={(e) => setUsername(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group>
            <FloatingLabel
              controlId="confirmpassword"
              label="Confirm Password"
              className="mb-3"
              htmlFor="password"
            >
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfPass(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="text-center">
            <Button
              className="w-50"
              id="submit"
              variant="success"
              onClick={() => register()}
            >
              Register
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
