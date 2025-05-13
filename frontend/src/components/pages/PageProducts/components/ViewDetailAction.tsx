import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { Product } from '~/models/ProductSchema';

type ViewDetailActionProps = {
	product: Product;
};

const ViewDetailAction = ({ product }: ViewDetailActionProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/products/${product.id}?image=${product.imageUrl}`);
	};

	return (
		<IconButton
			onClick={handleClick}
			size='large'>
			<VisibilityIcon color='secondary' />
		</IconButton>
	);
};

export default ViewDetailAction;
