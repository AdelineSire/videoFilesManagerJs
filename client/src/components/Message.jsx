import Toast from 'react-bootstrap/Toast';

const Message = ({ msg }) => {
	return (
		<Toast>
			<Toast.Body>{msg}</Toast.Body>
		</Toast>
	);
};

export default Message;
