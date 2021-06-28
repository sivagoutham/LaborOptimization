import React, {useState} from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";
import { useHistory } from 'react-router-dom';
function Login() {
  const history = useHistory();
  const userDetails = [{
    username:'floormanager1',
    password:'floormanager1'
  },{
    username:'floormanager2',
    password:'floormanager2'
  },{
    username:'admin',
    password:'admin'
  }]
  const [loginUserName,setLoginUserName]= useState('');
  const [loginPassword,setLoginPassword]= useState('');
  const SigninFn =()=>{
    console.log("Login",loginUserName,loginPassword)
    let loginCheck = userDetails.filter(data=>data.username==loginUserName&&data.password==loginPassword);
    if(loginCheck.length===0){
      alert('login Failed,please check the username and password');
    }else{
      history.push('/dashboard')
    }
  }
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
                    onChange={(e) =>setLoginUserName(e.target.value)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="Password">Password</Label>
                  <Input
                    type="password"
                    className="form-control borderRadius"
                    id="Password"
                    placeholder="Password"
                    onChange={(e) =>setLoginPassword(e.target.value)}
                  ></Input>
                </FormGroup>
                <button
                  type="submit"
                  className="btn btn-secondary btn-block w-100 borderRadius"
                  // onClick={SigninFn}
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
