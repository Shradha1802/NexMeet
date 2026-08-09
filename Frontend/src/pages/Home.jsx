import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";

import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";

import { AuthContext } from "../contexts/AuthContext";

function Home() {
  let navigate = useNavigate();

  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <div className="homePage">
      {/* ================= HEADER ================= */}

      <header className="homeHeader">
        <div
          className="homeLogo"
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Nex<span>Meet</span>
        </div>

        <div className="headerActions">
          <Button
            className="historyBtn"
            startIcon={<HistoryIcon />}
            onClick={() => {
              navigate("/history");
            }}
          >
            History
          </Button>

          <Button
            className="logoutBtn"
            startIcon={<LogoutIcon />}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="homeMain">
        {/* LEFT SIDE */}

        <section className="homeLeft">
          <div className="qualityBadge">
            <VideocamOutlinedIcon />

            <span>High Quality • Secure • Reliable</span>
          </div>

          <h1 className="homeHeading">
            Your meetings,
            <br />
            <span>connected simply.</span>
          </h1>

          <p className="homeSubtitle">
            Join any meeting in seconds using a meeting code and start
            connecting with your team.
          </p>

          {/* MEETING CODE */}

          <div className="joinSection">
            <h3>Enter meeting code</h3>

            <div className="meetingInputWrapper">
              <TextField
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                placeholder="Enter meeting code"
                variant="outlined"
                className="meetingInput"
              />

              <Button className="joinMeetingBtn" onClick={handleJoinVideoCall}>
                Join
                <span>→</span>
              </Button>
            </div>
          </div>

          {/* FEATURES */}

          <div className="homeFeatures">
            <div className="homeFeature">
              <ShieldOutlinedIcon />

              <div>
                <h4>Secure</h4>

                <p>End-to-end encrypted meetings</p>
              </div>
            </div>

            <div className="homeFeature">
              <BoltOutlinedIcon />

              <div>
                <h4>Easy to Use</h4>

                <p>Join with a meeting code in one click</p>
              </div>
            </div>

            <div className="homeFeature">
              <ComputerOutlinedIcon />

              <div>
                <h4>High Quality</h4>

                <p>Crystal clear HD audio & video</p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}

        <section className="homeRight">
          <div className="visualCard">
            <div className="visualGlow"></div>

            <img src="/logo3.png" alt="NexMeet video meeting" />

            <div className="visualOverlay">
              <div className="liveIndicator">
                <span></span>
                NexMeet
              </div>

              <div className="participantCount">
                <GroupsOutlinedIcon />
                <span>Video Meeting</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default withAuth(Home);