import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:3002';

const FileUpload = () => {
	const [file, setFile] = useState('');
	const [message, setMessage] = useState('');
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		try {
			await axios.post(`${apiUrl}/upload`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				onUploadProgress: (progressEvent) => {
					setUploadPercentage(
						parseInt(
							Math.round((progressEvent.loaded * 100) / progressEvent.total)
						)
					);
				},
			});

			// Clear percentage
			setTimeout(() => setUploadPercentage(0), 3000);
			setTimeout(() => setFile(''), 3000);
			setMessage('File Uploaded');
		} catch (err) {
			if (err.response.status === 500) {
				setMessage('There was a problem with the server');
			} else {
				setMessage(err.response.data.msg);
			}
			setUploadPercentage(0);
		}
	};

	return (
		<Row>
			{message ? <Message msg={message} /> : null}
			<Form onSubmit={onSubmit}>
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Control type='file' onChange={onChange} />
				</Form.Group>
				<Progress percentage={uploadPercentage} />
				<Button type='submit' variant='primary'>
					Upload
				</Button>
			</Form>
		</Row>
	);
};

export default FileUpload;
