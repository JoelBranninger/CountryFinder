// import React, { useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// export interface IAuthRouteProps {}
// const AuthRoute: React.FunctionComponent<IAuthRouteProps> = (props) => {
//   const { children } = props;
//   const auth = getAuth();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     AuthCheck;
//   }, [auth]);

//   const AuthCheck = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setLoading(false);
//     } else {
//       console.log("no");
//       navigate("./pages/profilePage");
//     }
//   });
//   if (loading) return <p>loading...</p>;
//   return <div>{children}</div>;
// };
// export default AuthRoute;
// //
// // function App() {
// //   const router = createHashRouter([
// //     {
// //       children: [
// //         { element: <Home />, path: "/" },
// //         { element: <ResultPage />, path: "/result/:country" },
// //         { element: <ProfilePage />, path: "/profile" },
// //       ],
// //       element: <Root />,
// //     },
// //   ]);

// //   return <RouterProvider router={router} />;
// // }

import { useState } from "react";
function ProfilePage() {
  return <></>;
}

export default ProfilePage;
