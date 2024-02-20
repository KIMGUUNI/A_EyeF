import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import MDBox from "components/MDBox";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './index.css'
import 'weather-icons/css/weather-icons.css';

const API_KEY = 'f828f2753374c6d5cf9bd283096a7a21';
const CITY_NAME = 'Gwangju';
const NEWS_API_KEY = 'd8048ee103aa4740909844166d05e92d'; // Replace with your actual news API key


function Notifications() {

  const [weatherData, setWeatherData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&appid=${API_KEY}&cnt=24&units=metric`
        );

        console.log('Weather API 응답:', response.data);
        setWeatherData(response.data.list);
      } catch (error) {
        console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    const fetchNewsData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${NEWS_API_KEY}`
        );

        console.log('News API 응답:', response.data);
        setNewsData(response.data.articles.slice(0, 5));
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

  return (

    <div className="main-container">
      <div className="weather-container">
        <ul className="weather-list">
          {filteredWeatherData.map((item) => (
            <li key={item.dt} className="weather-item">
              <p>{moment.unix(item.dt).format('MM월 DD일 HH:mm A')}</p>
              <p>온도: {Math.round(item.main.temp)}°C</p>
              <i className={getWeatherIcon(item.weather[0].icon)}></i>
            </li>
          ))}
        </ul>
        <MDBox px={0.5}>
          <DefaultNavbarLink icon="donut_large" name="대시보드" route="/dashboard" />
        </MDBox>
      </div>

      <div className="news-container">
        <ul className="news-list">
          {newsData.map((article) => (
            <li key={article.title} className="news-item">
              <h3>{article.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>

  );
}


export default Notifications;