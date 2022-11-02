import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useMatches from "../../hooks/useMatches";
import { getAllFoundations } from "../../state/foundations";
import "./Foundations.css";
import backgroundImage from "../../assets/fondo-huellas - Edited.png";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ShowFoundations = () => {
  const foundations = useSelector((state) => state.foundations);
  const dispatch = useDispatch();

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let imgStyle;

  if (matches) {
    imgStyle = { objectFit: "cover", minWidth: 500 };
  } else {
  }

  useEffect(() => {
    dispatch(getAllFoundations());
  }, []);

  return (
    <>
      {!matches?<DrawerHeader/>:<></>}
      <div className="divContainer">
        <div id="title">
          <Typography
            variant="h3"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Fundaciones
          </Typography>
        </div>
        <Box
          container
          my={4}
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {foundations?.map((fundacion) => {
            return (
              <Link
                to={`/fundaciones/${fundacion._id}`}
                key={fundacion._id}
                style={{
                  textDecoration: "none",
                }}
              >
                <Grid className="gridContainer" item xs={12} p={2}>
                  <Card className="foundationCard">
                    <CardMedia>
                      <img
                        src={fundacion.profile_picture}
                        alt=""
                        className="foundationImg"
                        width="100%"
                      />
                    </CardMedia>
                    <CardContent className="content">
                      <Typography className="name" variant="h5">
                        {fundacion.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Link>
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default ShowFoundations;
