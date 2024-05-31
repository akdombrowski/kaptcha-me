import Box from "@mui/material/Box";

import type { ReactNode } from "react";

export interface IKaptchaMeFormProps {
  formAction: () => {};
  formID: string;
  children: ReactNode;
}

export default function KaptchaMeForm(props: IKaptchaMeFormProps) {
  const { formAction, formID, children } = props;

  return (
    <Box
      height="100%"
      width="100%"
      component="form"
      action={formAction}
      name={formID}
    >
      {children}
    </Box>
  );
}
