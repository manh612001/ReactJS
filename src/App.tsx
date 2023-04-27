import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Student from "./component/Student/Index";
import Class from "./component/Class/Index";
import EditStudent from "./component/Student/EditStudent";
import EditClass from "./component/Class/EditClass";
import { RequireAuth } from "react-auth-kit";
import { useSignOut } from "react-auth-kit";
import "./App.css";
import Login from "./component/Login/Login";
import SignUp from "./component/Registration/SignUp";

const App = () => {
  const singOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    singOut();
    navigate("/Login");
  };
  return (
    <div>
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route
          path="Student"
          element={
            <RequireAuth loginPath="/Login">
              <Student />
            </RequireAuth>
          }
        />
        <Route
          path="Class"
          element={
            <RequireAuth loginPath="/Login">
              <Class />
            </RequireAuth>
          }
        />
        <Route
          path="Student/Edit/:id"
          element={
            <RequireAuth loginPath="/Login">
              <EditStudent />
            </RequireAuth>
          }
        />
        <Route
          path="Class/Edit/:id"
          element={
            <RequireAuth loginPath="/Login">
              <EditClass />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
