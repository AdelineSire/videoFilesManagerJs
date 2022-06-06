import { useState, useRef } from 'react';

import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Message from './Message';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = ({ uploaded, setUploaded }) => {
	const [file, setFile] = useState('');
	const [message, setMessage] = useState('');
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const fileRef = useRef('');
	const apiUrl = process.env.API_URL || 'http://localhost:3002';

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('file', file);

		try {
			const res = await axios.post(`${apiUrl}/upload`, formData, {
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
			console.log('res.status', res.status);
			fileRef.current.value = '';
			console.log(fileRef);

			setMessage('La vidéo a été enregistrée');
			setTimeout(() => {
				setUploadPercentage(0);
				setMessage('');
				setUploaded(!uploaded);
			}, 2000);
		} catch (err) {
			if (err.response.status === 500) {
				setMessage('Il y a eu un problème avec le serveur');
			} else {
				setMessage(err.response.data.msg);
			}
			setUploadPercentage(0);
		}
	};

	return (
		<Row className='mb-5 d-flex flex-column align-items-center'>
			<h2 className='mb-4'>Télécharger une vidéo</h2>
			{message ? <Message msg={message} /> : null}
			<Form onSubmit={onSubmit}>
				<Form.Group controlId='formFile' className='mb-3'>
					<Form.Control ref={fileRef} type='file' onChange={onChange} />
				</Form.Group>
				<Progress percentage={uploadPercentage} />
				<Button type='submit' variant='primary' className='m-3'>
					Upload
				</Button>
			</Form>
		</Row>
	);
};

export default FileUpload;
