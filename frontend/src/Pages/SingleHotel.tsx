import { useParams } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useQuery } from "react-query";

import * as apiClient from "../api-client";

const SingleHotel = () => {
  const { hotelId } = useParams();

  const {
    data: hotel,
    isLoading,
    isError,
  } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !hotel) {
    return <div>Error fetching hotel details. Please try again later.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{hotel.name}</h2>
      <div className="whitespace-pre-line">{hotel.description}</div>
      <div className="grid grid-cols-5 gap-2">
        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BsMap className="mr-1" />
          {hotel.city}, {hotel.country}
        </div>

        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BsBuilding className="mr-1" />
          {hotel.type}
        </div>

        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BiMoney className="mr-1" />
          {hotel.pricePerNight}
        </div>

        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BiHotel className="mr-1" />
          {hotel.adultCount} adults, {hotel.childCount} children
        </div>

        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
          <BiStar className="mr-1" />
          {hotel.starRating}
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
