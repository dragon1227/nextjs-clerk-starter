import { z } from "zod";

export const ZProduct = z.object({
  id: z.number(),
  title: z.string(),
  price: z.coerce.number(),
  description: z.string().optional(),
  category: z.string(),
  image: z.string(),
  rating: z
    .object({
      rating: z.number().default(0),
      count: z.number().default(0),
    })
    .optional(),
});

export type TProduct = z.infer<typeof ZProduct>;

export const ZProductCreate = ZProduct.omit({ id: true, rating: true });

export type TProductCreate = z.infer<typeof ZProductCreate>;

export const ZProductUpdate = ZProduct.partial().required({ id: true });

export type TProductUpdate = z.infer<typeof ZProductUpdate>;
