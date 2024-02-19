import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from 'axios';

const Video = () => {
  const [videoUrls, setVideoUrls] = useState({ current: [], next: [] });
  const [key, setKey] = useState(0);

  const handleVideoEnded = () => {
    setKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    const socket = new WebSocket("wss://lrdvilsfcd.execute-api.ap-northeast-2.amazonaws.com/production/");

    socket.addEventListener('open', (event) => {
      console.log('WebSocket 연결이 열렸습니다.', event);
    });

    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const playedVideos = JSON.parse(sessionStorage.getItem("playedVideos")) || [];

      setVideoUrls(prevUrls => {
        const newVideoUrls = data.video_urls.filter(url => 
          !prevUrls.current.includes(url) && 
          !prevUrls.next.includes(url) &&
          !playedVideos.includes(url)
        );

        if (prevUrls.current.length === 0) {
          return { current: newVideoUrls, next: prevUrls.next };
        } else {
          const nextFirstUrl = prevUrls.next.length > 0 ? [prevUrls.next[0]] : [];
          return { current: prevUrls.current, next: [...nextFirstUrl, ...newVideoUrls] };
        }
      });
      console.log("재생한 동영상",videoUrls)
    });

    return () => socket.close();
  }, []);

  const playNextVideo = () => {
    setVideoUrls(prevUrls => {
      if (prevUrls.current.length > 0) {
        sendUrlToSpringBoot(prevUrls.current[0]);
        sessionStorage.setItem("playedVideos", JSON.stringify([prevUrls.current[0], ...JSON.parse(sessionStorage.getItem("playedVideos")) || []]));
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

  useEffect(() => {
    if (videoUrls.current.length === 0 && videoUrls.next.length === 0) {
      sessionStorage.removeItem("playedVideos");
    }
  }, [videoUrls]);

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
        <ReactPlayer 
        key={key}
        url="https://video-add.s3.ap-northeast-2.amazonaws.com/default/%5B%EA%B3%B5%EC%9D%B5%EA%B4%91%EA%B3%A0%ED%98%91%EC%9D%98%ED%9A%8C%5D+%ED%94%BC%EC%8B%B1%C2%B7%EC%8A%A4%EB%AF%B8%EC%8B%B1+%EC%98%88%EB%B0%A9+-+%EC%8B%AC%EC%B2%AD(viral).mp4"
        controls
          width="100%"
          height="100%"
          playing
          onEnded={handleVideoEnded}/>

      )}
    </div>
  );
};

export default Video;
