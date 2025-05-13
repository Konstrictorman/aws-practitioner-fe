import { rest } from 'msw';
import API_PATHS from '~/constants/apiPaths';
import { availableProducts, orders, products, cart } from '~/mocks/data';
import { CartItem } from '~/models/CartItem';
import { Order } from '~/models/Order';
import { Product, ProductsResponse } from '~/models/ProductSchema';

export const handlers = [
	rest.get(`${API_PATHS.product}/products`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(),
			ctx.json<ProductsResponse>(products)
		);
	}),
	rest.get(`${API_PATHS.product}/products/available`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.delay(),
			ctx.json<ProductsResponse>(availableProducts)
		);
	}),
	rest.get(`${API_PATHS.product}/products/:id`, (req, res, ctx) => {
		const product = availableProducts.data.find((p) => p.id === req.params.id);
		if (!product) {
			return res(ctx.status(404));
		}
		return res(
			ctx.status(200),
			ctx.delay(),
			ctx.json({ data: [product], count: 1 })
		);
	}),

	rest.get(`${API_PATHS.cart}/profile/cart`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.delay(), ctx.json<CartItem[]>(cart));
	}),
	rest.put(`${API_PATHS.cart}/profile/cart`, (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.get(`${API_PATHS.order}/order`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.delay(), ctx.json<Order[]>(orders));
	}),
	rest.put(`${API_PATHS.order}/order`, (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.get(`${API_PATHS.order}/order/:id`, (req, res, ctx) => {
		const order = orders.find((p) => p.id === req.params.id);
		if (!order) {
			return res(ctx.status(404));
		}
		return res(ctx.status(200), ctx.delay(), ctx.json(order));
	}),
	rest.delete(`${API_PATHS.product}/products/:id`, (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.delete(`${API_PATHS.order}/order/:id`, (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.put(`${API_PATHS.order}/order/:id/status`, (req, res, ctx) => {
		return res(ctx.status(200));
	}),
];
