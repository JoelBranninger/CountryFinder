import { useState } from "react";
import styled from "styled-components";
import { initializeApp } from "firebase/app";
import { Field, ErrorMessage, Form, Formik } from "formik";
import "./profilePage.css";
import {
  getFirestore,
  onSnapshot,
  collection,
  // doc,
  // deleteDoc,
  // setDoc,
  addDoc,
  // orderBy,
  query,
} from "firebase/firestore";

// import { error } from "console";

const Container = styled.div`
  background-color: rgb(228, 234, 255);
  border-radius: 5px;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: 1fr;
`;
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
function ProfilePage() {
  const [showLogIn, setShowLogIn] = useState(false);
  const [showCreateAcc, setCreateAcc] = useState(false);
  const [showBigError, setShowBigError] = useState(false);

  function createAccount(email: string, password: string) {
    addDoc(collection(db, "accounts"), {
      email: email,
      password: password,
      savedCoutries: [],
    });
    localStorage.setItem("email", email);
  }
  function LogIn(email: string, password: string) {
    const kontoQuery = query(collection(db, "accounts"));
    onSnapshot(kontoQuery, (snapshot) => {
      snapshot.docs.map((doc) => {
        console.log(doc.data().email);
        if (email === doc.data().email && password === doc.data().password) {
          localStorage.setItem("email", email);
          location.reload();
        } else {
          setShowBigError(true);
        }
      });
    });
  }
  function logOut() {
    localStorage.removeItem("email");
    location.reload();
  }
  return (
    <>
      {localStorage.getItem("email") && (
        <input
          type="button"
          className="logOut"
          value="Log out"
          onClick={logOut}
        />
      )}
      {localStorage.getItem("email") === null && (
        <div className="body">
          <Container>
            <input
              type="button"
              value="Log In"
              onClick={() => setShowLogIn(true)}
            />
            <input
              type="button"
              value="Create Account"
              onClick={() => setCreateAcc(true)}
            />
          </Container>
        </div>
      )}
      {showCreateAcc && (
        <div className="body">
          <Formik
            initialValues={{ password: "", email: "" }}
            onSubmit={(values, { setSubmitting }) => {
              createAccount(values.email, values.password);
              setTimeout(() => {
                location.reload();
                setSubmitting(false);
              }, 1000);
            }}
            validate={(values) => {
              let errors = {};
              if (values.email.trim() === "" && values.password.trim() === "") {
                errors = {
                  email: "Email cannot be empty",
                  password: "Password cannot be empty",
                };
              } else if (values.password.trim() === "") {
                errors = {
                  password: "Password cannot be empty",
                };
              } else if (values.email.trim() === "") {
                errors = {
                  email: "Email cannot be empty",
                };
              }
              return errors;
            }}
          >
            {({ dirty, isSubmitting, isValid }) => (
              <Form>
                <Container>
                  <h3 className="loginText">Create Account</h3>
                  <label>Email</label>
                  <Field name="email" />
                  <div className="error">
                    <ErrorMessage component="span" name="email" />
                  </div>
                  <label>Password</label>
                  <Field name="password" />
                  <div className="error">
                    <ErrorMessage component="span" name="password" />
                  </div>
                  <input
                    disabled={!dirty || isSubmitting || !isValid}
                    value="Create account"
                    type="submit"
                  />
                </Container>
              </Form>
            )}
          </Formik>
        </div>
      )}
      {showLogIn && (
        <div className="body">
          <Formik
            initialValues={{ password: "", email: "" }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                LogIn(values.email, values.password);
                setSubmitting(false);
              }, 1000);
            }}
            validate={(values) => {
              let errors = {};
              if (values.email.trim() === "" && values.password.trim() === "") {
                errors = {
                  email: "Email cannot be empty",
                  password: "Password cannot be empty",
                };
              } else if (values.password.trim() === "") {
                errors = {
                  password: "Password cannot be empty",
                };
              } else if (values.email.trim() === "") {
                errors = {
                  email: "User name cannot be empty",
                };
              }
              return errors;
            }}
          >
            {({ dirty, isSubmitting, isValid }) => (
              <Form>
                <Container>
                  <h3 className="loginText">Log In</h3>
                  {showBigError && <div className="errorMain">Try again</div>}

                  <label>Email</label>
                  <Field name="email" />
                  <div className="error">
                    <ErrorMessage component="span" name="email" />
                  </div>
                  <label>Password</label>
                  <Field name="password" />
                  <div className="error">
                    <ErrorMessage component="span" name="password" />
                  </div>
                  <input
                    disabled={!dirty || isSubmitting || !isValid}
                    value="Log In"
                    type="submit"
                  />
                </Container>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

export default ProfilePage;
