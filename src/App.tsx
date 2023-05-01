import ResultPage from "./pages/resultPage";
import Home from "./pages/homePage";
import ProfilePage from "./pages/profilePage";
import userContext from "./userContext";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  // doc,
  // deleteDoc,
  // setDoc,
  // addDoc,
  // orderBy,
  query,
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
import { createHashRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

function Root() {
  return <Outlet />;
}

function App() {
  interface userInfoRules {
    email: string;
    password: string;
    id: string;
    savedCoutries: [string];
  }
  const [userInfo, setUserInfo] = useState<userInfoRules>({
    email: "",
    password: "",
    id: "",
    savedCoutries: [""],
  });

  useEffect(() => {
    if (localStorage.getItem("email")) {
      console.log("hej");
      const kontoQuery = query(collection(db, "accounts"));
      onSnapshot(kontoQuery, (snapshot) => {
        snapshot.docs.map((doc) => {
          console.log(doc.data().email);
          if (localStorage.getItem("email") === doc.data().email) {
            console.log("Inloggad");
            const x: userInfoRules = {
              email: doc.data().email,
              password: doc.data().password,
              id: doc.id,
              savedCoutries: doc.data().savedCoutries,
            };
            if (x != null) {
              setUserInfo(x);
            }
          }
        });
      });
    }
  }, []);
  const router = createHashRouter([
    {
      children: [
        { element: <Home />, path: "/" },
        { element: <ResultPage />, path: "/result/:country" },
        { element: <ProfilePage />, path: "/profile" },
      ],
      element: <Root />,
    },
  ]);
  //  let userInfoStr = JSON.stringify(userInfo)
  return (
    <userContext.Provider value={JSON.stringify(userInfo)}>
      <RouterProvider router={router} />
    </userContext.Provider>
  );
}

export default App;
