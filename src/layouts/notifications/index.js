import MDBox from "components/MDBox";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css'
import 'weather-icons/css/weather-icons.css';
import Video from "components/S3/Video";

const API_KEY = 'f828f2753374c6d5cf9bd283096a7a21';
const CITY_NAME = 'Gwangju';
const NEWS_API_KEY = 'd8048ee103aa4740909844166d05e92d'; // Replace with your actual news API key

function Notifications() {

  const [weatherData, setWeatherData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [articleLength, setArticleLength] = useState(0);
  const [slideAnimation, setSlideAnimation] = useState('');
  const [currentWeather , setCurrentWeather] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());


  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&cnt=24&units=metric`
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
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${NEWS_API_KEY}`
        );

        setArticles(response.data.articles.map(article => article.title));


        setArticleLength(response.data.articles.map(article => article.title).reduce((acc, curr) => acc + curr, 0))
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
          transform: translateX(calc(1.22% * ${articleLength.length})); /* 오른쪽 끝에서 시작합니다. */
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