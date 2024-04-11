import { useEffect, useState } from "react";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import CatalogItem from "./CatalogItem/CatalogItem";
import s from './CatalogPage.module.css'
import { NavLink } from "react-router-dom";
export default function CatalogPage({search, setCart, cart}){
    const [products, setProducts] = useState([]);
    const [sort, setSort] = useState(0);
    const [category, setCategory] = useState(0);

    async function fetchProducts(){
        const response = await fetch('https://dummyjson.com/products');
        const products = await response.json();
        setProducts(products.products);
    }
    useEffect(()=>{
        fetchProducts();
    },[]);

    function sorting(sort, products){
        switch(sort){
            case '2': return [...products].sort((a,b)=>a.price-b.price);
            case '1': return [...products].sort((a,b)=>b.price-a.price);
            case '3': return [...products].sort((a,b)=>a.title.localeCompare(b.title));
            default: return products;
        }
    }

    const categoriesSet = new Set(products.map(product=> product.category));
    const categories = Array.from(categoriesSet);
    

    const filteredProducts = products.filter(product=>product.title.toLowerCase().includes(search.toLowerCase()) &&
    (product.category==category||category==0));
    const filteredSortedProducts = sorting(sort, filteredProducts);
    return(
        <div className="container">
            <div style={{padding: '50px 0'}} className={s.catalog}>
                <h2 style={{marginBottom: "30px"}} className="catalog__title">Каталог товаров</h2>
                <div style={{display:'flex', flexDirection:'column', alignItems: 'flex-start', gap: '20px', paddingBottom: '30px'}} className={s.catalog__sort}>
                <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                    <ToggleButton id="tbg-radio-1" value={1} onClick={(e)=>{setCategory(0)}}>
                        Все товары
                    </ToggleButton>
                    {
                        categories.map((category, id)=>{
                            return <ToggleButton id={`tbg-radio-${id+2}`} value={id+2} onClick={(e)=>{setCategory(category)}}>
                                {category}
                            </ToggleButton>
                        })
                    }
                </ToggleButtonGroup>
                    
                    <select onChange={(e)=>setSort(e.target.value)} style={{padding:'5px', border: '1px solid #0d6efd', borderRadius: '5px'}} className={s.select}>
                        <option value="0">По умолчанию</option>
                        <option value="1">Сначала дорогие</option>
                        <option value="2">Сначала дешевые</option>
                        <option value="3">По алфавиту</option>
                    </select>
                </div>
                <div className={s.catalog__row}>
                {
                    filteredSortedProducts.map((product)=>{
                        return <CatalogItem {...product} setCart={setCart} cart={cart}/>
                    })
                }
                </div>
                
            </div>
        </div>
    )
}