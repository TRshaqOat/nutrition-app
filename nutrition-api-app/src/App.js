import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [food, setFood] = useState("");

  const [totalCalories, setTotalCalories] = useState(0);
  const [servingSize, setServingSize] = useState(0);
  const [carbCount, setCarbCount] = useState(0);
  const [proteinCount, setProteinCount] = useState(0);

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

          let newTotalCalories = 0;
          let newServingSize = 0;
          let newCarbCount = 0;
          let newProteinCount = 0;

          for (const item of response.data) {
            newTotalCalories += item.calories;
            newServingSize += item.serving_size_g;
            newCarbCount += item.carbohydrates_total_g;
            newProteinCount += item.protein_g;
          }

          newTotalCalories = Math.round(newTotalCalories * 10) / 10;
          newServingSize = Math.round(newServingSize * 10) / 10;
          newCarbCount = Math.round(newCarbCount * 10) / 10;
          newProteinCount = Math.round(newProteinCount * 10) / 10;

          setTotalCalories(newTotalCalories);
          setServingSize(newServingSize);
          setCarbCount(newCarbCount);
          setProteinCount(newProteinCount);

          setData(response.data[0]);
          console.log(response.data);
          console.log("Total: " + newTotalCalories + " Calories");
        } catch (error) {
          console.error(error);
        }

        setFood("");
      } catch (error) {
        console.error("Error:", error);
      }
      resetAnimation();
    }
  };

  const resetAnimation = () => {
    const element1 = document.querySelector(".food");
    const element2 = document.querySelector(".cal");
    const element3 = document.querySelector(".description");

    if (element1) {
      element1.style.animation = "none";
      element2.style.animation = "none";
      element3.style.animation = "none";

      void element1.offsetWidth;
      void element2.offsetWidth;
      void element3.offsetWidth;

      element1.style.animation = "fadeIn 3s 1s";
      element2.style.animation = "fadeIn 3s 4s";
      element3.style.animation = "fadeIn 3s 7s";
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={food}
          onChange={(event) => setFood(event.target.value)}
          onKeyDown={searchFood}
          placeholder="Enter Ingredients/Food"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div>
            {data.calories ? (
              <p className="food">Your Recipe Broken Down:</p>
            ) : null}
          </div>
          <div>
            {data.calories ? (
              <h1 className="cal">{totalCalories} Calories</h1>
            ) : null}
          </div>
          {/* <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div> */}
          {/* {data.calories ? (
            <p className="description">
              Your recipe does not contain enough protein.
            </p>
          ) : null} */}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="serving">
              {data.calories ? <p className="bold">{servingSize}g</p> : null}
              <p>Serving Size</p>
            </div>
            <div className="carb">
              {data.calories ? <p className="bold">{carbCount}g</p> : null}
              <p>Carb. Count</p>
            </div>
            <div className="protein">
              {data.calories ? <p className="bold">{proteinCount}g</p> : null}
              <p>Protein Count</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
