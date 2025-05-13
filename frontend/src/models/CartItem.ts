import { Product } from '~/models/ProductSchema';

export type CartItem = {
	product: Product;
	count: number;
};
