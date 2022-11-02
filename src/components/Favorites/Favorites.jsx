import axios from "axios";
import { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardMedia,
  CardActions,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import logoGatito from "../../assets/gatitoLogo.png";
import logoPerrito from "../../assets/perritoLogo.png";
import sadCat from "../../assets/sadCat.png";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import useMatches from "../../hooks/useMatches";
import backgroundImage from "../../assets/fondo-huellas - Edited.png";
import "./Favorites.css";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const ShowFavorites = () => {
  let empty = <></>;
  const { pathname } = useLocation();
  const [favorites, setFavorites] = useState([]);
  const user = useSelector((state) => state.user);
  const matches = useMatches();

  useEffect(() => {
    axios
      .get(`https://okqobo-3001.preview.csb.app/api/user/favorites/${user?._id}`)
      .then((res) => {
        setFavorites(res.data);
        return res.data;
      });
  }, [pathname]);

  favorites[0]
    ? (empty = <></>)
    : matches
    ? (empty = (
        <>
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            Aún no tienes favoritos...
          </Typography>
          <img src={sadCat} width="150" height="150" alt="gatitoSad" style={{marginTop: 25}} />
          <Button
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <Link to="/mascotas">
              <Typography variant="body1">
                Haz click aqui para agregar mascotas a favoritos!!
              </Typography>
            </Link>
          </Button>
        </>
      ))
    : (empty = (
        <>
          <Typography
            variant="h4"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 5,
            }}
          >
            Aun no tienes
          </Typography>
          <Typography
            variant="h4"
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            favoritos
          </Typography>
          <Button
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 15,
            }}
          >
            <Link to="/mascotas">
              <Typography variant="body1">
                Haz click aqui para agregar mascotas a favoritos
              </Typography>
            </Link>
          </Button>
        </>
      ));

  return (
    <>
      {!matches ? <DrawerHeader /> : <></>}
      <div
        style={{
          backgroundColor: backgroundImage,
        }}
      >
        <Container className="mainContainerFav">
          <div id="title">
            <Typography variant="h3">Favoritos</Typography>
          </div>
          <Grid className="gridContainer" container my={4}>
            {empty}
            {favorites?.map((favoritos, i) => {
              return (
                <Link
                  to={`/mascotas/${favoritos._id}`}
                  key={favoritos._id}
                  style={{
                    textDecoration: "none",
                    margin: "0px auto",
                    minWidth: 295,
                  }}
                >
                  <Grid item xs={12} p={2} key={favoritos._id}>
                    <Card className="superCard">
                      <CardMedia>
                        <img src={favoritos.photos[0]} alt="" id="imgPet" />
                      </CardMedia>
                      <CardContent className="petCard">
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          className="petName"
                        >
                          {favoritos?.adopted ? (
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="span"
                              className="petName"
                            >
                              {`${favoritos.name} - ADOPTADO`}
                            </Typography>
                          ) : (
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="span"
                              className="petName"
                            >
                              {favoritos.name}
                            </Typography>
                          )}
                        </Typography>
                        <div className="petIconsContainer">
                          <Typography variant="body2" color="text.secondary">
                            {favoritos.specie === "perro" ? (
                              <img
                                src={logoPerrito}
                                width="40"
                                height="40"
                                alt="perrito"
                              />
                            ) : (
                              <img
                                src={logoGatito}
                                width="40"
                                height="40"
                                alt="gatito"
                              />
                            )}
                          </Typography>
                          <Typography variant="body4" color="text.secondary">
                            {favoritos.gender === "hembra" ? (
                              <FemaleIcon sx={{ width: 40, height: 40 }} />
                            ) : (
                              <MaleIcon sx={{ width: 40, height: 40 }} />
                            )}
                          </Typography>
                          {favoritos?.adopted ? (
                            <HomeIcon
                              color="grey"
                              className="icon"
                              sx={{ width: 40, height: 40, color: "grey" }}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Link>
              );
            })}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default ShowFavorites;
