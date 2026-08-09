import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

export const LandingPage = () => {
  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      {/* ================= NAVBAR ================= */}

      <nav>
        <div
          className="nav-header"
          onClick={() => {
            router("/");
          }}
          style={{ cursor: "pointer" }}
        >
          <h2>
            Nex<span>Meet</span>
          </h2>
        </div>

        <div className="nav-list">
          <p
            onClick={() => {
              router("/sef45");
            }}
          >
            Join as Guest
          </p>

          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>

          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      {/* ================= MAIN SECTION ================= */}

      <div className="landingMainContainer">
        {/* LEFT */}

        <div className="landingHeroContent">
          <h1>
            <span>Connect</span> With Your Loved
            <br />
            Ones
          </h1>

          <p>Cover a distance by NexMeet</p>

          <div role="button" className="getStartedBtn">
            <Link to="/auth">Get Started</Link>
          </div>
        </div>

        {/* RIGHT */}

        <div className="landingHeroImage">
          <img src="/mobile.png" alt="NexMeet video calling" />
        </div>
      </div>
    </div>
  );
};