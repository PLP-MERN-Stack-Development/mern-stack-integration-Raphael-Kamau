import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-dark text-light py-3 mt-5">
    <Container className="text-center">
      <small>&copy; {new Date().getFullYear()} MERN Blog by Raphael Kamunyu</small>
    </Container>
  </footer>
);

export default Footer;
