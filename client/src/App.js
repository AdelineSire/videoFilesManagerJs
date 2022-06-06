import { useState } from 'react';

import Container from 'react-bootstrap/Container';

import FileUpload from './components/FileUpload';
import FilesList from './components/FilesList';
import Player from './components/Player';

const App = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploaded, setUploaded] = useState(false);
	console.log('selectedFile in app', selectedFile);

	return (
		<Container className='text-center'>
			<h1 className='m-5 fw-bold fst-italic'>Video Manager</h1>
			<FileUpload setUploaded={setUploaded} uploaded={uploaded} />
			<FilesList setSelectedFile={setSelectedFile} uploaded={uploaded} />
			{selectedFile && <Player file={selectedFile} />}
		</Container>
	);
};

export default App;
