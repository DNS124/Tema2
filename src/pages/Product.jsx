import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { addToCart } from '../store/Cart/actions';
import { CartContext } from '../store/Cart/context';
import { FavoritesContext } from '../store/Favorites/context';
import { addToFavorites } from '../store/Favorites/actions';

export function Product() {
  const { cartDispatch } = useContext(CartContext);
  const { favoritesDispatch } = useContext(FavoritesContext);
  let { id } = useParams();
  id = decodeURI(id);
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [id]);

  const productInfo = product.gameInfo || {};
  const { thumb, name, salePrice, retailPrice } = productInfo;

  function handleAddToCart(product) {
    const actionResult = addToCart(product);
    cartDispatch(actionResult);
  }

  function handleAddToFavorites(product) {
    const actionResult = addToFavorites(product);
    favoritesDispatch(actionResult);
  }

  return (
    <div className="d-flex my-3 mx-2">
      <div className="w-50">
        <div>
          <img src={thumb} alt="" />
        </div>
        <h1>{name}</h1>
      </div>
      <div className="w-50">
        <p>Preț întreg: {retailPrice}$</p>
        <p>
          Preț redus: <span className="text-danger">{salePrice}$</span>
        </p>
        <Button variant="success"
          onClick={() => {
            handleAddToCart({
              id,
              image: thumb,
              name: name,
              price: retailPrice
            })
          }}>Adaugă în coș</Button>
        <Button variant="info"
          onClick={() => {
            handleAddToFavorites({
              id,
              image: thumb,
              name: name,
              price: retailPrice
            })
          }}>Adaugă la favorite</Button>
      </div>
    </div>
  );
}
