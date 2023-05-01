import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../userContext";
import { useContext } from "react";
import ProfilePage from "./profilePage";
import globe from "../globe.svg";
import "./homePage.css";

function HomePage() {
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  function SendToResult() {
    if (country !== "") {
      navigate("/result/" + country);
    }
  }

  return (
    <>
      <div className="formContainer">
        <h1>Country Info</h1>
        <form onSubmit={SendToResult} className="formCountry">
          <input
            className="formCountryInput"
            type="text"
            value={country}
            placeholder="Search for a Country"
            onChange={(event) => setCountry(event.target.value)}
          />
          <input type="submit" value="Get" className="formCountrySubmit" />
        </form>
        <div className="header2">Saved Countries</div>
      </div>
      {JSON.parse(useContext(userContext)).savedCoutries.length === 0 && (
        <h3 className="infoText">Save a country to easy access it here</h3>
      )}
      {JSON.parse(useContext(userContext)).savedCoutries.map((unit: string) => (
        <div
          onClick={() => navigate("/result/" + unit)}
          className="countryContainer"
          key={unit}
        >
          <img src={globe} className="populationImg" alt="" />
          <div className="textContainer">
            <h5 className="countryInfo">{unit}</h5>
          </div>
        </div>
      ))}
      <ProfilePage />
    </>
  );
}

export default HomePage;
