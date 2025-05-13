import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { formatAsPrice } from '~/utils/utils';
import { useEffect, useState } from 'react';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import InventoryIcon from '@mui/icons-material/Inventory';
import ViewDetailAction from './ViewDetailAction';
import { useProducts } from '~/queries/productsApi';
import { Product } from '~/models/ProductSchema';

type ImageMap = Record<string, string>; // product.id -> image URL

export default function Products() {
	//const { data: products = [], isLoading } = useAvailableProducts();
	const { data, isLoading } = useProducts();
	const products: Product[] = data?.data ?? [];
	const count = data?.count ?? 0;

	const api_key = import.meta.env.VITE_PHOTO_API_KEY;

	useEffect(() => {
		const fetchImages = async () => {
			const newImages: ImageMap = {};
			await Promise.all(
				products.map(async (product: Product, index: number) => {
					try {
						const res = await fetch(
							`https://api.pexels.com/v1/search?query=${product.title}&per_page=${products.length}`,
							{
								headers: {
									Authorization: api_key,
								},
							}
						);
						const json = await res.json();
						const image = json?.photos?.[index]?.src?.small;

						if (image) {
							product.imageUrl = image;
						}
						console.log('product:', JSON.stringify(product, null, 2));
					} catch (err) {
						console.error(
							`Failed to fetch image for product ${product.id}`,
							err
						);
					}
				})
			);
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
							image={product.imageUrl! ?? 'xx'}
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
								{formatAsPrice(product.price)}
							</Typography>
							<Typography
								style={{
									verticalAlign: 'middle',
									display: 'flex',
									marginBottom: '4px',
								}}>
								<InventoryIcon
									color='primary'
									fontSize='small'
								/>
								In stock: {product.qty}
							</Typography>
						</CardContent>
						<CardActions>
							{/* <AddProductToCart product={product} /> */}
							<ViewDetailAction product={product} />
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
