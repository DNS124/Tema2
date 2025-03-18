import React, { useContext, useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../store/Theme/context';
import { setDarkTheme, setLightTheme } from '../store/Theme/actions';
import { addToCart } from "../store/Cart/actions";
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions'


export function Home() {
  const { themeState, themeDispatch } = useContext(ThemeContext);
  const { cartDispatch } = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals?pageSize=4')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  const theme = themeState.theme


  function handleThemeChange() {
    let actionResult;
    if (theme === "light") {
      actionResult = setDarkTheme();
      themeDispatch(actionResult);
    }
    else if (theme === "dark") {
      actionResult = setLightTheme();
      themeDispatch(actionResult)
    }
  }

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    cartDispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }

  return (
    <div className={theme === "light" ? "px-2 bg-white" : "px-2 bg-dark"}>
      <div className="d-flex flex-column align-items-center">
        <Button
          variant='outline-primary'
          className='mt-3'
          onClick={handleThemeChange}
        >Change Theme</Button>
        {products.map((product) => {
          return (
            <Card
              key={product.dealID}
              style={{ width: '18rem' }}
              className="m-3"
            >
              <Link
                to={`/product/${encodeURI(product.dealID)}`}
                className="text-dark"
              >
                <Card.Img variant="top" src={product.thumb} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text className="text-danger">
                    {product.salePrice} $
                  </Card.Text>
                </Card.Body>
              </Link>
              <Button variant="success" onClick={() => {
                handleAddToCart({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice
                })
              }}>Adaugă în coș</Button>
              <Button variant="info" onClick={() => {
                handleAddToFavorites({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice
                })
              }}>Adaugă la favorite</Button>
            </Card>
          );
        })}
      </div>
      <Link to="/products">Vezi toate produsele din cos</Link>
    </div>
  );
}
