import React, { useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { Products } from "./pages/Products";
import { Product } from "./pages/Product";
import { Header } from "./components/Header";
import {
  initialState as themeInitialState,
  themeReducer,
} from "./store/Theme/reducer";
import { ThemeContext } from "./store/Theme/context";
import {
  initialState as cartInitialState,
  cartReducer,
} from "./store/Cart/reducer";
import { CartContext } from "./store/Cart/context";
import {
  initialState as favoritesInitialState,
  favoritesReducer,
} from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";
import { Favorites } from './pages/Favorites';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/products",
    element: (
      <>
        <Header />
        <Products />
      </>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <>
        <Header />
        <Product />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <Header />
        <Cart />
      </>
    ),
  },
  {
    path: "/favorites",
    element: (
      <>
        <Header />
        <Favorites />
      </>
    ),
  },
]);

export default function App() {

  const [themeState, themeDispatch] = useReducer(
    themeReducer,
    themeInitialState
  );

  const [favoritesState, favoritesDispatch] = useReducer(
    favoritesReducer,
    favoritesInitialState
  );

  const [cartState, cartDispatch] = useReducer(cartReducer, cartInitialState);

  const themeContextValue = {
    themeState,
    themeDispatch,
  };

  const favoritesContextValue = {
    favoritesState,
    favoritesDispatch
  };


  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      <ThemeContext.Provider value={themeContextValue}>
        <FavoritesContext.Provider value={favoritesContextValue}>
          <div className="App primary">
            <RouterProvider router={router} />
          </div>
        </FavoritesContext.Provider>
      </ThemeContext.Provider>
    </CartContext.Provider>
  );
}