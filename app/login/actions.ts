"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    errors: ["wrong password"],
  };
};
