import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { Course } from "../../models/Course";
import Website from "../SchoolDetail/WebsiteView";

interface CourseItemProps {
  course: Course;
}

export default function CourseItem(props: CourseItemProps) {
  const { course } = props;

  const DisplayCutoff = () => {
    if (course.cutoff) {
      return (
        <Box>
          <Typography fontSize={12}>
            {course.cutoff.name} {course.cutoff.range}
          </Typography>
        </Box>
      );
    }

    null;
  };

  const DisplayWebsite = () => {
    if (course.website_url) {
      return (
        <Box marginY={1}>
          {course.website_url ? <Website url={course.website_url} /> : null}
        </Box>
      );
    }

    null;
  };

  const DisplayAdditionalInfo = () => {
    if (!course.cutoff || !course.website_url) {
      return (
        <Typography variant="subtitle1" fontSize={12} marginTop={2}>
          Please check the school website for more details.
        </Typography>
      );
    }

    null;
  };

  return (
    <Card variant="elevation" sx={{ height: 100, width: 350 }}>
      <CardContent>
        <Typography fontSize={14}>{course.name}</Typography>
        {DisplayCutoff()}
        {DisplayWebsite()}
        {DisplayAdditionalInfo()}
      </CardContent>
    </Card>
  );
}
