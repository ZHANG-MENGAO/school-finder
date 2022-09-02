import React, { useEffect, useState } from "react";
import SchoolOverview from "./SchoolDetail/SchoolOverview";
import Box from "@mui/material/Box";
import { School } from "../models/School";
import { SchoolContext } from "../helper/SchoolContext";
import CCA from "./SchoolDetail/CCAView";
import Subject from "./SchoolDetail/SubjectView";
import { Divider } from "@mui/material";
import { GetSchool } from "../services/SchoolAPI";
import Admission from "./SchoolDetail/AdmissionView";
import CourseAdmission from "./SchoolDetail/CourseView";

type SchoolDetailProps = {
  id: number;
};

export default function SchoolDetailView(props: SchoolDetailProps) {
  const [school, setSchool] = useState<School | null>(null);

  useEffect(() => {
    GetSchool(props.id)
      .then((response) => response.json())
      .then((data) => setSchool(data));
  }, []);

  const DisplaySubjects = () => {
    if (school?.subjects) {
      return <Subject subjects={school.subjects} />;
    }

    return null;
  };

  const DisplayCCAs = () => {
    if (school?.ccas && school.ccas.length > 0) {
      return <CCA ccas={school?.ccas} />;
    }

    return null;
  };

  const DisplayEntryRequirements = () => {
    if (school?.cutoff) {
      return <Admission requirements={school?.cutoff} />;
    }

    return null;
  };

  const DisplayCourses = () => {
    if (school?.courses) {
      return <CourseAdmission courses={school?.courses} />;
    }

    return null;
  };

  if (school != null && props.id != -1) {
    return (
      <Box height="100vh" overflow="auto" width={400}>
        <SchoolContext.Consumer>
          {({ flyToSchool }) => {
            flyToSchool([Number(school.latitude), Number(school.longitude)]);
            return null;
          }}
        </SchoolContext.Consumer>
        <SchoolOverview
          name={school.name}
          address={school.address}
          level={school.level}
          phone={school.telephone_no}
          email={school.email_address}
          website={school.website_url}
        />
        <Divider></Divider>
        {DisplayEntryRequirements()}
        {DisplayCourses()}
        {DisplaySubjects()}
        {DisplayCCAs()}
      </Box>
    );
  } else {
    return null;
  }
}
