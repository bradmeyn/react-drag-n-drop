import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import FormInput from "../../shared/FormInput";
import SubmitButton from "../../shared/SubmitButton";

interface NewProjectInputs {
  projectName: string;
}

interface ProjectFormProps {
  onSubmit: SubmitHandler<NewProjectInputs>;
}

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const schema = z.object({
    projectName: z
      .string()
      .trim()
      .min(3, { message: "Project name must be at least 3 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewProjectInputs>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Project Name"
        id="projectName"
        type="text"
        placeholder="Enter a project name..."
        register={register("projectName")}
        error={errors.projectName?.message}
      />
      <SubmitButton
        text="Start Project"
        isDisabled={isSubmitting}
        isSubmitting={isSubmitting}
      />
    </form>
  );
}
