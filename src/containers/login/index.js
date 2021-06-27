import React from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

function Login() {
  return (
    <>
      <div className="container">
        <div className="justify-content-center align-items-center">
          <div className="div-center">
            <div className="">
              <div className="text-center header">
                <h5 className="m-0 py-2">WELCOME</h5>
              </div>
              <Form className="py-3 px-4 formBorder">
                <FormGroup>
                  <Label for="username">User Name</Label>
                  <Input
                    type="text"
                    className="form-control borderRadius"
                    id="username"
                    placeholder="User Name"
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    type="password"
                    className="form-control borderRadius"
                    id="Password"
                    placeholder="Password"
                  ></Input>
                </FormGroup>
                <button
                  type="submit"
                  className="btn btn-secondary btn-block w-100 borderRadius"
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
