import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export default function NotFound() {
  return (
    <Container maxWidth={false}>
      <Grid container>
        <Grid xs={12}>
          <Typography variant="h4">Page Not Found...</Typography>
          <Typography variant="h4">psst. go back and try again</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
