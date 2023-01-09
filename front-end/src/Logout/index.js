import React, { useEffect } from "react";
import ajax from "../services/FetchService";
import { clearJWT, useLocalState } from "../util/useLocalStorage";

const Logout = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  useEffect(() => {
    setJwt("");
    window.location.href = "/login";
  }, []);

  return <div></div>;
};

export default Logout;
