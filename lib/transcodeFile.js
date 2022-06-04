const ffmpeg = require('fluent-ffmpeg');

const transcodeFile = async (tempPath, outputPath) => {
	return new Promise((resolve, reject) => {
		ffmpeg(tempPath)
			.videoCodec('libx264')
			.audioCodec('aac')
			.videoBitrate('1000k')
			.fps(25)
			.save(outputPath)
			.on('end', () => {
				console.log('FFmpeg done!');
				resolve();
			})
			.on('error', (err) => {
				console.log('an error happened: ' + err.message);
				return reject(new Error(err));
			});
	});
};

module.exports = transcodeFile;
