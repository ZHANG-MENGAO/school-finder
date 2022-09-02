import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import BookmarkOnIcon from "@mui/icons-material/TurnedIn";
import BookmarkOffIcon from "@mui/icons-material/TurnedInNot";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import SchoolIcon from "@mui/icons-material/School";
import RoomIcon from "@mui/icons-material/Room";
import { School } from "../../models/School";
import {
  getBookmarkStatus,
  setBookmarkStatus,
} from "../../services/BookmarkManager";

type SchoolItemProp = {
  school: School;
  bookmarkFilterActive: boolean;
  showSchoolDetails(schoolId: number): void;
};

export default function SchoolItem(props: SchoolItemProp) {
  const { bookmarkFilterActive, school } = props;

  const [state, setState] = useState<{ bookmarked: boolean }>({
    bookmarked: getBookmarkStatus(school.id),
  });

  useEffect(() => {
    setState({ bookmarked: getBookmarkStatus(school.id) });
  }, []);

  let level = school.level;

  if (school.level == "Primary") {
    level = "Primary School";
  } else if (school.level == "Secondary") {
    level = "Secondary School";
  }

  const showTravelInfo = () => {
    if (school.distance >= 0 && school.eta >= 0) {
      let eta = school.eta;
      let hours = 0;

      while (eta > 60) {
        eta -= 60;
        hours++;
      }

      let etaText = "";

      if (hours > 0) etaText = `${hours} hour`;
      etaText += ` ${eta.toFixed(0)} minutes`;

      return (
        <Box display="flex" flexDirection="row" justifyContent="flex-start">
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <RoomIcon fontSize="small" color="info" />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontSize={12}
              paddingLeft={1}
            >
              {(school.distance / 1000.0).toFixed(2)} km
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexWrap="wrap"
            marginLeft={1}
          >
            <DirectionsBusIcon fontSize="small" color="info" />
            <Typography
              variant="subtitle2"
              color="text.secondary"
              fontSize={12}
              paddingLeft={1}
            >
              {etaText}
            </Typography>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Card sx={{ marginX: 1, height: "110px" }} variant="outlined">
      <CardActionArea
        sx={{ display: "flex", height: "100%" }}
        onClick={() => {
          props.showSchoolDetails(school.id);
        }}
      >
        <Box width="80%">
          <CardContent>
            <Typography component="div" variant="subtitle1" fontSize={14}>
              {school.name}
            </Typography>
            <Box display="flex" alignItems="center" flexWrap="wrap">
              <SchoolIcon fontSize="small" color="info" />
              <Typography
                variant="subtitle2"
                color="text.secondary"
                fontSize={12}
                paddingLeft={1}
              >
                {level}
              </Typography>
            </Box>
            {showTravelInfo()}
          </CardContent>
        </Box>
        <Box>
          <IconButton
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              console.log("Button clicked");
              setBookmarkStatus(school.id);
              setState({ bookmarked: !state.bookmarked });
            }}
          >
            {state.bookmarked || bookmarkFilterActive ? (
              <BookmarkOnIcon fontSize="medium" />
            ) : (
              <BookmarkOffIcon fontSize="medium" />
            )}
          </IconButton>
        </Box>
      </CardActionArea>
    </Card>
  );
}
