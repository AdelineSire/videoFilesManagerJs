import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';

const FilesList = ({ files }) => {
	return (
		<Row>
			<ListGroup defaultActiveKey='none'>
				{files.map((file) => (
					<ListGroup.Item action onClick={() => console.log('file', file)}>
						{file}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Row>
	);
};

export default FilesList;
