import React from "react";
import {
  ListItemButton,
  ListItemText,
  Collapse,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Box } from "@mui/system";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { Cutoff } from "../../models/Cutoff";

type AdmissionProps = {
  requirements: Cutoff[];
};

export default function Admission(props: AdmissionProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const rows = props.requirements.filter((cutoff) => cutoff.range != "-");

  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Entry Requirements" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <TableContainer>
          <Table size="small" aria-label="cutoff-table">
            <TableHead>
              <TableRow>
                <TableCell>Aggregate</TableCell>
                <TableCell>Range</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.range}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
    </Box>
  );
}
