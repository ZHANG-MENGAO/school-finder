import React, { useEffect, useState } from "react";
import { LayerGroup } from "react-leaflet";
import SchoolMarker from "./SchoolMarkerView";
import { School } from "../../models/School";

type SchoolMarkerLayerProp = {
  schools: School[];
  showSchoolDetail(schoolId: number): void;
};

export default function SchoolMarkerLayer(props: SchoolMarkerLayerProp) {
  const { schools } = props;
  const [markers, setMarkers] = useState(schools);

  useEffect(() => {
    setMarkers(schools);
  }, [schools]);

  return (
    <LayerGroup>
      {markers.map((school, i) => (
        <SchoolMarker
          key={i}
          latlong={[school.latitude, school.longitude]}
          id={school.id}
          name={school.name}
          level={school.level}
          showSchoolDetail={props.showSchoolDetail}
        />
      ))}
    </LayerGroup>
  );
}
