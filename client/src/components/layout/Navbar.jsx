import React from 'react';
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navBar.css';

const AppNavbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogin = () => navigate('/login');
  const handleRegister = () => navigate('/register');
  const handleHome = () => navigate('/');
  const handlePosts = () => navigate('/');

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        {/* Optional Logo */}
        <Navbar.Brand onClick={handleHome} style={{ cursor: 'pointer' }}>
          <Image
            src="/logo.png" // Place logo in public/logo.png
            alt="Logo"
            height="40"
            className="d-inline-block align-top logo-img"
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/create')}>Posts</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-2 text-light">Signed in as {user.name}</Navbar.Text>
                <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Button variant="outline-light" className="me-2" onClick={handleLogin}>Login</Button>
                <Button variant="light" onClick={handleRegister}>Sign Up</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
