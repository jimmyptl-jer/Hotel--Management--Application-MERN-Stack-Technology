import { useSearchContext } from "../Context/SearchContext";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import * as apiClient from "../api-client";
import { useEffect, useState } from "react";
import BookingForm from "../forms/BookingForm/BookingForm";
import BookingDetailsSummary from "../Components/BookingDetailsSummary";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    },
  );

  const [numberOfNights, setNumberOfNights] = useState(0);

  useEffect(() => {
    if (search?.checkIn && search?.checkOut) {
      const night =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(night));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser,
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && <BookingForm currentUser={currentUser} />}
    </div>
  );
};

export default Booking;
