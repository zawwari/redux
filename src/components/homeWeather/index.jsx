import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_WEATHER_DATA } from "../../redux/actions/posts";
import { GET_LOCATION_DATA } from "../../redux/actions/posts";
import { isEmptyObject } from "../../utils/isEmptyObject";
import { weatherSelector } from "../../redux/reducers/weather";
import { useState } from "react";
const HomeWeather = () => {
  const dispatch = useDispatch();
  const [tempUnit, settempUnit] = useState("F");
  const [currentTemp, setCurrTemp] = useState('');
  const [feelsLike, setfeelsLike] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("");
  const [val, setVal] = useState("");

  const setSearchQuery = async (e) => {
    if (e.key === "Enter") {
      const { data: citySearch } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=1ef1bdcf76ad30b1cbdbb00c82905076`
      );

      setData(citySearch);
      setCurrTemp((citySearch?.main?.temp - 273.5).toFixed(2));
      setfeelsLike((citySearch?.main?.feels_like - 273.5).toFixed(2));
    }
  };
  const { daily, cityName, hourly, current } = useSelector(weatherSelector);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        getByLocation(p.coords.longitude, p.coords.latitude);
      });
    }
  }, []);

  const getByLocation = async (longitude, latitude) => {
    try {
      setLoading(true);

      const { data: cityData } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&&appid=1ef1bdcf76ad30b1cbdbb00c82905076`
      );
      console.log(cityData);

      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&limit=5&&appid=1ef1bdcf76ad30b1cbdbb00c82905076`
      );

      console.log(data);

      const payload = {
        cityName: data.name,
        hourly: data.hourly,
        current: data.current,
        daily: data.daily,
      };

      dispatch({
        type: SAVE_WEATHER_DATA,
        payload,
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const getWeatherData = async (city) => {

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1ef1bdcf76ad30b1cbdbb00c82905076`
    );
    dispatch({
      type: SAVE_WEATHER_DATA,
      payload: data,
    });
  };
  const convertInFar = (temp) => {
    return (temp * 1.8 + 32).toFixed(2);
  };
  const convertInDeg = (temp) => {
    return (temp - 273.15).toFixed(2);
  };
  const onClickBtn = () => {
    debugger;
    if (tempUnit === "F") {
      setCurrTemp(convertInDeg(currentTemp));
      settempUnit("C");
    } else {
      settempUnit("F");
      setCurrTemp(convertInFar(currentTemp));
    }
  };
  const weathers = {
    haze: "/haze.png",
  };

  return (
    <div className="">
      <div className="container mx-auto">
        <div className="input-wrapper w-full">
          <input
            type="search"
            value={val}
            className="w-full shadow"
            placeholder="Enter your location"
            onChange={(e) => setVal(e.target.value)}
            onKeyPress={setSearchQuery}
          />
        </div>

        {!loading && (
          <div className="weather-data-wrapper mt-12 text-center">
            <h3 className="	font text-5xl  text-white ">{data.name}</h3>
            <h4 className="temperature text-5xl text-white font-thin mt-4">
              {currentTemp}&deg; 
              <span className="temp-unit pr-4 relative">C</span>
              
            </h4>
            <div className="flex justify-center mt-6 gap-10">
              <div className="p text-white flex gap-3 items-center">
                <p className="text-[20px] font-thin">Feels Like </p>

                <span className="text-[30px] font-thin">
                  {feelsLike}&deg;C
                </span>
              </div>
              <div className="p text-white flex gap-2 items-center">
                <div className="h-[30px] w-[30px] bg-white rounded-md weather-image">
                  <img
                    className="h-full w-full"
                    src={`http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
                    alt={"weather"}
                  />
                </div>
                <span className="text-[30px] font-thin">
                  {data?.weather?.[0]?.description}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeWeather;
