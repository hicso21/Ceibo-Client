import * as React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Container
} from "@mui/material";
import { useNavigate } from "react-router";

function ThanksAdoption() {
const navigate = useNavigate();
    return (
        <Container style={{maxWidth: 450}}>
          <Grid sx={{ marginTop: 10, marginBottom: 10 }}>
            <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto", borderRadius: "17px" }}>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  ¡Gracias por llenar el formulario!
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  gutterBottom
                >
                  En breve nos estaremos comunicando con usted para finalizar con el proceso de adopción.
                </Typography>
                </CardContent>
            </Card>
          <Button
              color="inherit"
              fullWidth
              sx={{ mt: 5, bgcolor: "#FFD640", mb: 1, borderRadius: 7 }}
              onClick={() => {
                navigate("/");
              }}
            >
              Volver
            </Button>
          </Grid>
          </Container>
      );
    }
    
    export default ThanksAdoption;
