const express = require('express');
const fileUpload = require('express-fileupload');
const transcodeFile = require('./lib/transcodeFile');
const removeTempFile = require('./lib/removeTempFile');
const cors = require('cors');
const fs = require('fs');
const fsPromises = fs.promises;

const app = express();
app.use(cors());
app.use(fileUpload());

app.post('/upload', async (req, res) => {
	if (req.files === null) {
		return res.status(400).json({ msg: 'No file uploaded' });
	}

	const file = req.files.file;
	const tempPath = `${__dirname}/public/uploads/temp/${file.name}`;
	const outputPath = `${__dirname}/public/uploads/video/${file.name}`;

	try {
		await file.mv(tempPath, (err) => {
			if (err) {
				console.error('error in move file', err);
				return res.status(500).send(err);
			}
		});
		await transcodeFile(tempPath, outputPath);
		await removeTempFile(tempPath);
		res.json({ fileName: file.name, filePath: outputPath });
	} catch (err) {
		console.error(err);
	}
});

app.get('/files', async (req, res) => {
	try {
		const path = `${__dirname}/public/uploads/video`;
		const files = await fsPromises.readdir(path);
		// for (const file of files)
		console.log(files);
		res.json(files);
	} catch (err) {
		console.error(err);
	}
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
