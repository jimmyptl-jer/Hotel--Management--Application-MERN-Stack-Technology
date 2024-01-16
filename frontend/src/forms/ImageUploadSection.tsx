import { useFormContext } from "react-hook-form";
import { HotelType } from "./ManageHotelForm";

const ImageUploadSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelType>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>

      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one file must be uploaded";
              }

              if (totalLength > 6) {
                return "You can only upload a maximum of 6 images.";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 font-bold text-sm">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageUploadSection;
