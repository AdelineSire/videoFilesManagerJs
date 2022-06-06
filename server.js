const express = require('express');
const fs = require('fs');
const fsPromises = fs.promises;
const fileUpload = require('express-fileupload');
const cors = require('cors');

const transcodeFile = require('./lib/transcodeFile');
const removeTempFile = require('./lib/removeTempFile');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(fileUpload());

const apiUrl = process.env.API_URL || 'http://localhost:3002';

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
		res.send();
	} catch (err) {
		console.error(err);
	}
});

app.get('/files', async (req, res) => {
	try {
		const path = `${__dirname}/public/uploads/video/`;
		const files = [];
		const fileNames = await fsPromises.readdir(path);
		for (const fileName of fileNames) {
			const filePath = `${apiUrl}/uploads/video/${fileName}`;
			files.push({ fileName, filePath });
		}
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
