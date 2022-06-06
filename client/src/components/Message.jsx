import Toast from 'react-bootstrap/Toast';

const Message = ({ msg }) => {
	return (
		<Toast bg='info' className='p-2 m-4'>
			<Toast.Body>{msg}</Toast.Body>
		</Toast>
	);
};

export default Message;
