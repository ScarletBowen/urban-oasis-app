import { useState } from "react";
import Auth from "../utils/auth";

export default function useToken() {
  const [token, setToken] = useState(Auth.getToken());

  const saveToken = (userToken) => {
    Auth.saveToken(userToken);
    setToken(userToken);
  };

  return [token, saveToken];
}
