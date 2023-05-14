import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Outlet, useParams } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Link to="/"> HomePage </Link>
      <Link to="/cart"> CartPage </Link>
      <Link to="/users"> UserPage </Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id/*" element={<Outlet />}>
          <Route path="" element={<ProductDetailPage />} />
          <Route path="notice/" element={<ProductDetailNoticePage />} />
        </Route>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/users/*" element={<Outlet />}>
          <Route path="" element={<UserPage />} />
          <Route path="coupon/" element={<UserCouponPage />} />
          <Route path="question/" element={<UserQuestionPage />} />
          <Route path="notice/" element={<UserNoticePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

function HomePage() {
  return <h1>This is HomePage</h1>
}

function CartPage() {
  return <h1>This is CartPage</h1>
}

function UserPage() {
  return <h1>This is UserPage</h1>
}

function ProductDetailPage() {
  const location = useLocation();
  console.log(location)
  return <h1>This is Product Detail Page</h1>
}

function ProductDetailNoticePage() {
  // const location = useLocation();
  // const path = location.pathname.split('/')[2]
  return (
    <>
      <h1>This is Product Detail Notice Page</h1>
      {/* <p>path: {path}</p> */}
    </>
  )
}

function UserCouponPage() {
  const location = useLocation();
  const { id } = useParams()

  console.log(id);
  return (<>
    <h1>This is UserCouponPage</h1>
    <p>This is coupon list of {id}</p>
  </>)
}

function UserQuestionPage() {
  const location = useLocation();
  console.log(location)
  return <h1>This is UserQuestionPage</h1>
}

function UserNoticePage() {
  const location = useLocation();
  console.log(location)
  return <h1>This is UserNoticePage</h1>
}

export default App;