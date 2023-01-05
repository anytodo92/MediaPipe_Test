import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { drawingUtils } from '@mediapipe/drawing_utils';

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("https://atmananda.com.au/media/2022/11/Private_Lesson_Individual.mp4");
  const [isStart, setIsStart] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let canvasCtx = null;
  const faceDetection = new FaceDetection({locateFile: (file) => {
    console.log(file);
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
  }});

  const onResults = (results: mpFaceDetection.Results) => {
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);
    if (results.detections.length > 0) {
      drawingUtils.drawRectangle(
          canvasCtx, results.detections[0].boundingBox,
          {color: 'blue', lineWidth: 4, fillColor: '#00000000'});
      drawingUtils.drawLandmarks(canvasCtx, results.detections[0].landmarks, {
        color: 'red',
        radius: 5,
      });
    }
    canvasCtx.restore();
  }

  async function onCapture() {
    if (!videoRef.current.paused && !videoRef.current.ended) {
      // await faceDetection.send({image: videoRef.current});
      canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);  
      setTimeout(onCapture, 40);
    }
  }

  // const camera = new Camera(videoRef.current, {
  //   onFrame: async () => {
  //     await faceDetection.send({image: videoRef.current});
  //   },
  //   width: 1280,
  //   height: 720
  // });
  // camera.start();

  useEffect(() => {

  }, []);

  const start = () => {
    canvasCtx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    videoRef.current.play();
    onCapture();
    setIsStart(true);
  }

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10}>
          <Grid item xs={6} >
            <h1>Original Video</h1>
            <video
              ref={videoRef}
              type="video/mp4"
              controls="controls"
              src={videoUrl}
              style={{ width: '100%' }}></video>
          </Grid>
          <Grid item xs={6}>
            <h1>Face Detect</h1>
            <div className="canvas-container">
              <canvas ref={canvasRef} className="output_canvas" style={{ width: '100%' }}>
              </canvas> 
            </div>
          </Grid>
        </Grid>
        <Button variant="contained" onClick={start}>{isStart ? 'Stop' : 'Start'}</Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
