import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import React, { useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import useMatches from "../hooks/useMatches";
import Bienvenidos from "../assets/bienvenidos.png";

function Home() {
  const [pets, setPets] = useState([]);
  const [foundations, setFoundations] = useState([]);
  const dispatch = useDispatch();

  //false = mobile  ---  true = desktop
  const matches = useMatches();

  //style variables
  let TitlePetsStyle;
  let TitleFoundationsStyle;
  let ImageStyle;
  let ImageStylePets;
  let ImageStyleFoundation;
  let ImageListStylePets;
  let ImageListStyleFoundation;
  let BoxStyle;
  let CardStyle;
  let variant, WelcomeImage;

  if (matches) {
    variant = "h3";
    WelcomeImage = {
      backgroundImage: "url(https://i.ibb.co/HtyS7xs/Bienvenidos-2.png)",
      width: "100%",
      height: "300px",
      ml: 25,
      mb: 5,
      objectFit: "cover",
      backgroundRepeat: "no-repeat",
    };
    BoxStyle = {
      width: "100vw",
    };
    TitlePetsStyle = { paddingLeft: "10%", paddingBottom: "2%" };
    TitleFoundationsStyle = {
      paddingLeft: "10%",
      paddingBottom: "2%",
      paddingTop: "4%",
    };
    CardStyle = { width: "88%", borderRadius: "17px" };
    ImageStyle = {
      width: "95%",
      height: "40%",
      display: "flex",
      flexDirection: "row",
      margin: "auto",
    };
    ImageStylePets = {
      height: 300,
      borderRadius: 15,
      width: 200,
      objectFit: "cover",
    };
    ImageListStyleFoundation = {
      width: "100%",
      height: "50%",
      display: "flex",
      flexDirection: "row",
    };
    ImageStyleFoundation = { maxHeight: 300, width: 200, borderRadius: 15 };
  } else {
    variant = "h4";
    WelcomeImage = {
      backgroundImage: "url(https://i.ibb.co/HtyS7xs/Bienvenidos-2.png)",
      width: "90",
      height: "200px",
      mb: 5,
      ml: -13,
      objectFit: "cover",
      backgroundRepeat: "no-repeat",
    };
    BoxStyle = {
      p: 2,
      pt: 3,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: "auto 0px",
      width: "100%",
    };
    TitlePetsStyle = { paddingBottom: "4%", paddingTop: "6%" };
    TitleFoundationsStyle = { paddingBottom: "4%", paddingTop: "6%" };
    CardStyle = { maxWidth: "90%", margin: "0 auto", borderRadius: "17px" };
    ImageStyle = {
      width: 327,
      height: 235,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };
    ImageStylePets = {
      height: 300,
      borderRadius: 15,
      width: 270,
      objectFit: "cover",
      marginLeft:-40
    };
    ImageListStyleFoundation = {
      width: 327,
      height: 235,
      display: "flex",
      flexDirection: "column",
    };
    ImageStyleFoundation = { maxHeight: 300, borderRadius: 15, width: 200 };
  }

  useEffect(() => {
    axios
      .get("https://okqobo-3001.preview.csb.app/api/pets/some")
      .then((pets) => setPets(pets.data));
    axios
      .get("https://okqobo-3001.preview.csb.app/api/foundation/some")
      .then((foundations) => setFoundations(foundations.data));
  }, []);

  function ImageListPets({ items, type }) {
    return (
      <ImageList sx={ImageStyle} className="imageList">
        {items?.map((item, i) => {
          return (
            <Link
              to={`/${type}/${item._id}`}
              style={{
                color: "inherit",
                textDecoration: "none",
                padding: 5,
                width: 200,
              }}
              key={i}
            >
              <ImageListItem>
                <img
                  src={item.photos}
                  alt={item.name}
                  loading="lazy"
                  style={ImageStylePets}
                />
                <ImageListItemBar
                  title={`Haz click aqui para conocer a ${item.name}!`}
                  subtitle={<span>{item.foundation.name}</span>}
                  position="below"
                />
              </ImageListItem>
            </Link>
          );
        })}
      </ImageList>
    );
  }

  function ImageListFoundations({ items, type }) {
    return (
      <ImageList sx={ImageStyle} className="imageList">
        {items?.map((item, i) => (
          <Link
            to={`/${type}/${item._id}`}
            style={{
              color: "inherit",
              textDecoration: "none",
              padding: 5,
              width: 200,
            }}
            key={i}
          >
            <ImageListItem>
              <img
                src={item.profile_picture}
                alt={item.name}
                loading="lazy"
                style={ImageStyleFoundation}
              />
              <ImageListItemBar
                title={`Fundacion ${item.name}`}
                subtitle={<span>{item.foundation}</span>}
                position="below"
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    );
  }

  return (
    <div>
      <Box sx={WelcomeImage}></Box>
      {/* <img src={Bienvenidos} alt="bienvenidos"/> */}

      <Container sx={BoxStyle}>
        <Typography variant={variant} style={TitlePetsStyle}>
          Algunas mascotas...
        </Typography>
        <Card style={CardStyle}>
          <CardContent>
            <ImageListPets items={pets} type={"mascotas"} />
          </CardContent>
        </Card>
        <Typography variant={variant} style={TitleFoundationsStyle}>
          Algunas fundaciones...
        </Typography>
        <Card style={CardStyle}>
          <CardContent>
            <ImageListFoundations items={foundations} type={"fundaciones"} />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Home;
