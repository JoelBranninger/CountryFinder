import "./pages/resultPage.css";
import area from "./area.svg";
import capital from "./capital.svg";
import car from "./car.svg";
import currency from "./currency.svg";
import language from "./language.svg";
import location from "./location.svg";
import population from "./population.svg";
import timeImg from "./time.svg";
import loading from "./loading.svg";

interface PropsRules {
  languages: {
    [key: string]: string;
  };
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  population: string;
  area: string;
  time: string;
  country: string;
  capital: string;
  carSide: string;
}
function result(props: PropsRules) {
  console.log(props.currencies);
  return (
    <>
      {props ? (
        <>
          <div className="countryContainer">
            <img src={population} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Population</h4>
              <h5 className="countryInfo">{props.population}</h5>
            </div>
          </div>
          <div className="countryContainer">
            <img src={area} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Area</h4>
              <h5 className="countryInfo">{props.area} km²</h5>
            </div>
          </div>
          <div className="countryContainer">
            <img src={capital} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Capital</h4>
              <h5 className="countryInfo">{props.capital}</h5>
            </div>
          </div>
          <div className="countryContainer">
            <img src={timeImg} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Time</h4>
              {props.time && <h5 className="countryInfo">{props.time}</h5>}
            </div>
          </div>
          <div className="countryContainer">
            <img src={location} className="populationImg" alt="" />
            <div className="textContainer location">
              <h4 className="countryTitle">Location</h4>
              <div className="iframeMapContainer">
                <iframe
                  className="iframeMap"
                  src={
                    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7734768.02997435!2d8.424925923687908!3d61.75144075750253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465cb2396d35f0f1%3A0x22b8eba28dad6f6!2s" +
                    props.country +
                    "!5e0!3m2!1ssv!2sse!4v1680027366930!5m2!1ssv!2sse"
                  }
                  width="300"
                  height="300"
                  title="Map"
                  // allowfullscreen=""
                  loading="lazy"
                  // referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="countryContainer">
            <img src={language} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Languages</h4>
              {Object.keys(props.languages).map((unit) => (
                <h5 key={unit} className="countryInfo">
                  {" "}
                  - {props.languages[unit]}{" "}
                </h5>
              ))}
            </div>
          </div>
          <div className="countryContainer">
            <img src={currency} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Currencies</h4>
              {Object.keys(props.currencies).map((unit) => (
                <h5 key={unit} className="countryInfo">
                  - {props.currencies[unit]["name"]} (
                  {props.currencies[unit]["symbol"]})
                </h5>
              ))}
            </div>
          </div>
          <div className="countryContainer">
            <img src={car} className="populationImg" alt="" />
            <div className="textContainer">
              <h4 className="countryTitle">Driving side</h4>
              <h5 className="countryInfo">{props.carSide}</h5>
            </div>
          </div>
        </>
      ) : (
        <img src={loading} alt="loading icon" className="loadingIcon" />
      )}
    </>
  );
}
export default result;
