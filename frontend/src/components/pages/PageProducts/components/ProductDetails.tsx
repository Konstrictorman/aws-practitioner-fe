import { IconButton, Typography } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import CardMedia from '@mui/material/CardMedia';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookIcon from '@mui/icons-material/Book';
import { useForm } from 'react-hook-form';
import { BookingRequest } from '~/models/BookingRequest';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useAddProductToCart, useGetProductById } from '~/queries/productsApi';
import { Product } from '~/models/ProductSchema';

const ProductDetails = () => {
	const { id } = useParams<{ id: string }>();
	const location = useLocation();
	const navigate = useNavigate();

	const queryParams = new URLSearchParams(location.search);
	const image = queryParams.get('image');

	const { data, isLoading } = useGetProductById(id);
	console.log('data:', JSON.stringify(data, null, 2));
	const products: Product[] = data?.data ?? [];
	const product = products[0];
	product.imageUrl = image;

	const [open, setOpen] = useState(false);
	const { addProductToCart } = useAddProductToCart(product);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
		setValue,
		control,
	} = useForm<Product>({
		//resolver: yupResolver(BookingRequestSchema),
		defaultValues: {
			id: product?.id ?? '',
			title: product?.title ?? '',
			description: product?.description ?? '',
			price: product?.price ?? 0,
			imageUrl:
				'https://images.pexels.com/photos/3952239/pexels-photo-3952239.jpeg?auto=compress&cs=tinysrgb&h=130',
		},
	});

	// const calculatedAmount = useMemo(() => {
	// 	return nights > 0 && room?.price ? nights * room.price : 0;
	// }, [nights, room?.price]);

	// useEffect(() => {
	// 	setValue('amount', calculatedAmount);
	// }, [calculatedAmount, setValue]);

	const onSubmit = (data: BookingRequest) => {
		addProductToCart();
	};

	if (isLoading || !product) return <Typography>Loading...</Typography>;

	return (
		<>
			<Typography variant='h4'>{product.title}</Typography>
			<CardMedia
				sx={{ pt: '30%' }}
				image={product.imageUrl ?? 'xx'}
				title={product.title}
			/>
			<Typography>{product.description}</Typography>
			<Typography>Price: ${product.price}</Typography>

			<IconButton onClick={() => navigate('/')}>
				<ArrowBackIcon color='secondary' />
				<Typography>Volver</Typography>
			</IconButton>

			<IconButton onClick={() => setOpen(true)}>
				<BookIcon color='info' />
				<Typography>Add to cart</Typography>
			</IconButton>
		</>
	);
};

export default ProductDetails;
