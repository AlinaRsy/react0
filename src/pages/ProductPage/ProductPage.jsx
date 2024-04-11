import {useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import s from './ProductPage.module.css'
import ModalElem from '../../components/Modal/Modal';
export default function ProductPage({setCart, cart}){
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [products, setProducts] = useState([]);
    async function fetchProducts(){
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        setProducts(products.products);
    }
    useEffect(()=>{
        fetchProducts();
    },[]);
    const {id} = useParams();
    const product = products.find(product=>product.id == +id);
    return(
        <>
            
                {
                    product&&
                    (
                    <div className="container">
                        <div className="product">
                            <div className={s.product__img}>
                                <img src={product.images[0]} alt="#" />
                            </div>
                            <div className={s.product__body}>
                                <h3 className={s.product__title}>{product.title}</h3>
                                {
                                    product.stock>34?<Button style={{width:'100%'}} onClick={()=>setCart([product.id, ...cart])} variant="primary">Добавить в корзину</Button>:
                                    <Button style={{width:'100%'}} variant="primary" onClick={handleShow}>Заявка на товар</Button>
                                }
                            </div>
                        </div>
                        <ModalElem handleClose={handleClose} product={product.title} show={show}/>
                    </div>
                    )
                }
                
            
        </>
    )
}