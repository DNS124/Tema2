import React, { useContext } from "react";
import Button from 'react-bootstrap/Button';
import { CartContext } from "../store/Cart/context";
import { removeFromCart } from "../store/Cart/actions";

export function Cart() {
  const { cartState, cartDispatch } = useContext(CartContext);

  function handleCartRemove(id) {
    const actionResult = removeFromCart(id);
    cartDispatch(actionResult);
  }

  return (
    <div className="mx-2">
      {cartState.products.length === 0 ? (
        <p>Nu sunt produse in cos.</p>
      ) : (
        cartState.products.map((product) => {
          const totalProductPrice = product.price * product.quantity;
          return (
            <div className="m-3" key={product.id}>
              <div
                className="d-flex align-items-center 
                 justify-content-between mb-3">
                <img src={product.image} alt='product image' />
                <strong>{product.name}</strong>
                <p>{product.quantity} X {product.price}$ = {totalProductPrice}$</p>
              </div>
              <Button variant='danger' onClick={() => handleCartRemove(product.id)}>Șterge</Button>

            </div>
          );
        })
      )}
    </div>
  );
}
