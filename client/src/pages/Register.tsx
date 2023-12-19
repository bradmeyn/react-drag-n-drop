import { useContext, useState } from "react";
import { AuthDispatchContext } from "../context/authContext";
import { registerUser } from "../services/authService";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "../components/shared/Navbar/Navbar";
import SubmitButton from "../components/shared/SubmitButton";

import FormInput from "../components/shared/FormInput";
import Alert from "../components/shared/Alert";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

type RegistrationFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const [isAlertShowing, setIsAlertShowing] = useState<boolean>(false);

  const schema = z
    .object({
      firstName: z
        .string()
        .trim()
        .min(2, { message: "First name must be 2 or more letters" }),
      lastName: z
        .string()
        .trim()
        .min(2, { message: "Last name must be 2 or more letters" }),
      email: z.string().trim().email({ message: "Email is required" }).min(1),
      password: z
        .string()
        .trim()
        .min(8, { message: "Password must be 8 or more characters" }),
      confirmPassword: z.string().trim(),
    })
    .refine(
      (data: RegistrationFormInputs) => data.password === data.confirmPassword,
      {
        message: "Passwords must match",
        path: ["confirmPassword"],
      }
    );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const dispatch = useContext(AuthDispatchContext);

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await registerUser(userData);

      console.log(response);

      if (!response.user) {
        return;
      }

      if (!dispatch) {
        return;
      }

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err) {
      console.error("Failed to register", err);
      setIsAlertShowing(true);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-top grow h-full">
      <Alert
        message="Error: Brad has not implemented this yet."
        type="error"
        isShowing={isAlertShowing}
        setIsActive={setIsAlertShowing}
      />
      <Navbar />

      <div className="mx-auto my-20 rounded bg-slate-700 py-12 max-w-xl p-6 h-auto shadow-2xl">
        <h1 className="text-white font-extrabold text-4xl mb-8">Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid md:grid-flow-col md:gap-4">
            <FormInput
              label="First name"
              id="first-name"
              type="text"
              placeholder="First name"
              register={register("firstName")}
              error={errors.firstName?.message}
            />
            <FormInput
              label="Last name"
              id="last-name"
              type="text"
              placeholder="Last name"
              register={register("lastName")}
              error={errors.lastName?.message}
            />
          </div>
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Email"
            register={register("email")}
            error={errors.email?.message}
          />
          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            register={register("password")}
            error={errors.password?.message}
          />
          <FormInput
            label="Confirm password"
            id="confirm-password"
            type="password"
            placeholder="Confirm password"
            register={register("confirmPassword")}
            error={null}
          />
          <div>
            {password === confirmPassword && confirmPassword ? (
              <small className="text-sm mt-1 text-green-300 flex gap-1 items-center">
                <CheckBadgeIcon />
                <div className="ms-2">Passwords match</div>
              </small>
            ) : (
              password &&
              confirmPassword && (
                <small className="text-sm mt-1 text-red-300 flex gap-1 items-center">
                  <ExclamationCircleIcon />
                  <div className="ms-2">Passwords don't match</div>
                </small>
              )
            )}
          </div>

          <SubmitButton
            text="Sign Up"
            isDisabled={isSubmitting}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
