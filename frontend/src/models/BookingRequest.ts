import * as Yup from 'yup';

export const BookingRequestSchema = Yup.object({
	roomId: Yup.string().required().default(''),
	startDate: Yup.string()
		.required()
		.matches(
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
			'Invalid ISO 8601 date format'
		),
	finishDate: Yup.string()
		.required()
		.matches(
			/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/,
			'Invalid ISO 8601 date format'
		),
	amount: Yup.number().positive().required().default(0),
	clientEmail: Yup.string().email().required().default(''),
});

export type BookingRequest = Yup.InferType<typeof BookingRequestSchema>;
