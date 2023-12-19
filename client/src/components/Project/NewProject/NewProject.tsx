import useOutsideClick from "../../../hooks/useOutsideClick";

import { MouseEvent, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Modal from "../../shared/Modal";
import ProjectForm from "./NewProjectForm";
import { ActivationButton } from "./ActivationButton";

interface NewProjectInputs {
  projectName: string;
}

export default function NewProject() {
  const [isActive, setIsActive] = useState(false);
  const newProjectRef = useRef(null);

  const dismissForm = () => {
    setIsActive(false);
  };

  const activateForm = (e: MouseEvent) => {
    e.stopPropagation();
    setIsActive(true);
  };

  useOutsideClick([newProjectRef], () => {
    if (isActive) {
      setIsActive(false);
    }
  });

  const schema = z.object({
    projectName: z
      .string()
      .trim()
      .min(3, { message: "Project name must be at least 3 characters" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<NewProjectInputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<NewProjectInputs> = async (data) => {
    try {
      console.log("New Project", data);
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return isActive ? (
    <>
      <Modal
        title={"New Project"}
        isModalActive={isActive}
        dismissModal={dismissForm}
      >
        <div ref={newProjectRef}>
          <ProjectForm onSubmit={onSubmit} />
        </div>
      </Modal>
    </>
  ) : (
    <ActivationButton activateForm={activateForm} />
  );
}
