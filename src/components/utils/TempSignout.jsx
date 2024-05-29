import React from "react";
import { Button } from "@mui/material";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

function TempSignout() {
  const handleSignout = () => {
    try {
      signOut(auth);
      console.log("Signout Successful");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      Boards Screen
      <Button onClick={handleSignout}>signout</Button>
    </div>
  );
}

export default TempSignout;
