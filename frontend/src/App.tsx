import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddHotel from "./Pages/AddHotel";
import { useAppContext } from "./Context/AppContext";

const App = () => {
  const { isLoggedIn } = useAppContext();

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

      {isLoggedIn && (
        <>
          <Route
            path="/add-hotel"
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        </>
      )}

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
