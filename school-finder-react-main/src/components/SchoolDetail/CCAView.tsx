import {
  ListItemButton,
  ListItemText,
  Typography,
  Collapse,
} from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { Box } from "@mui/system";
import React from "react";

type CCAProps = {
  ccas: string[];
};

export default function CCA(props: CCAProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Co-Curricular Activities Offered" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box marginX={2} marginY={1}>
          {props.ccas.map((cca, i) => (
            <Typography key={i} fontSize={14}>
              {cca
                .replace("(Girls and Boys)", "")
                .replace("(Girls)", "")
                .replace("(Boys)", "")}
            </Typography>
          ))}
          <Typography variant="subtitle2" fontSize={12} marginY={1}>
            Check the school website for more information on CCAs offered
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}
