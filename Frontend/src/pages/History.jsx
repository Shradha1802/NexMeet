import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import HomeIcon from "@mui/icons-material/Home";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

import "../styles/History.css";

export default function History() {
    let navigate = useNavigate();
  
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const routeTo = useNavigate();


  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const history = await getHistoryOfUser();

        setMeetings(history);

      } catch (error) {

        console.error("Error fetching meeting history:", error);

        // IMPLEMENT SNACKBAR

      }

    };

    fetchHistory();

  }, []);


  const formatDate = (dateString) => {

    const date = new Date(dateString);

    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");

    const month = (date.getMonth() + 1)
      .toString()
      .padStart(2, "0");

    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };


  return (
    <div className="historyPage">
      {/* ================= HEADER ================= */}

      <header className="historyHeader">
        <div
          className="historyLogo"
          onClick={() => {
            navigate("/");
          }}
          style={{ cursor: "pointer" }}
        >
          Nex<span>Meet</span>
        </div>

        <IconButton
          className="homeIconButton"
          onClick={() => {
            routeTo("/home");
          }}
        >
          <HomeIcon />
        </IconButton>
      </header>

      {/* ================= MAIN ================= */}

      <main className="historyMain">
        <div className="historyTitleSection">
          <div className="historyTitleIcon">
            <AccessTimeOutlinedIcon />
          </div>

          <div>
            <h1>Meeting History</h1>

            <p>View your previous NexMeet meetings</p>
          </div>
        </div>

        {/* ================= HISTORY LIST ================= */}

        {meetings.length !== 0 ? (
          <div className="historyList">
            {meetings.map((e, i) => (
              <Card className="historyCard" key={i}>
                <CardContent>
                  <div className="historyCardTop">
                    <div className="meetingIcon">
                      <VideoCallOutlinedIcon />
                    </div>

                    <div className="meetingInfo">
                      <Typography className="meetingLabel">
                        Meeting Code
                      </Typography>

                      <Typography className="meetingCode">
                        {e.meetingCode}
                      </Typography>
                    </div>
                  </div>

                  <div className="meetingDate">
                    <AccessTimeOutlinedIcon />

                    <span>{formatDate(e.date)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="emptyHistory">
            <div className="emptyHistoryIcon">
              <VideoCallOutlinedIcon />
            </div>

            <h2>No meetings yet</h2>

            <p>
              Your meeting history will appear here after you join a NexMeet
              meeting.
            </p>

            <Button
              className="startMeetingBtn"
              onClick={() => {
                routeTo("/home");
              }}
            >
              Start a Meeting
              <span>→</span>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}