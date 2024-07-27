"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { getUploadUrl, uploadProduct } from "./actions";
import { useFormState } from "react-dom";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreview(url);
    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
    }
  };
  const [state, action] = useFormState(uploadProduct, null);
  return (
    <div className="p-5">
      <form action={action} className="flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="cursor-pointer bg-cover bg-center border-2 aspect-square flex items-center justify-center flex-col rounded-md text-neutral-300 border-neutral-300 border-dashed"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview ? (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-neutral-400 text-sm">Upload Image</div>
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input
          name="title"
          required
          placeholder="title"
          type="text"
          errors={state?.fieldErrors.title}
        />
        <Input
          name="price"
          required
          placeholder="price"
          type="number"
          errors={state?.fieldErrors.price}
        />
        <Input
          name="description"
          required
          placeholder="description"
          type="text"
          errors={state?.fieldErrors.description}
        />
        <Button text="Upload" />
      </form>
    </div>
  );
}
