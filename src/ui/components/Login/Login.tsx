"use client";
import "client-only";

import Grid from "@mui/material/Unstable_Grid2";
import LoginForm from "@/ui/components/Login/LoginForm";
import Container from "@mui/material/Container";
import getBGImg from "root/src/utils/getBGImg";
import { CSSProperties } from "react";

export default function Login() {
  const src = "/recaptcha-katpchame.webp";
  const bgImg = getBGImg({
    width: 535,
    height: 867,
    src: src,
    priority: true,
    alt: "kaptcha-me logo Image",
  });
  const style: CSSProperties = {
    overflow: "hidden",
    backgroundImage: bgImg,
    backgroundOrigin: "border-box",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left top",
    backgroundSize: "contain",
  };

  return (
    <Container maxWidth={false} sx={style}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid xs={3} />
        <Grid xs={9} md={8} lg={4} display="flex" alignItems="center">
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
}
