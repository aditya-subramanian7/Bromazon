"use server";

import { createCart, getCart } from "@/app/lib/db/cart";
import { prisma } from "@/app/lib/db/prisma";
import { revalidatePath } from "next/cache";

export default async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        items: {
          update: {
            where: { id: articleInCart.id },
            data: {
              quantity: { increment: 1 },
            },
          },
        },
      },
    });
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId: productId,
            quantity: 1,
          },
        },
      },
    });
  }

  revalidatePath("/products/[id]");
}
