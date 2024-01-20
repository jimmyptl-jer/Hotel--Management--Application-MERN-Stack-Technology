import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm";
import { useAppContext } from "../Context/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";
const AddHotel = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved", type: "SUCCESS" });
      navigate("/my-hotels");
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
