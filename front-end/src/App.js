import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import { useLocalState } from "./util/useLocalStorage";
import "bootstrap/dist/css/bootstrap.min.css";
import ExerciseView from "./ExerciseView";
import Logout from "./Logout";
import Register from "./Register";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <Routes>
      <Route
        path="/exercises"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route path="/logout" element={<Logout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/exercises/:id"
        element={
          <PrivateRoute>
            <ExerciseView />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
