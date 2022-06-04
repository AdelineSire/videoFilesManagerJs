import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
	return (
		<Container>
			<Row>
				<h4>File Upload</h4>
				<FileUpload />
			</Row>
		</Container>
	);
};

export default App;
