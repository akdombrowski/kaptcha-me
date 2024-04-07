import Box from "@mui/material/Box";

import Image from "next/image";

export default function CardImageHeader() {
  return (
      <Image
        src="/recaptcha-katpchame.webp"
        fill
        alt="katpcha-me design"
        style={{
          objectFit: "contain",
          overflow: "hidden",
        }}
      />
  );
}
