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

type SubjectProps = {
  subjects: string[];
};

export default function Subject(props: SubjectProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Subjects Offered" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box marginX={2} marginY={1}>
          {props.subjects.map((subject, i) => (
            <Typography key={i} fontSize={14}>
              {subject}
            </Typography>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
