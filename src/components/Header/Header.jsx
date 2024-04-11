import s from './Header.module.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
export default function Header({search, setSearch}){
  function hendleChange(e) {
    setSearch(e.target.value);
  }
    return(
        <Navbar style={{boxShadow:'2px 6px 10px #e5e5e5'}} expand="lg" className="bg-body-tertiary">
        <Container className='container'>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link style={{textDecoration:'none'}} to="/"><Nav.Link href="/">Главная</Nav.Link></Link>
              <Link style={{textDecoration:'none'}} to="/cart"><Nav.Link href="/cart">Корзина</Nav.Link></Link>
              <Nav.Link href="#" disabled>
                О компании
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Поиск товаров"
                className="me-2"
                aria-label="Search"
                value={search}
                onChange={(e)=>{hendleChange(e)}}
              />
              <Button variant="outline-success">Поиск</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}