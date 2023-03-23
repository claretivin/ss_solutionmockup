import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Countries, States, Cities } from "countries-states-cities-service";
import Multiselect from "multiselect-react-dropdown";
import ReactLoading from "react-loading";

var worldMapData = require("city-state-country");

const weather_url = process.env.REACT_APP_WEATHER_APIKEY;

function App() {
  const [city, setcity] = useState();
  const [lat, setlat] = useState();
  const [lng, setlng] = useState();
  const [data, setdata] = useState<any>();
  const [loading, setloading] = useState<any>();
  // console.log(data?.visibility);

  const countriesList = worldMapData.getAllCountries();
  console.log(countriesList);

  const cities: any = Cities.getCities();
  console.log(cities);

  const fetchweather = async () => {
    try {
      setloading(true);
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weather_url}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setdata(data);
        });
      setloading(false);
    } catch (e: any) {
      console.log(e.message);
    }
    setloading(false);
  };

  return (
    <div className="App">
      <Card
        style={{
          width: "700px",
        }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Weather App
          </Typography>
          <div className="row">
            <div className="col-12 col-xl-4 col-lg-4 col-md-4">
              <Multiselect
                options={countriesList.slice(0, 99)}
                displayValue="name"
                placeholder="Select Country"
                singleSelect
              />
            </div>
            <div className="col-12 col-xl-4 col-lg-4 col-md-4">
              <Multiselect
                options={cities.slice(0, 99)}
                displayValue="name"
                placeholder="Select City"
                singleSelect
                onSelect={(e) => {
                  setlat(e[0].latitude);
                  setlng(e[0].longitude);
                }}
              />
            </div>
            <div className="col-12 col-xl-4 col-lg-4 col-md-4">
              <Button
                variant="contained"
                onClick={() => {
                  fetchweather();
                }}
              >
                Submit
              </Button>
            </div>
          </div>
          <Card
            style={{
              marginTop: "20px",
              border: "1px solid black",
            }}
          >
            <CardContent>
              <Typography
                style={{
                  textAlign: "left",
                }}
                variant="subtitle1"
              >
                {data?.name || "No Data"}, {data?.sys?.country || "No Data"}
                .Weather
              </Typography>
              <Typography variant="h1">
                {data?.main?.temp || "No Data"}
              </Typography>
              <Typography variant="subtitle1">
                {data?.weather[0]?.description || "No Data"}
              </Typography>
            </CardContent>
          </Card>
          <div
            className="row"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                High/Low
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.main?.temp_max || "No Data"}/
                  {data?.main?.temp_min || "No Data"}
                </span>
              </Typography>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Wind
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.wind?.speed || "No Data"}
                </span>
              </Typography>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Humidity
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.main?.humidity || "No Data"}
                </span>
              </Typography>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Wind Direction
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.wind?.deg || "No Data"}
                </span>
              </Typography>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Pressure
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.main?.pressure || "No Data"}
                </span>
              </Typography>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Sunrise
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.sys?.sunrise || "No Data"}
                </span>
              </Typography>
            </div>
          </div>
          <div
            className="row"
            style={{
              marginTop: "20px",
            }}
          >
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Visibility
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.visibility || "No Data"}
                </span>
              </Typography>
            </div>
            <div className="col-12 col-xl-6 col-lg-6 col-md-6">
              <Typography align="left" variant="h5">
                Sunset
                <span
                  style={{
                    float: "right",
                  }}
                >
                  {data?.sys?.sunset || "No Data"}
                </span>
              </Typography>
            </div>
          </div>
        </CardContent>
        {loading ? (
          <ReactLoading
            type="bubbles"
            color="#0000FF"
            height={100}
            width={50}
          />
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}

export default App;
