// ProductSchema.ts
import * as Yup from 'yup';

export const ProductSchema = Yup.object({
	id: Yup.string().required(),
	title: Yup.string().required().default(''),
	description: Yup.string().default(''),
	price: Yup.number().positive().required().defined().default(0),
	qty: Yup.number().integer().min(0).defined().default(0),
	imageUrl: Yup.string().url().nullable().optional(),
});

// Manually define Product type for complete flexibility
export type Product = {
	id: string;
	title: string;
	description?: string;
	price: number;
	qty: number;
	imageUrl?: string | null; // Explicitly optional and nullable
};

// ProductsResponse type using the flexible Product type
export type ProductsResponse = {
	data: Product[];
	count: number;
};
