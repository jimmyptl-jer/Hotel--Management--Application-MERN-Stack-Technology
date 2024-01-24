import { UserType } from "../../../../backend/src/shared/types";
import { useForm } from "react-hook-form";

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser }: Props) => {
  const { register, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-3">
      <span className="text-3xl font-bold">Confirm Your Details</span>
      <div className="grid grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border mt-1 rounded w-full py-2 px-3 text-gray-800 bg-gray-400"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border mt-1 rounded w-full py-2 px-3 text-gray-800 bg-gray-400"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>

        <label className="text-gray-700 text-sm font-bold">
          Email
          <input
            className="border mt-1 rounded w-full py-2 px-3 text-gray-800 bg-gray-400"
            type="email"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
    </form>
  );
};

export default BookingForm;
