import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "e2a4ce5899932bf03d9513c3b0bc418c";

  const fetchWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name");
      setWeather(null);
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[url('https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg')] bg-cover bg-center px-3 py-6">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6">

        {/* WEATHER CARD */}
        <div className="w-full max-w-[95%] sm:max-w-md bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-6">

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-black">
            🌤 Weather App
          </h1>

          {/* INPUT */}
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="flex-1 px-4 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={fetchWeather}
              className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Search
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="mt-4 text-center text-red-600 font-medium">
              {error}
            </p>
          )}

          {/* WEATHER DETAILS */}
          {weather && (
            <div className="mt-6 text-center space-y-2">

              <h2 className="text-xl sm:text-2xl font-semibold text-black">
                {weather.name}
              </h2>

              <p className="text-4xl sm:text-5xl font-bold text-black">
                {weather.main.temp}°C
              </p>

              <p className="capitalize text-black">
                {weather.weather[0].description}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div className="bg-white/50 rounded-lg p-3 text-black">
                  🌡 Max
                  <p className="font-semibold text-lg">
                    {weather.main.temp_max}°C
                  </p>
                </div>

                <div className="bg-white/50 rounded-lg p-3 text-black">
                  Pressure
                  <p className="font-semibold text-lg">
                    {weather.main.pressure}
                  </p>
                </div>

                <div className= "bg-white/50 rounded-lg p-3 text-black">
                  💧 Humidity
                  <p className="font-semibold text-lg">
                    {weather.main.humidity}%
                  </p>
                </div>

                <div className="bg-white/50 rounded-lg p-3 text-black">
                  🌬 Wind
                  <p className="font-semibold text-lg">
                    {weather.wind.speed} m/s
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GOOGLE MAP */}
        {weather && (
        <div className="w-full max-w-[95%] sm:max-w-md lg:max-w-2xl rounded-xl overflow-hidden shadow-lg">
            <iframe
            title="Google Map"
            className="w-full h-64 sm:h-80 lg:h-96"
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${weather.coord.lat},${weather.coord.lon}&output=embed`}
    />
  </div>
)}

      </div>

     
    </div>
  );
}
