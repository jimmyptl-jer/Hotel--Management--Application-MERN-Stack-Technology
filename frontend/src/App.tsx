import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";

import { useAppContext } from "./Context/AppContext";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddHotel from "./Pages/AddHotel";
import Search from "./Pages/Search";
import MyHotels from "./Pages/MyHotels";
import SingleHotel from "./Pages/SingleHotel";
import EditHotel from "./Pages/EditHotel";

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
            <Search />
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

      {isLoggedIn && (
        <>
          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route
            path="/my-hotels/details/:hotelId"
            element={
              <Layout>
                <SingleHotel />
              </Layout>
            }
          />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route
            path="/my-hotels/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
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
