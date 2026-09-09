import { Dialog } from "@mui/material";
import IconButton from "./IconButton";
import { FaXmark } from "react-icons/fa6";
import { Controller, useForm, type Control } from "react-hook-form";
import type { IUserRequest } from "~/utils/interfaces";
import Button from "./Button";
import TextField from "./TextField";
import useAxios from "../hooks/useAxios";
import { useToast } from "../hooks/useToast";

function FormField({
  name,
  label,
  control,
}: {
  name: keyof IUserRequest;
  label: string;
  control: Control<IUserRequest>;
}) {
  return (
    <div>
      <span className="text-sm text-gray-600">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField id={name} value={field.value} onChange={field.onChange} />
        )}
      />
    </div>
  );
}

export default function CreateUserModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (save: boolean) => unknown;
}) {
  const { control, handleSubmit, reset } = useForm<IUserRequest>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
      city: "",
      country: "",
    },
  });

  const axiosInstance = useAxios();
  const {toast} = useToast();
  const submit = (req: IUserRequest) => {
    axiosInstance
      .post("/users", req)
      .then(() => {
        onClose(true);
        reset();
        toast("Successfully created user", {severity: "success", duration: 5000})
      })
      .catch((e) => {
        toast("Failed to create user", { severity: "error", duration: 5000 });
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose(false);
        reset();
      }}
    >
      <div >
        <div className="border-b-gray-300 border-b-solid border-b-1 pt-5 pb-2 px-3 m-1 flex justify-between">
          <h6 className="text-2xl">Create User</h6>
          <div className="text-2xl">
            <IconButton
              
              icon={<FaXmark />}
              onClick={() => {
                onClose(false);
                reset();
              }}
            />
          </div>
        </div>
        <div className="m-5">
        <form onSubmit={handleSubmit(submit)}>
          <div className="flex gap-4 my-5">
            <FormField name="firstName" label="First Name" control={control} />
            <FormField name="lastName" label="Last Name" control={control} />
          </div>
          <div className="flex gap-4 my-5">
            <FormField name="email" label="Email" control={control} />
            <FormField name="profession" label="Profession" control={control} />
          </div>
          <div className="flex gap-4 my-5">
            <FormField name="city" label="City" control={control} />
            <FormField name="country" label="Country" control={control} />
          </div>
          <div className="px-3 flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </form>
        </div>
      </div>
    </Dialog>
  );
}
