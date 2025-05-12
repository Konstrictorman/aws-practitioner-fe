import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { formatAsPrice } from '~/utils/utils';
import AddProductToCart from '~/components/AddProductToCart/AddProductToCart';
import { useAvailableProducts, useRooms } from '~/queries/products';
import { useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import IconButton from '@mui/material/IconButton';
import ViewDetailAction from './ViewDetailAction';

type ImageMap = Record<string, string>; // product.id -> image URL

export default function Products() {
	//const { data: products = [], isLoading } = useAvailableProducts();
	const { data: products = [], isLoading } = useRooms();
	const api_key = import.meta.env.VITE_PHOTO_API_KEY;
	const [images, setImages] = useState<ImageMap>({});

	useEffect(() => {
		const fetchImages = async () => {
			const newImages: ImageMap = {};
			await Promise.all(
				products.map(async (product, index) => {
					try {
						const res = await fetch(
							`https://api.pexels.com/v1/search?query=rooms&per_page=${products.length}`,
							{
								headers: {
									Authorization: api_key,
								},
							}
						);
						const json = await res.json();
						const image = json?.photos?.[index]?.src?.small;
						console.log('thumb:' + image);
						if (image) {
							newImages[product.id!] = image;
						}
					} catch (err) {
						console.error(
							`Failed to fetch image for product ${product.id}`,
							err
						);
					}
				})
			);
			setImages(newImages);
		};

		if (products.length) {
			fetchImages();
		}
	}, [products, api_key]);

	const viewDetail = () => {
		console.log('viewDetail');
	};

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Grid
			container
			spacing={4}>
			{/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
			{products.map(({ ...product }) => (
				<Grid
					item
					key={product.id}
					xs={12}
					sm={6}
					md={4}>
					<Card
						sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
						<CardMedia
							sx={{ pt: '56.25%' }}
							image={images[product.id!] ?? 'xx'}
							title='Image title'
						/>
						<CardContent sx={{ flexGrow: 1 }}>
							<Typography
								gutterBottom
								variant='h5'
								component='h2'>
								{product.title}
							</Typography>
							<Typography
								style={{
									verticalAlign: 'middle',
									display: 'flex',
									marginBottom: '4px',
								}}>
								<LocalAtmIcon
									color='primary'
									fontSize='small'
								/>
								{formatAsPrice(product.price)} per night
							</Typography>
							<Typography
								style={{
									verticalAlign: 'middle',
									display: 'flex',
									marginBottom: '4px',
								}}>
								<PeopleAltIcon
									color='primary'
									fontSize='small'
								/>
								Capacity: {product.capacity}
							</Typography>
							<Typography
								style={{
									verticalAlign: 'middle',
									display: 'flex',
									marginBottom: '4px',
								}}>
								<LocationOnIcon
									color='primary'
									fontSize='small'
								/>
								{product.location}
							</Typography>
						</CardContent>
						<CardActions>
							{/* <AddProductToCart product={product} /> */}
							<ViewDetailAction
								room={product}
								image={images[product.id!]}
							/>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
