import IconButton from '@mui/material/IconButton';
import { Room } from '~/models/Room';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

type ViewDetailActionProps = {
	room: Room;
	image: string;
};

const ViewDetailAction = ({ room, image }: ViewDetailActionProps) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/room/${room.id}?image=${image}`);
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
