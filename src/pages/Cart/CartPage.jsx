import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import s from '../CatalogPage/CatalogItem/CatalogItem.module.css'
export default function CartPage({cart}){
    const [products, setProducts] = useState([]);
    async function fetchProducts(){
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        setProducts(products.products);
    }
    useEffect(()=>{
        fetchProducts();
    },[]);
    const cartProducts = cart.map((id)=>products.find(product=>product.id==id));
    return(
        <>
            <div style={{padding:'60px 0'}} className="container cart">
                <h2 className="cart__title">Ваша корзина товаров</h2>
                <div style={{display:'flex', flexDirection:'column', gap:'10px'}} className="cart__list">
                    {   products.length!==0 &&
                        cartProducts.map((product)=>{
                            return (
                                <Card style={{display:'flex', flexDirection:'row'}}>
                                    <Link style={{width: '100px', height: '100px'}} key={product.id} to={`${product.id}`} className={s.card__img}>
                                        <Card.Img className={s.card__img_img} variant="top" src={product.images[0]} />
                                    </Link>
                                    <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text style={{color:'red', fontSize:'24px'}}>
                                        {product.price}$
                                    </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}