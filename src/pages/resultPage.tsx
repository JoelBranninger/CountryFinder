import Result from "../Result";
import arrow from "../arrow.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import userContext from "../userContext";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  // onSnapshot,
  // collection,
  doc,
  // deleteDoc,
  setDoc,
  // addDoc,
  // orderBy,
  // query,
} from "firebase/firestore";
const FirebaseConfig = {
  apiKey: "AIzaSyCDcwAZRrJRmruO-r-mnxDfP6ApKgbbZSs",
  authDomain: "countryinfo-14958.firebaseapp.com",
  projectId: "countryinfo-14958",
  storageBucket: "countryinfo-14958.appspot.com",
  messagingSenderId: "534539565354",
  appId: "1:534539565354:web:1891485cfb252e8be08653",
};
const app = initializeApp(FirebaseConfig);
export const db = getFirestore(app);
function ResultPage() {
  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);
  const [Country] = useState(useParams().country);
  const [userInfo] = useState(JSON.parse(useContext(userContext)));
  const navigate = useNavigate();
  // function sentT() {
  //   navigate("/");
  // }
  function saveCountry() {
    if (data) {
      const temp = userInfo.savedCoutries;
      temp.push(data["name"]["common"]);
      setDoc(doc(db, "accounts", userInfo.id), {
        email: userInfo.email,
        password: userInfo.password,
        savedCoutries: temp,
      });
    }
  }
  useEffect(() => {
    setData(null);
    if (Country !== "") {
      fetch(
        "https://restcountries.com/v3.1/name/" + Country + "?fullText=true",
        {
          method: "GET",
          headers: {
            "X-Api-Key": "8/61Ar5OkNB5s7tKCbEUOQ==wIeENXc3tDSYh9sU",
          },
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(userInfo.savedCoutries);
          console.log(result[0]["name"]["common"]);
          console.log(
            userInfo.savedCoutries.includes(result[0]["name"]["common"])
          );
          setData(result[0]);
          fetch(
            "http://api.timezonedb.com/v2.1/get-time-zone?key=4CW3HG0E0FJT&format=json&by=position&lat=" +
              result[0].latlng[0] +
              "&lng=" +
              result[0].latlng[1]
          )
            .then((response) => response.json())
            .then((apiTime) => {
              setTime(apiTime.formatted.substr(11, 5));
            });
        })
        .catch((error) => {
          navigate("/");
          throw error;
        });
    }
  }, [Country]);
  return (
    <>
      {}
      <div className="formContainer">
        {data && <h1>{data["name"]["common"]}</h1>}
        {data && (
          <>
            <img
              src={data["flags"]["svg"]}
              alt="Flag of the country"
              className="imgFlag"
            />
            <div className="infoBtnContainer">
              <div className="header2">
                Informaion about {data["name"]["common"]}
              </div>
              {JSON.parse(useContext(userContext)).savedCoutries.includes(
                data["name"]["common"]
              ) === false && (
                <input
                  type="button"
                  value="Save"
                  className="saveBtn"
                  onClick={saveCountry}
                />
              )}
            </div>
          </>
        )}
      </div>
      {data && time && Country && (
        <Result
          population={Intl.NumberFormat().format(data["population"])}
          area={Intl.NumberFormat().format(data["area"])}
          capital={data["capital"][0]}
          carSide={data["car"]["side"]}
          languages={data["languages"]}
          currencies={data["currencies"]}
          time={time}
          country={Country}
        />
      )}
      <Link className="return" to="/">
        <img src={arrow} alt="" />
      </Link>
    </>
  );
}

export default ResultPage;
