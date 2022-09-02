import * as React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Address from "./AddressView";
import Phone from "./PhoneView";
import Website from "./WebsiteView";
import Email from "./EmailView";

type SchoolOverviewProps = {
  name: string;
  website: string;
  email: string;
  level: string;
  address: string;
  phone: string;
};

export default function SchoolOverview(props: SchoolOverviewProps) {
  return (
    <Box
      width={300}
      paddingTop={5}
      paddingBottom={2}
      paddingX={3}
      sx={{ bgcolor: "background.paper" }}
    >
      <Box>
        <Typography fontSize={16} fontWeight={"bold"} align="left">
          {props.name}
        </Typography>
        <Typography fontSize={12} variant="subtitle2" align="left">
          {props.level}
        </Typography>
        <Box marginY={1}>
          <Website url={props.website} />
          <Email email={props.email} />
        </Box>
        <Address address={props.address} />
        <Phone phone={props.phone} />
      </Box>
    </Box>
  );
}
