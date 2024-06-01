import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Countdown() {
  const [countdown, setCountdown] = useState<number>(3);
  const [color, setColor] = useState<string>("#000000");
  const COLORS = ["#00FF00", "#fcf300", "#FF0000", "#000000"];
  const holdOnZeroMillis = 1500;

  // handler runs every 1 second to change the countdown
  const countdownHandler = () => {
    // decrement countdown
    if (countdown > 0) {
      setColor(COLORS[countdown - 1]);
      setCountdown((countdown) => --countdown);
    } else {
      // if countdown has hit 0, hold for an extra {holdOnZeroMillis} amont of
      // time before disappearing
      setTimeout(() => {
        setCountdown((countdown) => --countdown);
      }, holdOnZeroMillis);
    }
  };

  useEffect(() => {
    let intervalID;
    // In order to make sure interval timers don't continuously get created,
    // only create until, and including, 0
    if (countdown >= 0) {
      intervalID = setInterval(countdownHandler, 1000);
    }

    // cleanup function to delete interval timer
    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [countdown]);

  if (countdown < 0) {
    return <></>;
  }

  return (
    <Box
      position="absolute"
      top="0"
      left="35vw"
      overflow="hidden"
      height="100vh"
    >
      <Typography
        component="h1"
        fontWeight={1000}
        fontSize="50vw"
        color={color}
        lineHeight="50vw"
        textOverflow="hidden"
        sx={{ overflow: "hidden" }}
      >
        {countdown}
      </Typography>
    </Box>
  );
}
