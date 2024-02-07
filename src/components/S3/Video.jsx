import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Video = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("wss://lrdvilsfcd.execute-api.ap-northeast-2.amazonaws.com/production/");

    socket.addEventListener('open', (event) => {
        console.log('WebSocket 연결이 열렸습니다.', event);
      });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      console.log(data.video_urls)
      
      setVideoUrl(data.video_urls); 
    });

    return () => socket.close();
  }, []);
  console.log(videoUrl)
  return (
    <div>
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls width="100%" height="100%" playing/>
      ) : (
        <p>동영상 로딩 중...</p>
      )}
    </div>
  );
};

export default Video;

