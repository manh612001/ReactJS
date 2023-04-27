import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./SignUp.css";
import axios from "axios";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SignUp = () => {
  const [typePassword, setTypePassword] = useState("password");

  const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#$^+=!*()@%&]).{6,}$/;
  const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const changTypePass = () => {
    if (typePassword === "password") setTypePassword("text");
    else setTypePassword("password");
  };
  const formik = useFormik({
    initialValues: {
      Username: "",
      Name: "",
      Email: "",
      Password: "",
      PasswordConfirm: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().required("UserName not null"),
      Name: Yup.string().required("Name not null"),
      Email: Yup.string()
        .matches(emailRegExp, "Invalid Email")
        .required("Email not null"),
      Password: Yup.string()
        .min(6)
        .matches(
          passwordRegExp,
          "Must contain  1 Uppercase,1 lowercase, 1 special character and 1 digit"
        )
        .required("Password Not null"),
      PasswordConfirm: Yup.string()
        .required("Password Not null")
        .oneOf([Yup.ref("Password")], "Passwords must match"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic here
      const url = "https://localhost:7226/api/Account/SignUp";
      axios
        .post(url, formik.values)
        .then((res) => {
          alert(res.data);
          formik.values.Username = "";
          formik.values.Password = "";
          formik.values.Email = "";
          formik.values.PasswordConfirm = "";
        })
        .catch((error) => {
          alert(error.response.data);
        });
      
    },
  });

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-login">
      <div className="box-signup">
        <div className="card-body p-5 ">
          <form method="post" className="text-center" onSubmit={formik.handleSubmit}>
            <h1 className="h3 mb-3" style={{ fontWeight:"700" }}>Sign Up</h1>

            <div className="form-floating mb-2">
              <input
                value={formik.values.Username}
                onChange={formik.handleChange}
                name="Username"
                className="form-control"
                id="floatingInput"
                placeholder="UserName"
              />
              {formik.errors.Username && (
                <p className="text-danger">{formik.errors.Username}</p>
              )}
              <label>UserName:</label>
            </div>
            <div className="form-floating mb-2">
              <input
                value={formik.values.Name}
                onChange={formik.handleChange}
                name="Name"
                className="form-control"
                id="floatingPassword"
                placeholder="Name"
              />
              {formik.errors.Name && (
                <p className="text-danger">{formik.errors.Name}</p>
              )}
              <label>Name:</label>
            </div>
            <div className="form-floating mb-2">
              <input
                value={formik.values.Email}
                onChange={formik.handleChange}
                name="Email"
                className="form-control"
                id="floatingPassword"
                placeholder="name@example.com"
              />
              {formik.errors.Email && (
                <p className="text-danger">{formik.errors.Email}</p>
              )}
              <label>Email:</label>
            </div>
            <div className="form-floating mb-2">
              <input
                value={formik.values.Password}
                onChange={formik.handleChange}
                name="Password"
                type={typePassword}
                className="form-control passwordS"
                id="floatingPassword"
                placeholder="name@example.com"
              />
              {formik.errors.Password && (
                <p className="text-danger">{formik.errors.Password}</p>
              )}
              <label>Password:</label>
            </div>
            <div className="form-floating mb-2">
              <input
                value={formik.values.PasswordConfirm}
                onChange={formik.handleChange}
                name="PasswordConfirm"
                type={typePassword}
                className="form-control passwordS"
                id="floatingPassword"
                placeholder="name@example.com"
              />
              {formik.errors.PasswordConfirm && (
                <p className="text-danger">{formik.errors.PasswordConfirm}</p>
              )}
              <label>PasswordConfirm:</label>
            </div>
            <div className="mb-3 form-check">
              <label>
                <input type="checkbox" id="show-passwordS" onClick={changTypePass}/> Show Password
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div id="back-login">
                
                <Link to={"/Login"}><FontAwesomeIcon icon={faArrowLeft} />Back to login</Link>
              </div>
              <button className="btn btn-sec  w-25 btn-lg" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
