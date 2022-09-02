import React from "react";
import { Box, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import { Course } from "../../models/Course";
import { List, ListRowProps } from "react-virtualized";
import CourseItem from "../Courses/CourseItemView";

interface CourseProps {
  courses: Course[];
}

export default function CourseAdmission(props: CourseProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    const item = props.courses[index];
    return (
      <Box key={key} style={style} padding={1}>
        <CourseItem course={item} />
      </Box>
    );
  };

  return (
    <Box>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Subjects Offered" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          width={380}
          height={500}
          rowHeight={110}
          rowCount={props.courses.length}
          rowRenderer={rowRenderer}
          style={{ outline: "none" }}
        />
      </Collapse>
    </Box>
  );
}
