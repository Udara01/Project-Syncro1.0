import React, {useContext } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import '../../styles/Navbarmain.css';
import { FaBell, FaSearch } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { UserContext } from "../../contexts/UserContext";//import user name and email to the navbar
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Navbarmain = ({ toggleSidebar, isSidebarOpen }) => {

  const navigate = useNavigate();
  const handleSearch = () => {
    alert('Search icon clicked');
  };



  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
      navigate('/login'); // Redirect to login page
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const { user } = useContext(UserContext);//adding user context

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Nav.Link onClick={toggleSidebar}>
        <TiThMenu style={{ fontSize: '20px', marginRight: '20px', marginLeft: '20px' }} />
      </Nav.Link>
      <Navbar.Brand href="#home" className="ml-2">Syncro</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="mx-auto" style={{ width: '600px', position: 'relative', marginTop: '15px' }}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search for something"
              className="mr-sm-2"
              style={{ borderRadius: '20px', paddingRight: '40px' }}
            />
            <InputGroup.Text
              onClick={handleSearch}
              style={{
                position: 'absolute',
                right: '10px',
                top: '30%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FaSearch />
            </InputGroup.Text>
          </InputGroup>
        </Form>
        <Nav className="align-items-center" style={{ marginRight: '20px', marginTop: '10px' }}>
          <Nav.Link href="#notifications">
            <FaBell style={{ fontSize: '20px', marginRight: '20px', marginTop: '-11px' }} />
          </Nav.Link>
          <NavDropdown
            title={<AiOutlineUser style={{ fontSize: '24px' }} />}
            id="basic-nav-dropdown"
            alignRight
          >
            <NavDropdown.Item href="#profile">{user?.username}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>

          </NavDropdown>
          <Nav.Link href="#settings">
            <IoSettingsOutline style={{ fontSize: '22px', marginRight: '40px', marginLeft: '20px' }} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbarmain;
