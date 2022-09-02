import React from "react";
// import { Link, Tooltip, IconButton, Button } from "@mui/material";
import { Link, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";

type WebsiteProp = {
  url: string;
};

export default function Website(props: WebsiteProp) {
  return (
    <Link href={props.url} target="_blank">
      {/* <Tooltip title="Website" arrow>
        <IconButton title="Website" size="small">
          <LanguageIcon />
        </IconButton>
      </Tooltip> */}
      <Button
        variant="contained"
        startIcon={<LanguageIcon />}
        size="small"
        style={{ maxHeight: "26px" }}
      >
        Website
      </Button>
    </Link>
  );
}
