import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from 'axios';

const Video = () => {
  const [videoUrls, setVideoUrls] = useState({ current: [], next: [] });

  useEffect(() => {
    const socket = new WebSocket("wss://lrdvilsfcd.execute-api.ap-northeast-2.amazonaws.com/production/");

    socket.addEventListener('open', (event) => {
      console.log('WebSocket 연결이 열렸습니다.', event);
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      setVideoUrls(prevUrls => {
        if (prevUrls.current.length === 0) {
          return { current: data.video_urls, next: prevUrls.next };
        } else {
          const nextFirstUrl = prevUrls.next.length > 0 ? [prevUrls.next[0]] : [];
          return { current: prevUrls.current, next: [...nextFirstUrl, ...data.video_urls] };
        }
      });
    });

    return () => socket.close();
  }, []);

  const playNextVideo = () => {
    setVideoUrls(prevUrls => {
      if (prevUrls.next.length > 0) {
        sendUrlToSpringBoot(prevUrls.current[0]);
        return { current: prevUrls.next, next: [] };
      } else {
        sendUrlToSpringBoot(prevUrls.current[0]);
        return { current: prevUrls.current.slice(1), next: prevUrls.next };
      }
    });
  };

  const sendUrlToSpringBoot = async (url) => {
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:8089/A_Eye",
        withCredentials: true,
      });
      const response = await axiosInstance.post('/api/s3Url', { url });
      
      console.log('URL이 성공적으로 전송되었습니다.',response.data);
    } catch (error) {
      console.error('HTTP POST 요청 중 오류 발생:', error);
    }
  };

  return (
    <div>
      {videoUrls.current.length > 0 ? (
        <ReactPlayer
          url={videoUrls.current[0]}
          controls
          width="100%"
          height="100%"
          playing
          onEnded={playNextVideo}
        />
      ) : (
        <p>동영상 로딩 중...</p>
      )}
    </div>
  );
};

export default Video;
