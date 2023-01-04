import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { commerce } from './lib/commerce'
import { Products, Navbar, Cart } from './components'

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
    const item = await commerce.cart.add(productid, quantity)

    setCart(item.cart)
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
          <Route path='cart' element={<Cart cart={cart} />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
