// Serves the home page (page that the user is redirected to upon login)
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ServersNavBar from "../Servers/ServersNavbar";


const PrivateServer = () => {

  return (
    <div>
      <ServersNavBar />
    </div>
  );
}

export default PrivateServer;
