import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export default function Loading() {
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid xs={12}>
          <Typography variant="h4">Loading...</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
