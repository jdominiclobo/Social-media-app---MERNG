import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
// import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";

const Login = (props) => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const initialState = {
    username: "",
    password: "",
  };

  const { handleChange, handleSubmit, values } = useForm(
    loginUserCallback,
    initialState
  );

  // const navigate = useNavigate();

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      // navigate("/");
    },
    onError(err) {
      // console.log(
      //   "these are the damn errors",
      //   err.graphQLErrors[0].extensions.errors
      // );
      // if (loading) return "Submitting...";
      // if (err) return `Submission error! ${err.message}`;
      if (
        err &&
        err.graphQLErrors &&
        err.graphQLErrors[0] &&
        err.graphQLErrors[0].extensions &&
        err.graphQLErrors[0].extensions.errors
      )
        setErrors(err.graphQLErrors[0].extensions.errors);
      else setErrors({});
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="form-container">
      <Form
        onSubmit={handleSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={values.username}
          error={errors.username ? true : false}
          onChange={handleChange}
        />

        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={values.password}
          error={errors.password ? true : false}
          onChange={handleChange}
        />

        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => {
              return <li key={value}>{value}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      token
      createdAt
    }
  }
`;

export default Login;
