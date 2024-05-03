import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavbarHome() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand href="/">FloConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="NavLink"><Link to="/" className='link'>Send FLO</Link></Nav.Link>
            <Nav.Link className="NavLink"><Link to="/Balance" className='link'>Balance</Link></Nav.Link>
            <Nav.Link className="NavLink"><Link to="/History" className='link'>History</Link></Nav.Link>          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;