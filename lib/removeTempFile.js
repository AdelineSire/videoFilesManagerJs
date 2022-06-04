const fs = require('fs');
const fsPromises = fs.promises;

const removeTempFile = async (tempPath) => {
	try {
		await fsPromises.unlink(tempPath);
		console.log('file removed');
	} catch (err) {
		console.error('error in removeTempFile', err);
	}
};

module.exports = removeTempFile;
