import { useState, useEffect } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

const FilesList = ({ setSelectedFile, uploaded }) => {
	const [filesList, setFilesList] = useState([]);
	const apiUrl = process.env.API_URL || 'http://localhost:3002';

	const getFiles = async () => {
		const response = await axios.get(`${apiUrl}/files`);
		console.log('response.data', response.data);
		setFilesList(response.data);
	};

	useEffect(() => {
		getFiles();
	}, [uploaded]);

	return (
		<Row className='mb-5 d-flex flex-column align-items-center'>
			<h2 className='mb-4'>Lire une vidéo</h2>
			<ListGroup className='p-3'>
				{filesList.map((file) => (
					<ListGroup.Item
						key={file.fileName}
						action
						onClick={() => setSelectedFile(file)}
						className='m-0'
					>
						{file.fileName}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Row>
	);
};

export default FilesList;
