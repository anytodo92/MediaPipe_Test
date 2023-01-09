import React, { useState, useEffect, useRef } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FaceDetection } from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { drawingUtils, drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS, Pose } from '@mediapipe/pose';
// import { LandmarkGrid } from '@mediapipe/control_utils_3d';

const Dashboard = () => {
  const [videoUrl, setVideoUrl] = useState("https://atmananda.com.au/media/2022/11/Private_Lesson_Individual.mp4");
  const [isStart, setIsStart] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  let landMarkRef = useRef(null);
  let canvasCtx = null;
  
  // const camera = new Camera(videoRef.current, {
  //   onFrame: async () => {
  //     await faceDetection.send({image: videoRef.current});
  //   },
  //   width: 1280,
  //   height: 720
  // });
  // camera.start();

  const faceDetection = () => {
    const faceDetection = new FaceDetection({locateFile: (file) => {
      console.log(file);
      if (file !== "face_detection_short_range.tflite") {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
      }
    }});

    const onFaceResults = (results: mpFaceDetection.Results) => {
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

    faceDetection.setOptions({
      modelSelection: 0,
      minDetectionConfidence: 0.5
    });
    faceDetection.onResults(onFaceResults);

    async function onCapture() {
      if (!videoRef.current.paused && !videoRef.current.ended) {
        await faceDetection.send({image: videoRef.current});
        // canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);  
        setTimeout(onCapture, 40);
      }
    }

    canvasCtx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    videoRef.current.play();
    onCapture();
    setIsStart(true);
  }

  const poseDetection = () => {
    let grid;
    function onPoseResults(results) {

      console.log(results.poseLandmarks)
      
      // if (!results.poseLandmarks) {
      //   // grid.updateLandmarks([]);
      //   return;
      // }

      // canvasCtx.save();
      // canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      // canvasCtx.drawImage(results.segmentationMask, 0, 0,
      //                     canvasRef.current.width, canvasRef.current.height);

      // // Only overwrite existing pixels.
      // canvasCtx.globalCompositeOperation = 'source-in';
      // canvasCtx.fillStyle = '#00FF00';
      // canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      // // Only overwrite missing pixels.
      // canvasCtx.globalCompositeOperation = 'destination-atop';
      // canvasCtx.drawImage(
      //     results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

      // canvasCtx.globalCompositeOperation = 'source-over';
      // drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
      //                {color: '#00FF00', lineWidth: 4});
      // drawLandmarks(canvasCtx, results.poseLandmarks,
      //               {color: '#FF0000', lineWidth: 2});
      // canvasCtx.restore();

      // grid.updateLandmarks(results.poseWorldLandmarks);
    }

    async function onCapture() {
      if (!videoRef.current.paused && !videoRef.current.ended) {
        console.log(videoRef.current)
        // await pose.send({image: videoRef.current});
        // canvasCtx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);  
        setTimeout(onCapture, 40);
      }
    }

    const pose = new Pose({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }});

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    pose.onResults(onPoseResults);

    // grid = new LandmarkGrid(landMarkRef.current);
    canvasCtx = canvasRef.current.getContext('2d');
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    videoRef.current.play();
    onCapture();
    setIsStart(true);
  }

  const start = () => {
    const isFaceDetect = false;
    const isPoseDetect = true;

    if (isFaceDetect) {
      faceDetection();
    }

    if (isPoseDetect) {
      poseDetection();
    }
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
        <div ref={landMarkRef}></div>
        <Button variant="contained" onClick={start}>{isStart ? 'Stop' : 'Start'}</Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
