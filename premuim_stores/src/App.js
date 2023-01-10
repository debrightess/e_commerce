import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()

    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productid, quantity) => {
    const { cart } = await commerce.cart.add(productid, quantity)

    setCart(cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })

    setCart(cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId)

    setCart(cart)
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty()

    setCart(cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  console.log(cart)

  return (
    <div>
      <BrowserRouter>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          {/* <Route path='/' element={<Navbar totalItems={cart.total_items} />}> */}
          <Route
            index
            element={
              <Products products={products} onAddToCart={handleAddToCart} />
            }
          />
          <Route
            path='cart'
            element={
              <Cart
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleRemoveFromCart={handleRemoveFromCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route path='checkout' element={<Checkout />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
