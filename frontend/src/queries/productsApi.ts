import axios, { AxiosError, AxiosResponse } from 'axios';
import API_PATHS from '~/constants/apiPaths';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import React from 'react';
import { Product, ProductsResponse } from '~/models/ProductSchema';

export function useAvailableProducts() {
	return useQuery<ProductsResponse, AxiosError>(
		'available-products',
		async () => {
			const res = await axios.get<ProductsResponse>(
				`${API_PATHS.product}/products/available`
			);
			return res.data;
		}
	);
}

export function useProducts() {
	return useQuery<ProductsResponse, AxiosError>('list-products', async () => {
		const res = await axios.get<ProductsResponse>(
			`${API_PATHS.product}/products/available`
		);
		return res.data;
	});
}

export function useGetProductById(id?: string) {
	return useQuery<ProductsResponse, AxiosError>(
		['product', { id }],
		async () => {
			const res = await axios.get<ProductsResponse>(
				`${API_PATHS.product}/products/${id}`
			);
			return res.data;
		},
		{ enabled: !!id }
	);
}

export function useInvalidateAvailableProducts() {
	const queryClient = useQueryClient();
	return React.useCallback(
		() => queryClient.invalidateQueries('available-products', { exact: true }),
		[]
	);
}

export function useRemoveProductCache() {
	const queryClient = useQueryClient();
	return React.useCallback(
		(id?: string) =>
			queryClient.removeQueries(['product', { id }], { exact: true }),
		[]
	);
}

export function useUpsertAvailableProduct() {
	return useMutation((values: Product) =>
		axios.put<Product>(`${API_PATHS.bff}/product`, values, {
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		})
	);
}

export function useDeleteAvailableProduct() {
	return useMutation((id: string) =>
		axios.delete(`${API_PATHS.product}/product/${id}`, {
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		})
	);
}

export function useAddProductToCart(product: Product) {
	const addProductToCart = () => {
		console.log(
			'The product ' + product?.title + ' has been added to the basket'
		);
	};

	return { addProductToCart };
}

// export function useBookRoom() {
// 	return useMutation<
// 		AxiosResponse<{ bookingId: string }>,
// 		Error,
// 		BookingRequest
// 	>((values: BookingRequest) =>
// 		axios.post<{ bookingId: string }>(
// 			'https://arcn-proyecto-nz0q.onrender.com/api/bookings',
// 			values
// 		)
// 	);
// }

// export function useBookRoom() {
// 	return useMutation((values: BookingRequest) =>
// 		axios.post<BookingRequest>(
// 			'https://arcn-proyecto-nz0q.onrender.com/api/bookings',
// 			values,
// 			{
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Accept: '*/*',
// 					'Cache-Control': 'no-cache',
// 					Pragma: 'no-cache',
// 				},
// 			}
// 		)
// 	);
// }
