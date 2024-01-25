import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";

import { useAppContext } from "./Context/AppContext";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import AddHotel from "./Pages/AddHotel";
import Search from "./Pages/Search";
import MyHotels from "./Pages/MyHotels";
import HotelDetail from "./Pages/HotelDetail";
import EditHotel from "./Pages/EditHotel";
// import Booking from "./Pages/Booking";

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
            path="/details/:hotelId"
            element={
              <Layout>
                <HotelDetail />
              </Layout>
            }
          />
        </>
      )}

      {isLoggedIn && (
        <>
          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />
        </>
      )}

      {/* {isLoggedIn && (
        <>
          <Route
            path="/hotel/:hotelId/booking"
            element={
              <Layout>
                <Booking />
              </Layout>
            }
          />
        </>
      )} */}

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
