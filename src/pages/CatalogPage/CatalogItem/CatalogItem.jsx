import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import s from './CatalogItem.module.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalElem from '../../../components/Modal/Modal';
export default function CatalogItem({setCart, cart, id, title, images, price, stock}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
        <Card>
            <Link key={id} to={`${id}`} className={s.card__img}>
                <Card.Img className={s.card__img_img} variant="top" src={images[0]} />
            </Link>
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text style={{color:'red', fontSize:'24px'}}>
                {price}$
            </Card.Text>
            {stock>34?<Button style={{width:'100%'}} onClick={()=>setCart([id, ...cart])} variant="primary">Добавить в корзину</Button>:
            <Button style={{width:'100%'}} variant="primary" onClick={handleShow}>Заявка на товар</Button>}
            
            </Card.Body>
        </Card>
        <ModalElem handleClose={handleClose} product={title} show={show}/>
        </>
        
    )
}