import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

import { SyntheticEvent } from "react";

export default function DifficultySlider({ formID }: { formID: string }) {
  const theme = useTheme();

  const handleChange = (
    ev: Event | SyntheticEvent,
    value: number | number[],
  ): void => {
    ev.preventDefault();
    console.log(
      "radio difficulty selected:",
      (ev.currentTarget as HTMLInputElement).value,
    );
  };

  const marks = [
    {
      value: 0,
      label: "Easy",
    },
    {
      value: 1,
      label: "Medium",
    },
    {
      value: 2,
      label: "Hard",
    },
  ];

  const getLabelForValue = (value: number) => {
    return marks.find((mark) => mark.value === value)?.label ?? "???";
  };

  return (
    <FormControl id="difficulty-radio-btn-group-label" fullWidth>
      <FormLabel id="difficulty-radio-btn-group-label">Difficulty</FormLabel>
      <Box px={3}>
        <Slider
          slotProps={{ input: { form: formID, name: "difficulty" } }}
          aria-label="Difficulty"
          defaultValue={1}
          getAriaValueText={getLabelForValue}
          valueLabelDisplay="auto"
          step={null}
          min={0}
          max={2}
          shiftStep={1}
          marks={marks}
          track={false}
          sx={{
            ".MuiSlider-markLabelActive": { fontWeight: 700, fontSize: "1rem" },
          }}
          onChangeCommitted={handleChange}
        />
      </Box>
    </FormControl>
  );
}
