import { useContext } from "react";
import { AuthDispatchContext } from "../context/authContext";
import { registerUser } from "../services/authService";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "../components/shared/Navbar";

import { User } from "../types/types";

export default function Register() {
  type RegistrationFormInputs = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

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
    formState: { errors },
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

  const dispatch = useContext(AuthDispatchContext);

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    try {
      const { confirmPassword, ...userData } = data;
      const response = await registerUser(userData);

      console.log("Register User:", response);

      if (!response.user) {
        return;
      }

      if (!dispatch) {
        return;
      }

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (err) {}
  };

  return (
    <div className="bg-cover bg-no-repeat bg-top grow h-full">
      <Navbar />

      <div className="mx-auto my-20 p-10 rounded-lg bg-slate-700 py-12 w-[700px] h-auto shadow-2xl">
        <h1 className="text-white font-extrabold text-3xl mb-8">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 grid grid-flow-col gap-4">
            <div>
              <label
                className="font-semibold text-slate-200 text-sm mb-1 block"
                htmlFor="first-name"
              >
                First name
              </label>
              <input
                id="first-name"
                type="text"
                placeholder="First name"
                className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                {...register("firstName")}
              />
              {errors.firstName?.message && (
                <div className="text-sm  mt-1 text-red-300">
                  {errors.firstName?.message}
                </div>
              )}
            </div>
            <div>
              <label
                className="font-semibold text-slate-200 text-sm mb-1 block"
                htmlFor="first-name"
              >
                Last name
              </label>
              <input
                id="last-name"
                type="test"
                placeholder="Last name"
                className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
                {...register("lastName")}
              />
              {errors.lastName?.message && (
                <div className="text-sm  mt-1 text-red-300">
                  {errors.lastName?.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label
              className="font-semibold text-slate-200 text-sm mb-1 block"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
              {...register("email")}
            />
            {errors.email?.message && (
              <div className="text-sm mt-1 text-red-300">
                {errors.email?.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label
              className="font-semibold text-slate-200 text-sm mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
              {...register("password")}
            />
            {errors.password?.message && (
              <div className="text-sm  mt-1 text-red-300">
                {errors.password?.message}
              </div>
            )}
          </div>

          <div className="mb-8">
            <label
              className="font-semibold text-slate-200 text-sm mb-2"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className="text-slate-50 w-full text-start p-3 rounded flex justify-between bg-slate-800 items-center  focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <div className="text-sm  mt-1 text-red-300">
                {errors.confirmPassword?.message}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-slate-100 rounded font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
