import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../Context/AppContext";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Failed to save hotel.", type: "ERROR" });
    },
  });

  const handleSave = (hotelTypes: FormData) => {
    mutate(hotelTypes);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
