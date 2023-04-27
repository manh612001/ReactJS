import { useSignOut } from "react-auth-kit";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Header = () =>{
    const singOut = useSignOut();
  const navigate = useNavigate();
  const logout = () => {
    singOut();
    navigate("/Login");
  };
    return(
        <Navbar expand="lg" className="mb-3 bg-primary bg-gradient">
          <Container>
            <Navbar.Brand href="#home" className="text-white">
              Students
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link className="nav-link text-white" to="/Student">
                  Student List
                </Link>
                <Link className="nav-link text-white" to="/Class">
                  Class List
                </Link>
                <NavDropdown title="Admin" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
};
export default Header;