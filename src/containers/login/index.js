import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from "react-router-dom";
import validation from "./validation";
function Login() {
  const history = useHistory();
  const userDetails = [
    {
      username: "floormanager1",
      password: "floormanager1",
    },
    {
      username: "floormanager2",
      password: "floormanager2",
    },
    {
      username: "admin",
      password: "admin",
    },
  ];
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [dataIsCorrect, setDataISCorrect] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const SigninFn = (e) => {
    e.preventDefault();

    setErrors(validation(values));

    let loginCheck = userDetails.filter(
      (data) =>
        data.username == values.username && data.password == values.password
    );
    if (loginCheck.length === 0) {
      setSuccess(true);
    } else {
      setSuccess(false);
      setDataISCorrect(true);
    }
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0 && dataIsCorrect) {
      history.push("/dashboard");
    }
  }, [errors]);
  return (
    <>
      <div className="container">
        <div className="justify-content-center align-items-center">
          <div className="div-center">
            <div className="">
              <div className="text-center header">
                <h5 className="m-0 py-2">WELCOME</h5>
              </div>
              <Form className="py-3 px-4 formBorder" onSubmit={SigninFn}>
                <FormGroup>
                  <Label for="username">User Name</Label>
                  <Input
                    type="text"
                    className="form-control borderRadius"
                    id="username"
                    placeholder="User Name"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  ></Input>
                  {errors.username && (
                    <small className="text-danger">{errors.username}</small>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    type="password"
                    className="form-control borderRadius"
                    id="Password"
                    placeholder="Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  ></Input>
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                  {!errors.password && success && (
                    <small className="text-danger">
                      login Failed,please check the username and password
                    </small>
                  )}
                </FormGroup>
                <button
                  type="submit"
                  className="btn btn-secondary btn-block w-100 borderRadius"
                  onClick={SigninFn}
                >
                  Sign In
                </button>
                <button type="button" className="btn w-100">
                  Forgot Password
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
