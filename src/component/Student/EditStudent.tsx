import { useEffect, useState } from "react";
import { Form, Button, Breadcrumb, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header";
import * as StudentService from "../../Service/StudentService";
import "./Student.css";
import request from "../../api/request";
const EditStudent = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const getStudent = async () => {
    const { data } = await StudentService.GetById(id);
    setName(data.name);
    setDob(data.dob.split("T")[0]);
    setAddress(data.address);
    setPhoneNumber(data.phoneNumber);
    console.log(data.dob);
  };
  useEffect(() => {
    getStudent();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name,
      dob: dob,
      address: address.toString(),
      phoneNumber: phoneNumber,
      id: id,
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name not null"),
      dob: Yup.string().required("Dob Not null"),
      address: Yup.string().required("Address not null"),
      phoneNumber: Yup.string().required("PhoneNumber not null"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic here
      StudentService.Edit(`Student/${id}`,formik.values)
      .then((res) => {
        navigate("/Student");
        alert(res.data);
        console.log(res);
        getStudent();
      })
      .catch((error) => {
        console.log(error);
      });
    },
  });
  console.log(formik.values);

  return (
    <div>
      <Header />
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Student">Student List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-center" id="boxEditStudent">
          <Form method="Post" onSubmit={formik.handleSubmit}>
            <h2 className="text-center">Edit Student</h2>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name:<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Student 1"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name && (
                <p className="text-danger">{formik.errors.name}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Day of birth:<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={formik.values.dob}
                onChange={formik.handleChange}
              />
              {formik.errors.dob && (
                <p className="text-danger">{formik.errors.dob}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Address:<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Ha Noi"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
              {formik.errors.address && (
                <p className="text-danger">{formik.errors.address}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                PhoneNumber:<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                placeholder="0123456789"
                onChange={formik.handleChange}
              />
              {formik.errors.phoneNumber && (
                <p className="text-danger">{formik.errors.phoneNumber}</p>
              )}
              <Form.Control type="hidden" value={id} />
            </Form.Group>
            <Button
              variant="success"
              id="btnEdit"
              className="w-100"
              type="submit"
            >
              Edit
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};
export default EditStudent;
