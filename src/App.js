import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import {Routes, Route} from 'react-router-dom';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/Cart/CartPage';
import { useState } from 'react';
function App() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  return (
    <>
      <Header search={search} setSearch={setSearch}/>
      <Routes>
        <Route path='/' element={<CatalogPage setCart={setCart} cart={cart} search={search}/>}/>
        <Route path=':id' element={<ProductPage setCart={setCart} cart={cart}/>}/>
        <Route path='/cart' element={<CartPage cart={cart}/>}/>
      </Routes>
    </>
  );
}

export default App;
