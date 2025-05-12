import * as Yup from 'yup';

export type RoomType = 'SINGLE' | 'DOUBLE';

export interface Room {
	id: string;
	roomNumber: string;
	title: string;
	roomType: RoomType; // ✅ Usa el tipo correcto
	capacity: number;
	price: number;
	description: string;
	location: string;
}
