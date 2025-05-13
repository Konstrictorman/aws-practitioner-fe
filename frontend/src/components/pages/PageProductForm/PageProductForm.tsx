import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Formik, Field, FormikProps, Form } from 'formik';
import TextField from '~/components/Form/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import PaperLayout from '~/components/PaperLayout/PaperLayout';
import Typography from '@mui/material/Typography';
import {
	useInvalidateAvailableProducts,
	useRemoveProductCache,
	useUpsertAvailableProduct,
	useGetProductById,
} from '~/queries/productsApi';
import { Product, ProductSchema } from '~/models/ProductSchema';

const initialValues: Product = {
	id: '', // Default to an empty string (not undefined)
	title: '',
	description: '',
	price: 0,
	qty: 0,
	imageUrl: null, // Explicitly null for optional
};

export default function PageProductForm() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const invalidateAvailableProducts = useInvalidateAvailableProducts();
	const removeProductCache = useRemoveProductCache();
	const { data, isLoading } = useGetProductById(id);
	const products: Product[] = data?.data ?? [];
	const count = data?.count ?? 0;

	const { mutateAsync: upsertAvailableProduct } = useUpsertAvailableProduct();
	const onSubmit = (values: Product) => {
		const formattedValues = ProductSchema.cast(values);
		const productToSave: Product = {
			...formattedValues,
			id: id ?? formattedValues.id ?? '',
		};
		return upsertAvailableProduct(productToSave, {
			onSuccess: () => {
				invalidateAvailableProducts();
				removeProductCache(id);
				navigate('/admin/products');
			},
		});
	};

	return (
		<PaperLayout>
			<Typography
				component='h1'
				variant='h4'
				align='center'
				mb={2}>
				{id ? 'Edit product' : 'Create new product'}
			</Typography>
			{isLoading ? (
				<>Loading...</>
			) : (
				<Formik
					initialValues={products[0] ?? initialValues}
					validationSchema={ProductSchema}
					onSubmit={onSubmit}>
					{({ dirty, isSubmitting }: FormikProps<Product>) => (
						<Form autoComplete='off'>
							<Grid
								container
								spacing={2}>
								<Grid
									item
									xs={12}>
									<Field
										component={TextField}
										name='title'
										label='Title'
										fullWidth
										autoComplete='off'
										required
									/>
								</Grid>
								<Grid
									item
									xs={12}>
									<Field
										component={TextField}
										name='description'
										label='Description'
										fullWidth
										autoComplete='off'
										multiline
										required
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={4}>
									<Field
										component={TextField}
										name='price'
										label='Price ($)'
										fullWidth
										autoComplete='off'
										required
									/>
								</Grid>
								<Grid
									item
									xs={12}
									sm={4}>
									<Field
										component={TextField}
										name='count'
										label='Count'
										fullWidth
										autoComplete='off'
										required
									/>
								</Grid>
								<Grid
									item
									container
									xs={12}
									justifyContent='space-between'>
									<Button
										color='primary'
										onClick={() => navigate('/admin/products')}>
										Cancel
									</Button>
									<Button
										type='submit'
										variant='contained'
										color='primary'
										disabled={!dirty || isSubmitting}>
										Save Product
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			)}
		</PaperLayout>
	);
}
