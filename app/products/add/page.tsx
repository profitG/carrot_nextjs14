"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const onImageChange = () => {};
  return (
    <div className="p-5">
      <form className="flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="cursor-pointer border-2 aspect-square flex items-center justify-center flex-col rounded-md text-neutral-300 border-neutral-300 border-dashed"
        >
          <PhotoIcon className="w-20" />
          <div className="text-neutral-400 text-sm">Upload Image</div>
        </label>
        <input
          onChange={onImageChange}
          type="file"
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input name="title" required placeholder="title" type="text" />
        <Input name="price" required placeholder="price" type="number" />
        <Input
          name="description"
          required
          placeholder="description"
          type="text"
        />
        <Button text="Upload" />
      </form>
    </div>
  );
}
