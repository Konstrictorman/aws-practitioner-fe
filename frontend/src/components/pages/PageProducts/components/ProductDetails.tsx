import {
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
	Typography,
} from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import { useRooms, useBookRoom } from '~/queries/products';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookIcon from '@mui/icons-material/Book';
import { Room } from '~/models/Room';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BookingRequest } from '~/models/BookingRequest';
import { useState, useMemo, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { buildUtcISOString } from '~/utils/utils';
import moment from 'moment';

const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);
	const image = queryParams.get('image');

	const { data: products = [], isLoading } = useRooms();
	const room: Room | undefined = products.find((room) => room.id === id);

	const [open, setOpen] = useState(false);

	const queryClient = useQueryClient();
	const { mutate: bookRoom, isLoading: isBooking } = useBookRoom();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
		control,
	} = useForm<BookingRequest>({
		//resolver: yupResolver(BookingRequestSchema),
		defaultValues: {
			roomId: room?.id ?? '',
			startDate: moment().utc().format('YYYY-MM-DDTHH:mm:ss[Z]'),
			finishDate: moment().utc().add(1, 'day').format('YYYY-MM-DDTHH:mm:ss[Z]'),
			amount: 0,
			clientEmail: '',
		},
	});

	const nights = useMemo(() => {
		const startDate = watch('startDate');
		const finishDate = watch('finishDate');

		if (startDate && finishDate) {
			const start = moment.utc(startDate);
			const end = moment.utc(finishDate);
			return end.diff(start, 'days');
		}
		return 0;
	}, [watch('startDate'), watch('finishDate')]);

	const calculatedAmount = useMemo(() => {
		return nights > 0 && room?.price ? nights * room.price : 0;
	}, [nights, room?.price]);

	useEffect(() => {
		setValue('amount', calculatedAmount);
	}, [calculatedAmount, setValue]);

	const onSubmit = (data: BookingRequest) => {
		const withTimes = {
			...data,
			startDate: buildUtcISOString(data.startDate),
			finishDate: buildUtcISOString(data.finishDate),
		};

		bookRoom(withTimes, {
			onSuccess: (response) => {
				console.log('Booking Response:', response);

				const bookingId = response.data; // ✅ Extract bookingId from response
				queryClient.invalidateQueries('available-rooms');
				alert(`Room booked successfully! Your booking code is: ${bookingId}`);
				setOpen(false);
				reset();
			},
			onError: (error) => {
				console.error(error);
				alert('Booking failed.');
			},
		});
	};

	if (isLoading || !room) return <Typography>Loading...</Typography>;

	return (
		<>
			<Typography variant='h4'>{room.title}</Typography>
			<CardMedia
				sx={{ pt: '30%' }}
				image={image ?? 'xx'}
				title={room.title}
			/>
			<Typography>{room.description}</Typography>
			<Typography>Location: {room.location}</Typography>
			<Typography>Capacity: {room.capacity}</Typography>
			<Typography>Price per night: ${room.price}</Typography>
			<Typography>Room Type: {room.roomType}</Typography>

			<IconButton onClick={() => navigate('/')}>
				<ArrowBackIcon color='secondary' />
				<Typography>Volver</Typography>
			</IconButton>

			<IconButton onClick={() => setOpen(true)}>
				<BookIcon color='info' />
				<Typography>Reservar</Typography>
			</IconButton>

			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				maxWidth='sm'
				disableEscapeKeyDown={isBooking}>
				<DialogTitle>Book This Room</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						{isBooking ? (
							<CircularProgress
								size={48}
								color='inherit'
							/>
						) : (
							<>
								<TextField
									label='Start Date'
									type='date'
									fullWidth
									margin='normal'
									InputLabelProps={{ shrink: true }}
									{...register('startDate')}
									error={!!errors.startDate}
									helperText={errors.startDate?.message}
								/>

								<TextField
									label='Finish Date'
									type='date'
									fullWidth
									margin='normal'
									InputLabelProps={{ shrink: true }}
									{...register('finishDate')}
									error={!!errors.finishDate}
									helperText={errors.finishDate?.message}
								/>

								<TextField
									label='Client Email'
									type='email'
									fullWidth
									margin='normal'
									{...register('clientEmail')}
									error={!!errors.clientEmail}
									helperText={errors.clientEmail?.message}
								/>

								<Typography
									variant='body1'
									sx={{ mt: 2 }}>
									Nights: {nights}
								</Typography>
								<Typography variant='h6'>
									Total Amount: ${calculatedAmount}
								</Typography>
							</>
						)}
					</DialogContent>

					<DialogActions>
						<Button
							onClick={() => setOpen(false)}
							disabled={isBooking}>
							Cancel
						</Button>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							disabled={isBooking}>
							Submit Booking
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
};

export default ProductDetails;
