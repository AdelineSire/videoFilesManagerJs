import { useState, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { PlayFill, PauseFill } from 'react-bootstrap-icons';

const Player = ({ file }) => {
	const [isPlaying, setIsplaying] = useState(false);
	const vidRef = useRef(null);

	const handlePlayVideo = () => {
		isPlaying ? vidRef.current.pause() : vidRef.current.play();
		setIsplaying(!isPlaying);
	};
	return (
		<Row className='mb-5 d-flex flex-column align-items-center'>
			<video ref={vidRef}>
				<source src={file.filePath} type='video/mp4' />
			</video>

			<Button variant='primary' className='m-3 p-2' onClick={handlePlayVideo}>
				{isPlaying ? <PauseFill /> : <PlayFill />}
			</Button>
		</Row>
	);
};
export default Player;
