import MDBox from "components/MDBox";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css'
import 'weather-icons/css/weather-icons.css';
import Video from "components/S3/Video";

const CITY_NAME = 'Gwangju';

function Notifications() {

  const [weatherData, setWeatherData] = useState([]);
  const [articles] = useState([
    "삼성전자, MWC 2024서 '갤럭시 AI' 존재감 과시 - 라이센스뉴스",
    "임시 감독 '박항서'냐 '황선홍'이냐…고심에 빠진 축구협회 - 세계일보",
    "공명·김도연, 초고속 열애설 부인 '선후배 사이일 뿐'[공식] - 서울경제 - 서울경제신문",
    "코인 사기 의혹에 연루?…조현영, 재차 반박 후 법적 대응 나섰다 - 머니투데이",
    "우크라 정보국장 “나발니, 혈전으로 자연사”... 젤렌스키는 “러가 살해” - 조선일보",
    "전공의 없다고 병원 마비…부실 의료체계 민낯 1주일 - 한겨레",
    "시총 1.2조원 '껑충'…한화에어로, '역대급 호재'까지 터졌다 - 한국경제",
    "류현진 개막전 선발…최원호 감독 “페디보다 한 수 위” - KBS뉴스",
    "교회 데려오더니 쇠창살에 감금…온몸 멍에 하반신 마비” - SBS뉴스",
    "재판 출석한 김혜경 측 “설마 기소할까 했다”” - 채널A",
    "서울의대 교수 응급실 못 가는 분 있나…의료 대란 부추기지 말라 - SBS뉴스",
    "정청래 조선일보 겁먹었나? 소송 예고에 '제목 변경'” - MBC뉴스",
    "5분 탄 신차서 불”…제조사는 말도 없이 환불?  - KBS뉴스",
    "성균관대 의대 교수협, 의대 증원 찬성 54.8%..5백 명 수준 적절” - kbc광주방송",
    "임창정 아내 서하얀, 입 열었다…이 글 꼭 읽어봐달라 - 한국경제",
    "밭일 하다가, 깜짝…수류탄 1발 발견” - 디지털타임스",
    "‘전공의 사직 일주일’…심정지 환자 응급실 돌다 사망” - 국민일보",
    "유명 해수욕장서 사람 뼈 추정 물체 발견…“정강이 뼈로 추정” - 문화일보",
    "5만년 쓸 수 있는 천연수소 5조t 발밑에…새 ‘골드러시’ 오나” - 한겨레",
    "우리가 회사원하고 같냐 의사 반발에…조승우 '사이다 발언'” - 중앙일보",
  ]);
  const [articleLength, setArticleLength] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState('');
  const [currentWeather , setCurrentWeather] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&cnt=24&units=metric`
        );

        console.log('Weather API 응답:', response.data);
        setWeatherData(response.data.list);
        setCurrentWeather(response.data.list[0].weather[0].main)
      } catch (error) {
        console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchNewsData = async () => {
      try {
        // const response = await axios.get(
        //   `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        // );
        //setArticleLength(response.data.articles.map(article => article.title).reduce((acc, curr) => acc + curr, 0))
        setArticleLength(articles.reduce((acc, curr) => acc + curr, 0))
      } catch (error) {
        console.error('뉴스 데이터를 가져오는 중 오류 발생:', error);
      }
    };


    
    fetchWeatherData();
    fetchNewsData();
  }, []);

  const currentTimestamp = moment().unix();

  const filteredWeatherData = weatherData.filter((item) => {
    const itemTimestamp = item.dt;
    // Filter data for the next 24 hours and include the current time
    return itemTimestamp >= currentTimestamp && itemTimestamp <= currentTimestamp + 24 * 3600;
  });

  const getWeatherIcon = (iconCode) => {
    const iconMapping = {
      '01d': 'wi-day-sunny',
      '01n': 'wi-night-clear',
      '02d': 'wi-day-cloudy',
      '02n': 'wi-night-alt-cloudy',
      '03d': 'wi-cloud',
      '03n': 'wi-cloud',
      '04d': 'wi-cloudy',
      '04n': 'wi-cloudy',
      '09d': 'wi-showers',
      '09n': 'wi-showers',
      '10d': 'wi-day-rain',
      '10n': 'wi-night-alt-rain',
      '11d': 'wi-thunderstorm',
      '11n': 'wi-thunderstorm',
      '13d': 'wi-snow',
      '13n': 'wi-snow',
      '50d': 'wi-fog',
      '50n': 'wi-fog',
    };

    const iconName = iconMapping[iconCode] || 'wi-day-sunny';

    if (iconCode.includes('09') || iconCode.includes('10')) {
      return `wi wi-rain `;
    }

    return `wi ${iconName}`;
  };




  useEffect(() => {
    const timer = setTimeout(() => {

      setSlideAnimation(`
      @keyframes slide {
        from {
          transform: translateX(calc(2.05% * ${articleLength.length})); /* 오른쪽 끝에서 시작합니다. */
        }
        to {
          transform: translateX(-100%); /* 왼쪽 끝까지 이동합니다. */
        }
      }
    `)
    }, 1000)

    return () => clearTimeout(timer);
  }, [articleLength]);

  function tick() {
    setCurrentTime(new Date());
  }

  useEffect(() => {
    // 컴포넌트가 마운트될 때 타이머를 시작하고, 언마운트될 때 타이머를 정리합니다.
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  }, []);


  return (
    <div>
      <style>{slideAnimation}</style>
      <div className="main-container">
        <div className="weather-container">
          <div className={`weather-background-${currentWeather}`} />
          <div className="Aeye-Logo"></div>
          <div className="time-container">{currentTime.toLocaleTimeString()}</div>
          <ul className="weather-list" >
            {filteredWeatherData.map((item) => (
              <li key={item.dt} className={`weather-item`}>
                <p>{moment.unix(item.dt).format('MM월 DD일 HH:mm A')}</p>
                <p>온도: {Math.round(item.main.temp)}°C &nbsp;
                  <i className={getWeatherIcon(item.weather[0].icon)}></i></p>
              </li>
            ))}
          </ul>
            <div className={`weather-box ${currentWeather}`}>
              </div>
        </div>
        <MDBox className="ad-container" mt={-3} >
          <Video />
        </MDBox>
      </div>
      <div className="news-container">
        <div className="news-wrapper">
          {articles.map((title, index) => (
            <div
              key={index}
              className={`news-item`}
            >
              {title}
            </div>
          ))}

        </div>
      </div>
    </div>
  );

}

Notifications.default={
  currentWeather : "Rain"
}

export default Notifications;