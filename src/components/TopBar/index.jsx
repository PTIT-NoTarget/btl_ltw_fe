import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTopBarStore } from "../../store/TopBarStore";

import "./styles.css";

function TopBar() {
  const topBarStore = useTopBarStore();
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          sx={{ display: "flex", justifyContent: "space-between" , width: "100%"}}
        >
          <Typography variant="p" color="inherit">
            {topBarStore.leftTitle}
          </Typography>
          <Typography variant="p" color="inherit">
            {topBarStore.rightTitle}
          </Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
