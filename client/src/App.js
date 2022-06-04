import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import FileUpload from './components/FileUpload';
import FilesList from './components/FilesList';
import axios from 'axios';

const apiUrl = process.env.API_URL || 'http://localhost:3002';

const App = () => {
	const [filesList, setFilesList] = useState([]);

	const getFiles = async () => {
		const response = await axios.get(`${apiUrl}/files`);
		console.log('response.data', response.data);
		return response.data;
	};

	useEffect(() => {
		getFiles().then((files) => {
			setFilesList(files);
			console.log('files in useEffect', filesList);
		});
	}, []);

	return (
		<Container>
			<Row>
				<h4>File Upload</h4>
				<FileUpload />
				<FilesList files={filesList} />
			</Row>
		</Container>
	);
};

export default App;
