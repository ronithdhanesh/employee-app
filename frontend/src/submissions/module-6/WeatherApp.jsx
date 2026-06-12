import React, { useEffect, useState } from 'react';

const WEATHER_CODES = {
  0: 'Clear Sky', 1: 'Mainly Clear', 2: 'Partly Cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Depositing Rime Fog',
  51: 'Light Drizzle', 53: 'Moderate Drizzle', 55: 'Dense Drizzle',
  61: 'Slight Rain', 63: 'Moderate Rain', 65: 'Heavy Rain',
  71: 'Slight Snow', 73: 'Moderate Snow', 75: 'Heavy Snow',
  80: 'Slight Rain Showers', 81: 'Moderate Rain Showers', 82: 'Violent Rain Showers',
  95: 'Thunderstorm', 96: 'Thunderstorm with Slight Hail', 99: 'Thunderstorm with Heavy Hail'
};

const WeatherApp = () => {
  const [city, setCity] = useState('London');
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState({
    temp: 18,
    condition: 'Light Rain',
    humidity: 78,
    wind: 14,
    status: 'Ready'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchWeatherData() {
      try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`);
        const geoData = await geoResponse.json();
        
        if (!geoData.results || geoData.results.length === 0) {
          setWeather(prev => ({ ...prev, status: `City "${city}" not found.` }));
          setLoading(false);
          return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`);
        const weatherData = await weatherResponse.json();

        const currentData = weatherData.current;
        const conditionText = WEATHER_CODES[currentData.weather_code] || 'Unknown';

        setWeather({
          temp: Math.round(currentData.temperature_2m),
          condition: conditionText,
          humidity: currentData.relative_humidity_2m,
          wind: Math.round(currentData.wind_speed_10m),
          status: `Loaded data for ${name}`
        });
        setCity(name);
      } catch (error) {
        setWeather(prev => ({ ...prev, status: 'Failed to connect to weather servers.' }));
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      setCity(search.trim());
      setSearch('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 via-indigo-500 to-purple-700 p-6 flex flex-col items-center justify-center font-sans text-white">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 p-6 rounded-3xl shadow-2xl flex flex-col gap-6">
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <input 
            type="text"
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search city..." 
            className="flex-1 bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 text-sm placeholder-white/70 outline-none focus:bg-white/30 focus:border-white/40 text-white transition-all"
          />
          <button
            type="submit"
            className="bg-white text-indigo-950 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-opacity-90 active:scale-95 transition-all"
          >
            Search
          </button>
        </form>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-white border-t-transparent mb-3 mx-auto"></div>
            <p className="text-sm text-sky-100">Fetching weather updates...</p>
          </div>
        ) : (
          <>
            <div className="text-center my-2">
              <h1 className="text-3xl font-black tracking-wide">{city}</h1>
              <p className="text-xs uppercase font-semibold tracking-widest text-sky-200 mt-1.5">{weather.condition}</p>
              <div className="text-7xl font-black tracking-tighter my-4 drop-shadow-md">
                {weather.temp}°C
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <span className="text-2xl">💧</span>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-sky-200">Humidity</p>
                  <p className="text-base font-bold">{weather.humidity}%</p>
                </div>
              </div>

              <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5 flex items-center gap-3">
                <span className="text-2xl">💨</span>
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-sky-200">Wind Speed</p>
                  <p className="text-base font-bold">{weather.wind} km/h</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="text-center text-[10px] tracking-wide text-white/60 border-t border-white/10 pt-3">
          {weather.status}
        </div>

      </div>
    </div>
  );
};

export default WeatherApp;