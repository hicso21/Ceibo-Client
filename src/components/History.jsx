import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Stack } from "@mui/system";
import { Box, Button } from "@mui/material";
import useMatches from "../hooks/useMatches";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import backgroundImage from "../assets/fondo-huellas - Edited.png";
import { styled } from "@mui/material/styles";
import sadCat from "../assets/sadCat.png";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function History() {
  const user = useSelector((state) => state.user);
  const [adoptados, setAdoptados] = useState([]);
  const { pathname } = useLocation();
  //false = mobile  ---  true = desktop
  const matches = useMatches();

  let typography;

  const [comment, setComment] = useState("");

  const comentario = {
    comments: `Nombre: ${user.name} ${user.last_name},Comentario: ${comment}`,
  };

  const handlerClickComment = (idFund) => {
    axios.put(
      `https://okqobo-3001.preview.csb.app/api/foundation/comments/add/${idFund}`,
      comentario
    );
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const commentChange = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`https://okqobo-3001.preview.csb.app/api/user/adopted/${user?._id}`)
      .then((res) => {
        setAdoptados(res.data);
      });
  }, [pathname]);

  if (matches) {
    typography = "h3";
  } else {
    typography = "h4";
  }

  const buttonStyle = {
    bgcolor: "#FFD640",
    mb: 4,
    borderRadius: 10,
  };

  return (
    <>
      {!matches?<DrawerHeader/>:<></>}
      <Box sx={{ p: 3, height: "100%", bgcolor: backgroundImage }}>
        <br />
          <div id="title">
            <Typography variant={typography}>
              Tus Mascotas Adoptadas
            </Typography>
          </div>
        <br />

        {!adoptados[0] ? (
          <>
            <Typography
              variant={matches ? "h4" : "h5"}
              sx={{ display: "flex", justifyContent: "center", pt: 9 }}
            >
              Aun no has adoptado ninguna mascota...
            </Typography>
            <Box sx={{width:'100%', display:'flex', justifyContent:'center', mt:3}}>
              <img src={sadCat} width="150" height="150" alt="gatitoSad" style={{marginTop: 25}} />
            </Box>
            <Typography
              variant={matches ? "h5" : "h6"}
              sx={{ display: "flex", justifyContent: "center", pt: 15 }}
            >
              <Link to="/mascotas">Haz click aqui y adopta una mascota!!</Link>
            </Typography>
          </>
        ) : (
          adoptados.map((pet) => {
            return (
              <Accordion key={pet._id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{pet.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Name: {pet.name}</Typography>
                  <Typography>Especie: {pet.specie}</Typography>
                  <Typography>Genero: {pet.gender}</Typography>
                  <Typography>Tamaño: {pet.size}</Typography>
                  <Typography>
                    Vacundo: {pet.vaccinated ? "Si" : "No"}
                  </Typography>
                  <Typography>Castrado: {pet.neuterd ? "Si" : "No"}</Typography>
                  <br />
                  <Button
                    onClick={handleClickOpen}
                    variant="outlined"
                    color="inherit"
                    sx={buttonStyle}
                  >
                    Por favor comentá tu experiencia de adopción
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Adopcion</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Por favor escribe una reseña de la experiencia al
                        adoptar con la fundación.
                      </DialogContentText>
                      <TextField
                        onChange={commentChange}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Comentario"
                        fullWidth
                        variant="standard"
                        multiline
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} sx={buttonStyle}>
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handlerClickComment(pet.foundation);
                        }}
                        sx={buttonStyle}
                      >
                        Completado
                      </Button>
                    </DialogActions>
                  </Dialog>
                </AccordionDetails>
              </Accordion>
            );
          })
        )}
      </Box>
    </>
  );
}
