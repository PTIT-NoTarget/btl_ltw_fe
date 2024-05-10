import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  CardMedia,
} from "@mui/material";

import "./styles.css";
import { useParams } from "react-router-dom";
import { useTopBarStore } from "../../store/TopBarStore";
import { useUserStore } from "../../store/UserStore";
import models from "../../lib/fetchModelData";
import { Link } from "react-router-dom";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const param = useParams();
  const [photos, setPhotos] = useState(null);
  const topBarStore = useTopBarStore();
  const { userList } = useUserStore();
  useEffect(() => {
    models.fetchUserModel(param.userId).then((data) => {
      topBarStore.setRightTitle(
        "Photos of " + data.first_name + " " + data.last_name
      );
    });
    
    models.fetchPhotoOfUserModel(param.userId).then((data) => {
      // set user for comment in photo
      if(data) {
        data.forEach((photo) => {
          photo.comments.forEach((comment) => {
            comment.user = userList.find((user) => user._id === comment.user_id);
          });
        });
      }
      console.log(data);
      setPhotos(data);
    });
  }, [param]);

  const convertDateTimetoString = (date_time) => {
    // hh:mm:ss dd/MM/yyyy
    const date = new Date(date_time);
    let day = ("0" + date.getDate()).slice(-2);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let year = date.getFullYear();

    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
  };

  return (
    <ImageList
      cols={1}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {photos?.map((item) => (
        <ImageListItem key={item._id}>
          <Card
            style={{
              border: "1px solid black",
            }}
          >
            <CardHeader
              title={"Time: " + convertDateTimetoString(item.date_time)}
            />
            <CardMedia
              component="img"
              image={require("../../images/" + item.file_name)}
              alt={item.file_name}
            />
            <CardContent>
              {item.comments?.map((comment) => (
                <Card
                  style={{
                    border: "1px solid black",
                    margin: "5px",
                  }}
                >
                  <CardHeader
                    component={Link}
                    title={
                      comment.user.first_name + " " + comment.user.last_name
                    }
                    subheader={convertDateTimetoString(comment.date_time)}
                    to={`/users/${comment.user_id}`}
                    style={{
                      textDecoration: "none",
                      color: "black",
                    }}
                  />
                  <CardContent>
                    <Typography>{comment.comment}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default UserPhotos;
