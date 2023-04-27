import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Table,
} from "react-bootstrap";
import {
  faPlus,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import * as ClassService from "../../Service/ClassService";
import Select from "react-select";

import makeAnimated from "react-select/animated";

import "./index.css";
import Header from "../Header";
import request from "../../api/request";

const Class = () => {
  interface Option {
    value: number;
    label: string;
  }
  interface Student {
    id: number;
    name: string;
    date: Date;
    address: string;
    phoneNumber: string;
  }
  const [modalShow, setModalShow] = useState(false);
  const [listClass, setListClass] = useState([]);
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [studentList, setStudentList] = useState<Option[]>([]);
  const animatedComponents = makeAnimated();

  const getData = async () => {
    const data  = await ClassService.GetAll();
    setListClass(data);
  };
  const handleDelete = async(id: any) => {
    if (window.confirm("Are you sure want to delete?")) {
      ClassService.Delete(id)
      .then((res) => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
    }
    return;
  };

  const resultStudent: Student[] = students;
  const resultOption = resultStudent.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const options: Option[] = resultOption;
  const getStudent = () => {
    request.get('Student/Students')
      .then((res) => {
        setStudents(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(studentList);

  const studentIds = studentList.map((item) => ({
    id: item.value,
    name: item.label,
    dob: "2023-04-24T08:54:51.953Z",
    phoneNumber: "string",
    address: "string",
  }));

  const Id = 0;

  const handleAddClass = () => {
    const addClass = async() =>{
      ClassService.Add({ Id, name, studentIds })
      .then((res) => {
        alert(res.data);
        getData();
        setName("");
        setModalShow(false);
        setStudentList([]);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    addClass(); 
  };

  useEffect(() => {
    getData();
    getStudent();
  }, []);
  return (
    <div>
      <Header />

      <Container>
        <Button
          variant="success"
          id="btnSave"
          onClick={() => setModalShow(true)}
        >
          <FontAwesomeIcon icon={faPlus} /> Create
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Students</th>
              <th style={{ width: "15%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {listClass.map((item: any) => (
              <tr key={item.id}>
                <td>{item.className}</td>
                <td>
                  {item.studentName.map((student: any) => (
                    <Link to={`/Student/Edit/${student.id}`}>
                      {student.name};{" "}
                    </Link>
                  ))}
                </td>
                <td>
                  <div className="d-flex justify-content-around">
                    <Link to={`/Class/Edit/${item.id}`}>
                      <Button variant="primary" id="btnEdit">
                        <FontAwesomeIcon icon={faPenToSquare} /> Edit
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      id="btnDel"
                      onClick={() => handleDelete(item.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add New Class
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form method="Post">
              <FormGroup>
                <FormLabel>Class</FormLabel>
                <FormControl
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
            </Form>
            <FormGroup>
              <FormLabel>Students</FormLabel>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={studentList}
                isMulti
                options={options}
                onChange={(val: any) => setStudentList(val)}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button variant="success" id="btnSave" onClick={handleAddClass}>
              Save Change
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};
export default Class;
