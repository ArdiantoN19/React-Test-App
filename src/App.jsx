import { useState, useEffect, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { asyncPreloadProcess } from "./states/isPreload/action";
import Login from "./pages/login/Login";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import { withAuthUser, withoutAuthUser } from "./routes";
import Loading from "./components/loading/Loading";

const Main = styled.main`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  padding: 10px 25px;
`;

function App() {
  const { authUser = "", isPreload = false } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, []);

  if (isPreload) {
    return null;
  }

  if (authUser === "") {
    return (
      <Main>
        <Routes>
          {withoutAuthUser.map((menu) => (
            <Route key={menu.path} {...menu} />
          ))}
        </Routes>
      </Main>
    );
  }
  return (
    <>
      {pathname !== "/" ? null : <Navbar />}
      <Main>
        <Suspense fallback={<Loading />}>
          <Routes>
            {withAuthUser.map((menu) => (
              <Route key={menu.path} {...menu} />
            ))}
          </Routes>
        </Suspense>
      </Main>
    </>
  );
}

export default App;
