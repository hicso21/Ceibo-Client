import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Box,
  Paper,
  Button,
  Pagination,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import logoGatito from "../../assets/gatitoLogo.png";
import logoPerrito from "../../assets/perritoLogo.png";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Crop169Icon from "@mui/icons-material/Crop169";
import Crop32Icon from "@mui/icons-material/Crop32";
import Crop54Icon from "@mui/icons-material/Crop54";
import HomeIcon from "@mui/icons-material/Home";
import useMatches from "../../hooks/useMatches";
import { useEffect } from "react";
import {
  getAllPets,
  searchByGender,
  searchBySize,
  searchBySpecie,
} from "../../state/search";
import { useState } from "react";
import "./Pets.css";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const Pets = () => {
  let typeOfView;
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const advancedSearch = useSelector((state) => state.search);
  const [expanded, setExpanded] = React.useState("");

  const matches = useMatches();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleGender = (busqueda) => {
    navigate(`/mascotas?byGender`);
    dispatch(searchByGender(busqueda));
  };

  const handleSize = (busqueda) => {
    navigate(`/mascotas?bySize`);
    dispatch(searchBySize(busqueda));
  };

  const handleSpecie = (busqueda) => {
    navigate(`/mascotas?bySpecie`);
    dispatch(searchBySpecie(busqueda));
  };

  if (matches) {
    typeOfView = "row";
  } else {
    typeOfView = "column";
  }

  useEffect(() => {
    if (!advancedSearch[0]) {
      dispatch(getAllPets());
    }
  }, [matches]);

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const petsPerPage = 6;
  const pagesVisited = pageNumber * petsPerPage;

  const displayPets = advancedSearch.slice(
    pagesVisited,
    pagesVisited + petsPerPage
  );

  const changePage = (selected) => {
    setPageNumber(selected.target.textContent - 1);
  };

  return (
    <>
      {!matches?<DrawerHeader/>:<></>}
      <div className="mainContainerPet">
        <div id="title">
          <Typography variant="h3">Mascotas</Typography>
        </div>
        <Grid container my={4}>
          <Box className="accordionBox">
            <Accordion
              className="accordion"
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>Buscar por categorias</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: typeOfView,
                    justifyContent: "center",
                  }}
                >
                  <Container sx={{ justifyContent: "center" }}>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      Generos
                    </Typography>
                    <Container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleGender("macho");
                        }}
                      >
                        <MaleIcon sx={{ width: 60, height: 60 }} />
                      </Button>
                      <Button
                        onClick={() => {
                          handleGender("hembra");
                        }}
                      >
                        <FemaleIcon
                          sx={{ width: 60, height: 60, color: "pink" }}
                        />
                      </Button>
                    </Container>
                  </Container>
                  <Container>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      Tamaño
                    </Typography>
                    <Container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleSize("chico");
                        }}
                      >
                        <Crop169Icon
                          sx={{ width: 60, height: 60, color: "gray" }}
                        />
                      </Button>
                      <Button
                        onClick={() => {
                          handleSize("mediano");
                        }}
                      >
                        <Crop32Icon
                          sx={{ width: 60, height: 60, color: "gray" }}
                        />
                      </Button>
                      <Button
                        onClick={() => {
                          handleSize("grande");
                        }}
                      >
                        <Crop54Icon
                          sx={{ width: 60, height: 60, color: "gray" }}
                        />
                      </Button>
                    </Container>
                  </Container>
                  <Container>
                    <Typography
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      Especie
                    </Typography>
                    <Container
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={() => {
                          handleSpecie("perro");
                        }}
                      >
                        <img
                          src={logoPerrito}
                          width="60"
                          height="60"
                          alt="perrito"
                        />
                      </Button>
                      <Button
                        onClick={() => {
                          handleSpecie("gato");
                        }}
                      >
                        <img
                          src={logoGatito}
                          width="50"
                          height="50"
                          alt="perrito"
                        />
                      </Button>
                    </Container>
                  </Container>
                </Container>
              </AccordionDetails>
            </Accordion>
          </Box>
          <Box className="gridContainer">
            {displayPets.map((mascota) => {
              return (
                <Link
                  to={`/mascotas/${mascota._id}`}
                  key={mascota._id}
                  style={{ textDecoration: "none" }}
                >
                  <Grid item xs={12} p={2} key={mascota._id}>
                    <Card className="superCard">
                      <CardMedia>
                        <img id="imgPet" src={mascota.photos[0]} alt="" />
                      </CardMedia>
                      <div className="petCard">
                        {mascota?.adopted ? (
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="span"
                            className="petName"
                          >
                            {`${mascota.name} - ADOPTADO`}
                          </Typography>
                        ) : (
                          <Typography
                            gutterBottom
                            variant="h4"
                            component="span"
                            className="petName"
                          >
                            {mascota.name}
                          </Typography>
                        )}

                        <div className="petIconsContainer">
                          <Typography className="icon">
                            {mascota.specie === "perro" ? (
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
                            {mascota?.gender === "hembra" ? (
                              <FemaleIcon sx={{ width: 40, height: 40 }} />
                            ) : (
                              <MaleIcon sx={{ width: 40, height: 40 }} />
                            )}
                          </Typography>

                          {mascota?.adopted ? (
                            <HomeIcon
                              color="text.secondary"
                              className="icon"
                              sx={{ width: 40, height: 40 }}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        {/* <Typography variant="body2" color="text.secondary">
                                  {mascota.foundation}
                                  </Typography> */}
                      </div>
                    </Card>
                  </Grid>
                </Link>
              );
            })}
          </Box>
        </Grid>
        <Pagination
          count={Math.ceil(advancedSearch.length / petsPerPage)}
          onChange={changePage}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
          hidePrevButton
          hideNextButton
        />
      </div>
    </>
  );
};

export default Pets;
