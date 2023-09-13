import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "../components/shared/Navbar/Navbar";
import { useContext } from "react";
import { AuthDispatchContext } from "../context/authContext";
import { loginUser } from "../services/authService";
import SubmitButton from "../components/shared/SubmitButton";
import FormInput from "../components/shared/FormInput";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();

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
    formState: { errors, isSubmitting, isValid, isDirty },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const dispatch = useContext(AuthDispatchContext);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await loginUser(data.email, data.password);

      if (!response.user) {
        return;
      }

      if (!dispatch) {
        return;
      }

      console.log("Login successful", response.user);
      dispatch({ type: "LOGIN", payload: response.user });

      navigate("/projects");
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <div className="bg-cover bg-no-repeat bg-top h-full">
      <Navbar />
      <div className="mx-auto my-20 rounded bg-slate-700 py-12 max-w-xl p-6 h-auto shadow-2xl">
        <h1 className="text-white font-extrabold text-4xl mb-8">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <SubmitButton
            text="Login"
            isDisabled={isSubmitting}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}
