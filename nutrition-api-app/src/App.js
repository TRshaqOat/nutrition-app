import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [food, setFood] = useState("");

  const searchFood = async (event) => {
    const options = {
      method: "GET",
      url: "https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition",
      params: {
        query: food,
      },
      headers: {
        "X-RapidAPI-Key": "c6d00b02demsh6fbd40f27f235a2p16f75djsn6538ec2274e0",
        "X-RapidAPI-Host": "nutrition-by-api-ninjas.p.rapidapi.com",
      },
    };
    if (event.key === "Enter") {
      try {
        try {
          const response = await axios.request(options);
          if (response.data.size > 1) {
            console.log(response.data.length + " Items");
          }
          console.log(response.data.length + " Items");
          setData(response.data[0]);
          console.log(response.data);
          console.log(response.data[0].calories);
        } catch (error) {
          console.error(error);
        }

        setFood("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={food}
          onChange={(event) => setFood(event.target.value)}
          onKeyDown={searchFood}
          placeholder="Enter Food"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="food">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.calories ? <h1>{data.calories} Calories</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
