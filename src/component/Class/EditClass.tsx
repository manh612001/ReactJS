import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";
import { Breadcrumb, Button, Container, Form } from "react-bootstrap";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import makeAnimated from "react-select/animated";
import * as ClassService from "../../Service/ClassService";
import * as StudentService from "../../Service/StudentService";
import Header from "../Header";

const EditClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [students, setStudents] = useState([]);
  const [studentIds, setStudentIds] = useState([]);

  const animatedComponents = makeAnimated();

  const getClass = async () => {
    const data = await ClassService.GetById(id);
    setName(data.name);
    setStudentIds(data.studentIds);
    console.log(data);
  };
  const getStudent = () => {
    StudentService.GetAll()
    .then((res) => {
      setStudents(res);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  type Option = {
    value: number;
    label: string;
  };
  type Student = {
    id: number;
    name: string;
    date: Date;
    address: string;
    phoneNumber: string;
  };
  const st: Student[] = students;
  const options: Option[] = st.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  

  const [studentList, setStudentList] = useState<Option[]>([
    { value: 3, label: "Student 1" },
    { value: 4, label: "Student 2" },
  ]);

  console.log("test", studentList);
  useEffect(() => {
    getClass();
    getStudent();
  }, []);
  const StudentIds = studentList.map((item) => ({
    id: item.value,
    name: item.label,
    dob: "2023-04-24T08:54:51.953Z",
    phoneNumber: "string",
    address: "string",
  }));
  const handleSubmit = () => {
    ClassService.Edit(id, { id, name, StudentIds })
      .then((res) => {
        navigate("/Class");
        alert(res);
        console.log(res);
        getStudent();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Header />

      <Container>
        <Breadcrumb>
          <Breadcrumb.Item>
            <FontAwesomeIcon icon={faHouse} />
            <Link to="/Home"> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Class">Class List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Edit</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-center" id="boxEditClass">
          <Form>
            <h2 className="text-center">Edit Class</h2>
            <Form.Group>
              <Form.Label>Class</Form.Label>
              <Form.Control name="Class" value={name} onChange={(e) =>setName(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Students:</Form.Label>
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={studentList}
                isMulti
                options={options}
                onChange={(val: any) => setStudentList(val)}
              />
            </Form.Group>
            <Form.Control type="hidden" value={id} />
            <Button onClick={handleSubmit} id="btnEdit" className="mt-2 w-100">
              Save
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
};
export default EditClass;
