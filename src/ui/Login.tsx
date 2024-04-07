"use client";
import "client-only";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import SignInBtn from "@/ui/sign-in-btn";
import { alpha, useTheme } from "@mui/material/styles";
import Image from "next/image";
import Container from "@mui/material/Container";

import { useRef, useEffect, useState } from "react";

export const SignInPage = () => {
  const ref = useRef<typeof Image>(null);
  const [imgH, setImgH] = useState<string | number>("50vh");
  const theme = useTheme();

  const imageHeight = (id: string) => {
    const a = 0;
  };

  useEffect(() => {}, []);

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
              style={{ objectFit: "contain", overflow: "hidden" }}
              alt="katpcha-me design"
            />
          </Box>
        </Grid>
        <Grid
          xs={6}
        >
            <SignInBtn />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInPage;
