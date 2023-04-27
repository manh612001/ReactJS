import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import * as AccountService from "../../Service/AccountService";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";



const Login= () => {
    const [typePassword,setTypePassword] = useState('password');
    const navigate = useNavigate();
    const signIn = useSignIn();
    const changTypePass = () =>{
      if(typePassword==='password')
        setTypePassword('text');
      else
        setTypePassword('password');
    };
    const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#$^+=!*()@%&]).{6,}$/
    const formik = useFormik({
        initialValues: {
          Username:'',
          Password:''
        },
        validationSchema:Yup.object({
          Username:Yup.string().required("UserName not null"),
          Password:Yup.string().min(6).matches(passwordRegExp,'Must contain  1 Uppercase,1 lowercase, 1 special character and 1 digit').required("Password Not null"),
        }),
        onSubmit: values => {
          console.log(values);
          // Handle form submission logic here
          
          AccountService.Login(formik.values)
          .then(res=>{
            signIn({
                token:res.data,
                expiresIn:3600,
                tokenType: "Bearer",
                authState: { Username: formik.values.Username },
            });
            navigate("/Student");
            
            console.log(res);
            formik.values.Username = '';
            formik.values.Password = '';
            
          })
          .catch(error =>{
            alert(error.response.data);
          });
        },
      });

  return (
    <div className="bt-login bg-login">
      <div className="vh-100 d-flex justify-content-center align-items-center bg-login">
        <div className="box-login">
          <div className="card-body p-5 text-center">
            <form
              onSubmit={formik.handleSubmit}
              method="post"
              id="form-login"
            >
              <h1 className="h2 mb-3" style={{ fontWeight:"700" }}>Please Sign In</h1>

              <div className="form-floating mb-3 mt-5">
                <Form.Control
                  value={formik.values.Username}
                  onChange={formik.handleChange}
                  className="form-control"
                  id="floatingInput"
                  name="Username"
                  placeholder="name@example.com"
                  />
                  {
                    formik.errors.Username &&(
                      <p className="text-danger">{formik.errors.Username}</p>
                    )
                  }
                
                <label>UserName</label>
                
              </div>
              <div className="form-floating mb-2 ">
                <Form.Control
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                  type={typePassword}
                  name="Password"
                  className="form-control inputPassword"
                  id="floatingPassword"
                  placeholder="Password"
                />
                {
                    formik.errors.Password &&(
                      <p className="text-danger">{formik.errors.Password}</p>
                    )
                }
                <label>Password</label>
            
              </div>
              
              <div className="form-check d-flex justify-content-start my-3">
                <input className="form-check-input" type="checkbox" onClick={changTypePass} value="" id="form1Example3" />
                <label className="form-check-label"> Show Password</label>
              </div>
              <div className="d-flex justify-content-start my-3">
                <span>Don't have an account? </span>
                <Link to={'/SignUp'}>SignUp</Link>
              </div>

              <Button variant="primary" id="btnEdit" className="w-100 btn-lg" type="submit" >Login</Button>
            </form>
            <hr className="my-4"/>

            
          </div>
        </div>
      </div>
    </div>
  
  );
};
export default Login;
