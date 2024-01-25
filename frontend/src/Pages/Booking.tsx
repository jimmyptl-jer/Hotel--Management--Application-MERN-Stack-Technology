// import { useSearchContext } from "../Context/SearchContext";
// import { useParams } from "react-router-dom";
// import { useQuery } from "react-query";
// import * as apiClient from "../api-client";
// import { useEffect, useState } from "react";
// import BookingForm from "../forms/BookingForm/BookingForm";
// import BookingDetailsSummary from "../Components/BookingDetailsSummary";
// import { useAppContext } from "../Context/AppContext";
// import { Elements } from "@stripe/react-stripe-js";

// // Main Booking Component
// const Booking = () => {
//   // State for the number of nights
//   const [numberOfNights, setNumberOfNights] = useState(0);

//   // Accessing search context and extracting hotelId from URL parameters
//   const search = useSearchContext();
//   const { hotelId } = useParams();

//   // Query to fetch hotel details by hotelId
//   const { data: hotel } = useQuery(
//     "fetchHotelById",
//     () => apiClient.fetchHotelById(hotelId as string),
//     {
//       enabled: !!hotelId,
//     },
//   );

//   // Query to create a payment intent
//   const { data: paymentIntentData } = useQuery(
//     "createPaymentIntent",
//     () =>
//       apiClient.createPaymentIntent(
//         hotelId as string,
//         numberOfNights.toString(),
//       ),
//     {
//       enabled: !!hotelId && numberOfNights > 0,
//     },
//   );

//   // Accessing stripePromise from AppContext
//   const { stripePromise } = useAppContext();

//   // Calculate the number of nights based on check-in and check-out dates
//   useEffect(() => {
//     if (search?.checkIn && search?.checkOut) {
//       const night =
//         Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
//         (1000 * 60 * 60 * 24);
//       setNumberOfNights(Math.ceil(night));
//     }
//   }, [search.checkIn, search.checkOut]);

//   // Query to fetch current user details
//   const { data: currentUser } = useQuery(
//     "fetchCurrentUser",
//     apiClient.fetchCurrentUser,
//   );

//   // If hotel data is not available, return an empty fragment
//   if (!hotel) {
//     return <></>;
//   }

//   // Render the BookingDetailsSummary and BookingForm components
//   return (
//     <div className="grid md:grid-cols-[1fr_2fr]">
//       {/* Display booking details summary */}
//       <BookingDetailsSummary
//         checkIn={search.checkIn}
//         checkOut={search.checkOut}
//         adultCount={search.adultCount}
//         childCount={search.childCount}
//         numberOfNights={numberOfNights}
//         hotel={hotel}
//       />
//       {/* Display booking form if there is a logged-in user and payment intent data */}
//       {currentUser && paymentIntentData && (
//         <Elements
//           stripe={stripePromise}
//           options={{
//             clientSecret: paymentIntentData.clientSecret,
//           }}
//         >
//           <BookingForm
//             currentUser={currentUser}
//             paymetIntent={paymentIntentData}
//           />
//         </Elements>
//       )}
//     </div>
//   );
// };

// // Export the Booking component as the default export
// export default Booking;
