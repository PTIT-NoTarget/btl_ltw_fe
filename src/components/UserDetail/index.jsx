import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import "./styles.css";
import { Link, useParams } from "react-router-dom";

import models from "../../lib/fetchModelData";
import { useTopBarStore } from "../../store/TopBarStore";

function UserDetail() {
  const param = useParams();
  const [user, setUser] = useState(null);
  const topBarStore = useTopBarStore();
  useEffect(() => {
    
  }, []);
  return (
    <>
      <Typography variant="h4" color="inherit">
        {user?.first_name + " " + user?.last_name}
      </Typography>
      <Typography variant="h6" color="inherit">
        Location : {user?.location}
      </Typography>
      <Typography variant="h6" color="inherit">
        Description : {user?.description}
      </Typography>
      <Typography variant="h6" color="inherit">
        Occupation : {user?.occupation}
      </Typography>
      <Link
        to={`/photos/${param.userId}`}
        style={{
          color: "black",
        }}
      >
        Photo Gallery {">>"}
      </Link>
    </>
  );
}

export default UserDetail;
