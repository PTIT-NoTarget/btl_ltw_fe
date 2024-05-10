import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import { Link } from "react-router-dom";

import "./styles.css";
import models from "../../lib/fetchModelData";
import {useUserStore} from "../../store/UserStore";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  const [users, setUsers] = React.useState(null);
  const UserStore = useUserStore();
  React.useEffect(() => {
    models.fetchUserList()
      .then((data) => {
        setUsers(data);
        UserStore.setUsers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <List component="nav">
        {users?.map((item) => (
          <>
            <ListItem key={item._id}>
              <Link
                key={item._id}
                to={`/users/${item._id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <ListItemText
                  primary={item.first_name + " " + item.last_name}
                />
              </Link>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
