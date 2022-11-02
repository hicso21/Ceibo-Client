import { Button, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";
import { setUser } from "../../state/user";
import { getOnePet } from "../../state/pets";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./SingularPet.css";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const SingularPet = () => {
  const { pathname } = useLocation();
  const [favorites, setFavorites] = useState(false);
  const user = useSelector((state) => state.user);
  const pet = useSelector((state) => state.pets[0]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let fav;

  const handleFavorites = (pet) => {
    if (favorites) {
      axios
        .put(`https://okqobo-3001.preview.csb.app/api/user/favorites/remove/${user._id}`, pet)
        .then((r) => {
          dispatch(setUser(r.data));
        });
      setFavorites(false);
    } else {
      axios
        .put(`https://okqobo-3001.preview.csb.app/api/user/favorites/add/${user._id}`, pet)
        .then((r) => {
          dispatch(setUser(r.data));
        });
      setFavorites(true);
    }
  };

  const handleAdopt = () => {
    if (!user.email) navigate("/login");
    else navigate("/adoptionForm");
  };

  const handleContact = (fundationId) => {
    if (!user.email) navigate("/login");
    else navigate(`/chat/${fundationId}`);
  };

  const buttonStyle = {
    bgcolor: "#FFD640",
    mt: 2,
    borderRadius: 3,
  };

  const buttonAdoptedStyle = {
    bgcolor: "#D6D6D6",
    mt: 2,
    borderRadius: 3,
  };

  favorites
    ? (fav = (
        <>
          <StarIcon sx={{ height: 40, width: 40 }} />
        </>
      ))
    : (fav = (
        <>
          <StarBorderIcon sx={{ height: 40, width: 40 }} />
        </>
      ));

  useEffect(() => {
    dispatch(getOnePet(pathname.substring(10))).then(() => {
      axios
        .get(`https://okqobo-3001.preview.csb.app/api/user/favorites/${user?._id}`)
        .then((res) => {
          res.data.map((pet, i) => {
            if (pet._id == pathname.substring(10)) setFavorites(true);
          });
        });
    });
  }, [pathname]);

  return (
    <>
      <DrawerHeader/>
      <div className="mainContainer">
        <div className="imgContainer">
          <CardMedia>
            <img alt="" src={pet?.photos[0]} width="100%" id="petPhoto" />
          </CardMedia>
          <Box className="favContainer">
            <Box>
              {user.email && (
                <Button
                  onClick={() => handleFavorites(pet)}
                  sx={{ color: "inherit" }}
                >
                  {fav}
                </Button>
              )}
            </Box>
            <Box>
              <Button
                sx={{ color: "inherit" }}
                onClick={() => {
                  window.open(
                    `https://api.whatsapp.com/send?text=Adopta esta hermosa mascota!! ${window.location.href}`
                  );
                }}
              >
                <WhatsAppIcon
                  sx={{
                    height: 40,
                    width: 40,
                    color: "white",
                    bgcolor: "green",
                    borderRadius: 5,
                  }}
                />
              </Button>
            </Box>
          </Box>
        </div>
        
        <div className="main">
          <Card className="mainCard">
            <Stack padding={2} sx={{ maxWidth: "100%" }}>
              <Box className="mainBox">
                <Typography variant="h4" width={"20%"} paddingLeft={2}>
                  {pet?.name}
                </Typography>
                <Typography variant="h4" id="genero">
                  {pet?.gender === "hembra" ? (
                    <FemaleIcon sx={{ width: 40, height: 40 }} />
                  ) : (
                    <MaleIcon sx={{ width: 40, height: 40 }} />
                  )}
                </Typography>
              </Box>
              <Box className="mainBox">
                <Typography
                  variant="body"
                  width={"100%"}
                  paddingLeft={2}
                >{`Edad: ${pet?.age}`}</Typography>
                <Typography variant="body" id="tamanio">
                  {pet?.size}
                </Typography>
              </Box>
              <Box className="mainBox">
                <Typography>
                  <LocationOnIcon sx={{ paddingTop: 1 }} />
                  {pet?.location}
                </Typography>
              </Box>
            </Stack>
          </Card>
          <Card className="descriptionCard">
            <Typography variant="h6">
              <AssignmentIcon sx={{ paddingTop: 1, width: 30 }} /> Descripción:
            </Typography>
            <Typography sx={{ paddingTop: 2, pl: 2 }}>{pet?.history}</Typography>
            <Box className="dataBox">
              <Typography sx={{ paddingTop: 2, pl: 2 }}>
                Castrado
                {pet?.neutered ? (
                  <CheckIcon sx={{ pt: 1 }} />
                ) : (
                  <CloseIcon sx={{ pt: 1 }} />
                )}
              </Typography>
              <Typography sx={{ paddingTop: 2, pl: 12 }}>
                Vacunado
                {pet?.vaccinated ? (
                  <CheckIcon sx={{ pt: 1 }} />
                ) : (
                  <CloseIcon sx={{ pt: 1 }} />
                )}
              </Typography>
            </Box>
          </Card>
          <div className="buttonContainer">
            {pet?.adopted ? (
              <Button color="inherit" sx={buttonAdoptedStyle} disabled>
                <Typography variant="body1" color="black">
                  Adoptado
                </Typography>
              </Button>
            ) : (
              <Button color="inherit" sx={buttonStyle} onClick={handleAdopt}>
                Adoptar
              </Button>
            )}
            <Button
              color="inherit"
              sx={buttonStyle}
              onClick={() => handleContact(pet?.foundation?._id)}
            >
              {`Contactar con la fundación ${pet?.foundation?.name}`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingularPet;
