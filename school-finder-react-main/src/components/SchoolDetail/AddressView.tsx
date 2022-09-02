import React from "react";
import { Typography, Tooltip, Link } from "@mui/material";

type AddressProp = {
  address: string;
};

export default function Address(props: AddressProp) {
  return (
    <Typography variant="subtitle2">
      Address:{" "}
      <Tooltip title="Search in Google Maps" arrow>
        <Link
          href={"https://www.google.com/maps/place/" + props.address}
          target="_blank"
        >
          {props.address}
        </Link>
      </Tooltip>
    </Typography>
  );
}
