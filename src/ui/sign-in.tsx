"use client";
import "client-only";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import SignInBtn from "@/ui/sign-in-btn";
import { alpha, useTheme } from "@mui/material/styles";
import Image from "next/image";
import Container from "@mui/material/Container";

export const SignInPage = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", alignItems: "center", display: "flex" }}
    >
      <Grid container xs={12} justifyContent="center" alignItems="center" columnSpacing={6}>
        <Grid xs={3} sm={4} md={5}>
          <Box position="relative" sx={{ aspectRatio: 535 / 867 }}>
            <Image
              src="/recaptcha-katpchame.webp"
              fill
              alt="katpcha-me design"
            />
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={8}
          md={7}
          component={Paper}
          elevation={6}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            backgroundColor: alpha(theme.palette.background.paper, 0.5),
          }}
        >
          <Stack justifyContent="center" alignItems="center">
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <SignInBtn />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
