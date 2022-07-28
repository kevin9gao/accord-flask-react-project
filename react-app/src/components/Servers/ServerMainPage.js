import React from "react";
import ChannelsNavBar from "../Channels/ChannelsNavBar";
import './ServerMainPage.css'

const ServerMainPage = () => {
  return (
    <div className="container">
      <ChannelsNavBar />
      <div className="main-page">
        <h1>
          Find your community on Accord
        </h1>
      </div>
  
    </div>
  );
}

export default ServerMainPage;
