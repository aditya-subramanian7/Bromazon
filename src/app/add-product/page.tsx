// import { redirect } from "next/dist/server/api-utils";
import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "../lib/db/prisma";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - Bromazon",
};

async function addProduct(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("image-url")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error("Missing required Fields");
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect("/");
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrk=/add-product");
  }

  return (
    <div>
      <h1 className=" text-lg">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          placeholder="Name"
          name="name"
          className=" input-bordered input mb-3 w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          className=" textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          placeholder="Price"
          name="price"
          type="number"
          className=" input-bordered input mb-3 w-full"
        />
        <input
          required
          placeholder="Image URL"
          type="url"
          name="image-url"
          className=" input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className=" btn-primary btn-block btn">
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
}
