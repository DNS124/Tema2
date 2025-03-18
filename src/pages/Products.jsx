import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/Cart/actions';
import { useContext } from 'react';
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Products() {
  const { cartDispatch } = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals')
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    cartDispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }


  return (
    <div className="d-flex flex-column align-items-center">
      {products.map((product) => {
        return (
          <Card key={product.dealID} style={{ width: '18rem' }} className="m-3">
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

            <Button
              variant="info"
              onClick={() => {
                handleAddToFavorites({
                  id: product.dealID,
                  image: product.thumb,
                  name: product.title,
                  price: product.salePrice
                });
              }}>Adaugă la favorite</Button>
          </Card>
        );
      })}
    </div>
  );
}
