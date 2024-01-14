import React from "react";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <p>Home Page</p>
          </Layout>
        }
      />
      <Route
        path="/search"
        element={
          <Layout>
            <p>Search Page</p>
          </Layout>
        }
      />

      <Route
        path="/register"
        element={
          <Layout>
            <Register />
          </Layout>
        }
      />

      <Route
        path="/sign-in"
        element={
          <Layout>
            <Login />
          </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <p>ANy Page</p>
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
