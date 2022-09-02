import React from "react";
import { Typography, Tooltip, Link } from "@mui/material";

type PhoneProp = {
  phone: string;
};

export default function Phone(props: PhoneProp) {
  return (
    <Typography variant="subtitle2">
      Phone:{" "}
      <Tooltip title="Call" arrow>
        <Link href={"tel:" + props.phone}>{props.phone}</Link>
      </Tooltip>
    </Typography>
  );
}
