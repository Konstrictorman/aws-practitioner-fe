import axios, { AxiosError, AxiosResponse } from 'axios';
import API_PATHS from '~/constants/apiPaths';
import { AvailableProduct } from '~/models/Product';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import React from 'react';
import { Room } from '~/models/Room';
import { BookingRequest } from '~/models/BookingRequest';

export function useAvailableProducts() {
	return useQuery<AvailableProduct[], AxiosError>(
		'available-products',
		async () => {
			const res = await axios.get<AvailableProduct[]>(
				`${API_PATHS.bff}/product/available`
			);
			return res.data;
		}
	);
}

export function useRooms() {
	return useQuery<Room[], AxiosError>('available-rooms', async () => {
		const res = await axios.get<Room[]>(`${API_PATHS.product}/products`);
		return res.data;
	});
}

export function useInvalidateAvailableProducts() {
	const queryClient = useQueryClient();
	return React.useCallback(
		() => queryClient.invalidateQueries('available-products', { exact: true }),
		[]
	);
}

export function useAvailableProduct(id?: string) {
	return useQuery<AvailableProduct, AxiosError>(
		['product', { id }],
		async () => {
			const res = await axios.get<AvailableProduct>(
				`${API_PATHS.bff}/product/${id}`
			);
			return res.data;
		},
		{ enabled: !!id }
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
	return useMutation((values: AvailableProduct) =>
		axios.put<AvailableProduct>(`${API_PATHS.bff}/product`, values, {
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		})
	);
}

export function useDeleteAvailableProduct() {
	return useMutation((id: string) =>
		axios.delete(`${API_PATHS.bff}/product/${id}`, {
			headers: {
				Authorization: `Basic ${localStorage.getItem('authorization_token')}`,
			},
		})
	);
}

export function useBookRoom() {
	return useMutation<
		AxiosResponse<{ bookingId: string }>,
		Error,
		BookingRequest
	>((values: BookingRequest) =>
		axios.post<{ bookingId: string }>(
			'https://arcn-proyecto-nz0q.onrender.com/api/bookings',
			values
		)
	);
}

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
