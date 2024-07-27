"use server";

import { z } from "zod";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string({ required_error: "photo is required" }),
  title: z.string({ required_error: "title is required" }),
  description: z.string({ required_error: "description is required" }),
  price: z.coerce.number({ required_error: "price is required" }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  };

  const result = productSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          photo: result.data.photo,
          title: result.data.title,
          description: result.data.description,
          price: result.data.price,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` },
    }
  );
  const data = await response.json();
  return data;
}
