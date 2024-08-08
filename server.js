const express = require('express');
const { S3Client, PutObjectCommand,ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const bodyParser = require('body-parser');
// const stream = require('stream');
//const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

const s3 = new S3Client({
    region: 'us-east-2' // Specify your region
});

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '256gb' }));


// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Handle video upload
// app.post('/upload/video', async (req, res) => {
//     const bucketName = 'cheesebucketlehighu';
//     const video_dir = 'webcam_videos/';
//     const fileName = video_dir + `recorded-video-${Date.now()}.webm`; // Generate a unique file name

//     try {
//         const params = {
//             Bucket: bucketName,
//             Key: fileName,
//             Body: req.body,
//             ContentType: 'video/webm', // Change this if your video is in a different format
//         };

//         const data = await s3.send(new PutObjectCommand(params));
//         res.json({ message: 'Video uploaded successfully', data });
//     } catch (err) {
//         console.error('Error uploading video:', err);
//         res.status(500).json({ error: 'Error uploading video', details: err });
//     }
// });

// // Handle data upload
// app.post('/upload/data', async (req, res) => {
//     const bucketName = 'cheesebucketlehighu';
//     const data_dir = 'bart_data/';
//     const fileName = data_dir + `${req.body.userID}.csv`; // Generate a unique file name

//     try {
//         const params = {
//             Bucket: bucketName,
//             Key: fileName,
//             Body: req.body.csvString,
//             ContentType: 'text/csv', // Change this if your video is in a different format
//         };

//         const data = await s3.send(new PutObjectCommand(params));
//         res.json({ message: 'Data uploaded successfully', data });
//     } catch (err) {
//         console.error('Error uploading video:', err);
//         res.status(500).json({ error: 'Error uploading video', details: err });
//     }
// });