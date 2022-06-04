import ProgressBar from 'react-bootstrap/ProgressBar';

const Progress = ({ percentage }) => {
	return <ProgressBar animated now={percentage} label={`${percentage}%`} />;
};

export default Progress;
