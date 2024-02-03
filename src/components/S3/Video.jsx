import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Video = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    // WebSocket 통신 코드 작성
    const socket = new WebSocket("wss://dcvsyvidu4.execute-api.ap-northeast-2.amazonaws.com/production/");

    socket.addEventListener('open', (event) => {
        console.log('WebSocket 연결이 열렸습니다.', event);
      });

    socket.addEventListener("message", (event) => {
      // 메시지를 받아온 후 state 업데이트
      console.log("event.data")
      const data = JSON.parse(event.data);
      setVideoUrl(data.video_urls[0]); // 예시: 받아온 데이터에서 적절한 위치에 있는 동영상 URL 사용
    });
    console.log(event.data)

    // 컴포넌트 언마운트 시 WebSocket 연결 닫기
    return () => socket.close();
  }, []);

  return (
    <div>
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls width="100%" height="100%" />
      ) : (
        <p>동영상 로딩 중...</p>
      )}
    </div>
  );
};

export default Video;