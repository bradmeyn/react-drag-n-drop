import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "../components/shared/Navbar";
import { useContext } from "react";
import { AuthDispatchContext } from "../context/authContext";
import { loginUser } from "../services/authService";

export default function Login() {
  type Inputs = {
    email: string;
    password: string;
  };

  const schema = z.object({
    email: z
      .string()
      .trim()
      .email()
      .min(1, { message: "Please enter an email address" }),
    password: z.string().trim().min(1, { message: "Please enter a password" }),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const dispatch = useContext(AuthDispatchContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);

      console.log(response);

      if (!response.user) {
        return;
      }

      if (!dispatch) {
        return;
      }

      dispatch({ type: "LOGIN", payload: response.user });
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-top h-full">
      <Navbar />
      <div className="mx-auto my-20 p-10 rounded bg-slate-700 py-12 w-[30rem] h-auto shadow-2xl">
        <h1 className="text-white font-extrabold text-3xl mb-8">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mb-8">
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

          <button
            type="submit"
            className="p-3 w-full bg-sky-600 hover:bg-sky-600/80 text-white rounded font-bold"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
