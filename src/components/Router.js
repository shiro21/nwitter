import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from "routes/Profile";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    const url = process.env.PUBLIC_URL;

    return (
        <Router basename={url}>
            { isLoggedIn && <Navigation userObj={userObj} /> }
            <Routes>
                {
                    isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home userObj={userObj} />} />
                            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
                        </>
                    ) : (
                        <Route path="/" element={<Auth />} />
                    )
                }
            </Routes>
        </Router>
    );
}

export default AppRouter;