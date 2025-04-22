import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { formatAsPrice } from '~/utils/utils';
import AddProductToCart from '~/components/AddProductToCart/AddProductToCart';
import { useProducts } from '~/queries/products';
import { useEffect, useState } from 'react';

type ImageMap = Record<string, string>; // product.id -> image URL

export default function Products() {
	const { data: products = [], isLoading } = useProducts();
	const api_key = import.meta.env.VITE_PHOTO_API_KEY;
	const [images, setImages] = useState<ImageMap>({});

	useEffect(() => {
		const fetchImages = async () => {
			const newImages: ImageMap = {};
			await Promise.all(
				products.map(async (product, index) => {
					try {
						const res = await fetch(
							`https://api.pexels.com/v1/search?query=toys&per_page=${products.length}`,
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

	if (isLoading) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Grid
			container
			spacing={4}>
			{/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
			{products.map(({ count, ...product }, index) => (
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
							<Typography>{formatAsPrice(product.price)}</Typography>
						</CardContent>
						<CardActions>
							<AddProductToCart product={product} />
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
