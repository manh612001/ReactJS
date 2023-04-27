import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import axios from "axios";
import { faPlus,faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";  
import {Modal,Form} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import "./Student.css";
import Header from "../Header";




const Student = () => {
  const [students, setStudents] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const getData = async () => {
    const url = "https://localhost:7226/api/Student/StudentWithClass";
    const {data} = await axios.get(url);
    setStudents(data);
    console.log(data)
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: '',
      address: '',
      phoneNumber:''
    },
    validationSchema:Yup.object({
      name:Yup.string().required("Name not null"),
      dob:Yup.string().required("Dob Not null"),
      address:Yup.string().required("Address not null"),
      phoneNumber:Yup.string().required("PhoneNumber not null")
    }),
    onSubmit: values => {
      console.log(values);
      // Handle form submission logic here
      const url = "https://localhost:7226/api/Student/Add";
      axios.post(url,formik.values)
      .then(res=>{
        alert(res.data);
        getData();
        setModalShow(false)
        formik.values.name = '';
        formik.values.dob = '';
        formik.values.address = '';
        formik.values.phoneNumber = '';
      })
      .catch(error =>{
        alert(error);
      });
    },
    
   
  });
  const handleDel = async (id:any) =>{
    if(window.confirm("Are you sure want to delete?"))
    {
      await axios.delete(`https://localhost:7226/api/Student/Delete/${id}`)
      .then(res=>{
        alert(res.data);
        getData();
      })
      .catch(error =>{
        console.log(error);
      })
    }else return;
  }
  
  useEffect(() => {
    getData();
  },[]);

  return (
    <div>
      <Header/>
    
    <Container>
      <Button variant="success" id="btnSave" onClick={() => setModalShow(true)}>
        <FontAwesomeIcon icon={faPlus} /> Create
      </Button>
      <table className="table table-striped table-bordered table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Class</th>
            <th style={{ width:"15%" }}></th>
          </tr>
        </thead>
        <tbody>
          {students.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                {item.classes.map((sub: any) => (
                  <Link to={`/Class/Edit/${sub.id}`}>{sub.name}; </Link>
                ))}
              </td>
              <td>
                  <div className="d-flex justify-content-around">
                    <Link to={`/Student/Edit/${item.id}`}><Button id="btnEdit"><FontAwesomeIcon icon={faPenToSquare} /> Edit</Button></Link>
                    <Button id="btnDel" variant="danger" onClick={()=>handleDel(item.id)}><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                  </div> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >
          Create New Student
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form  method="Post" onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name:<span style={{ color:"red" }}>*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Student 1"  
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {
                  formik.errors.name &&(
                    <p className="text-danger">{formik.errors.name}</p>
                  )
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Day of birth:<span style={{ color:"red" }}>*</span></Form.Label>
                <Form.Control 
                  type="date" 
                  name="dob"
                  value={formik.values.dob} 
                  onChange={formik.handleChange} 
                />
                {
                  formik.errors.dob &&(
                    <p className="text-danger">{formik.errors.dob}</p>
                  )
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Address:<span style={{ color:"red" }}>*</span></Form.Label>
                <Form.Control 
                  type="text"
                  name="address"
                  placeholder="Ha Noi" 
                  value={formik.values.address}  
                  onChange={formik.handleChange}
                />
                {
                  formik.errors.address &&(
                    <p className="text-danger">{formik.errors.address}</p>
                  )
                }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>PhoneNumber:<span style={{ color:"red" }}>*</span></Form.Label>
                <Form.Control 
                  type="text" 
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  placeholder="0123456789"  
                  onChange={formik.handleChange}
                 />
                 {
                  formik.errors.phoneNumber &&(
                    <p className="text-danger">{formik.errors.phoneNumber}</p>
                  )
                }
            </Form.Group>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>setModalShow(false)}>Cancel</Button>
                <Button variant="success" id="btnSave" type="submit">Save Changes</Button>
            </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
    </Container>
    </div>
  );
}

export default Student;
