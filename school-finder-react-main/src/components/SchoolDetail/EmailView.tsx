import React from "react";
// import { Link, Tooltip, IconButton, Button } from "@mui/material";
import { Link, Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

type EmailProp = {
  email: string;
};

export default function Email(props: EmailProp) {
  return (
    <Link marginLeft={1} href={"mailto:" + props.email} target="_blank">
      {/* <Tooltip title="Email" arrow>
        <IconButton size="small">
          <EmailIcon />
        </IconButton>
      </Tooltip> */}
      <Button
        variant="contained"
        startIcon={<EmailIcon />}
        size="small"
        style={{ maxHeight: "26px" }}
      >
        Email
      </Button>
    </Link>
  );
}
