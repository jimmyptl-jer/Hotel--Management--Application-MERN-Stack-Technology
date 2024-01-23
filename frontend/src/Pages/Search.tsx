import { useSearchContext } from "../Context/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from "../Components/SearchResultsCard"; // Assuming you have a component for the search result card
import Pagination from "../Components/Pagination";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toString(),
    checkOut: search.checkOut.toString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
  };

  const { data: hotelData } = useQuery({
    queryKey: ["searchHotel", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr]">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/*TODO sort Ope=tions*/}
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
