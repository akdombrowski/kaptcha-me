import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import LoginForm from "@/ui/LoginForm";
import Image from "next/image";
import Container from "@mui/material/Container";
export default function Login() {
  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", alignItems: "center", display: "flex" }}
    >
      <Grid
        container
        xs={12}
        justifyContent="center"
        alignItems="center"
        columnSpacing={6}
        height="100%"
      >
        <Grid xs={6} height="100%">
          <Box position="relative" px={3} height="100%">
            <Image
              id="kaptcha-me-design-image"
              src="/recaptcha-katpchame.webp"
              fill
              priority
              style={{ objectFit: "contain", overflow: "hidden" }}
              alt="katpcha-me design"
            />
          </Box>
        </Grid>
        <Grid xs={6}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
}
