import { useEffect, useReducer } from "react";

export const initalState = {
  user: null,
  loading: true,
  errorMessage: null,
};

export const AuthReducer = (initalState, action) => {
  switch (action.type) {
    case "REQUEST":
      return {
        ...initalState,
        loading: true,
        errorMessage: null,
      };
    case "SUCCESS":
      return {
        ...initalState,
        user: action.payload.user,
        loading: false,
      };
    case "ERROR":
      return {
        ...initalState,
        loading: false,
        errorMessage: action.error,
      };
    default:
      throw new Error(`Action type: ${action.type} not found.`);
  }
};

export default function () {
  const [data, dispatch] = useReducer(AuthReducer, initalState);
  const { user, loading, errorMessage } = data;

  const getState = async (url, needUser = true, params) => {
    try {
      const req = !params
        ? fetch(url)
        : fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...params }),
          });

      const res = await req;
      if (res.status === 401)
        return dispatch({ type: "ERROR", error: "Unauthorized" });

      const data = await res.json();

      if (!res.ok)
        return dispatch({ type: "ERROR", error: data.error.message });
      dispatch({ type: "SUCCESS", payload: { user: needUser ? data.user : null } });
    } catch (err) {
      dispatch({ type: "ERROR", error: err.message });
    }
  };

  useEffect(() => {
    dispatch({ type: "REQUEST" });
    getState("/user/me");
  }, []);

  const handleRegister = (params) => {
    dispatch({ type: "REQUEST" });
    getState("/register", true, params);
  };

  const handleLogIn = (params) => {
    dispatch({ type: "REQUEST" });
    getState("/login", true, params);
  };

  const handleLogOut = () => {
    dispatch({ type: "REQUEST" });
    getState("/logout", false, {});
  };

  return {
    loading,
    errorMessage,
    user,
    handleRegister,
    handleLogIn,
    handleLogOut,
  };
}
