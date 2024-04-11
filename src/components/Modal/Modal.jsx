import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
export default function ModalElem({show, product, handleClose}){
    const [message, setMessage] = useState('');
    function order(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch('https://dummyjson.com/products/add', {
            method: "POST",
            body: formData
        })
        e.target.reset();
        setMessage('Заявка отправлена');
    }
    return(
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Оформить заявку на товар {product}</Modal.Title>
        </Modal.Header>
        <form onSubmit={order}>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Закрыть
            </Button>
            <Button type='submit' variant="primary">
                Оформить заявку
            </Button>
            </Modal.Footer>
        </form>
        {message}
      </Modal>
    )
}