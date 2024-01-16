import { useFormContext } from "react-hook-form";
import { HotelType } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3"> Guest</h2>
      <div className=" bg-gray-300 grid grid-cols-2 p-6 gap-5">
        <label className="text-gray-700 text-sm font-semibold">
          Adults Count
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal"
            {...register("adultCount", { required: "This filed is required" })}
          ></input>
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount?.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          Children Count
          <input
            type="number"
            min={0}
            className="border rounded w-full py-2 px-3 font-normal"
            {...register("childCount", { required: "This filed is required" })}
          ></input>
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount?.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
