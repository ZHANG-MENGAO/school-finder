import React, { useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { LatLngTuple, DivIcon } from "leaflet";
import { Marker, Tooltip } from "react-leaflet";

type SchoolMarkerProp = {
  id: number;
  name: string;
  level: string;
  latlong: LatLngTuple;
  showSchoolDetail(id: number): void;
};

export default function SchoolMarker(props: SchoolMarkerProp) {
  const eventHandlers = useMemo(
    () => ({
      click() {
        props.showSchoolDetail(props.id);
      },
    }),
    []
  );

  const IconHTML = ReactDOMServer.renderToString(
    <FontAwesomeIcon icon={faMapMarker} size="2x" />
  );

  const getClassName = () => {
    if (props.level == "Junior College") return "junior-college";

    if (props.level == "Polytechnic") return "poly";

    if (props.level == "Mixed Levels") return "mixed";

    return props.level.toLowerCase();
  };

  const CustomMarkerIcon = new DivIcon({
    html: IconHTML,
    className: `school-marker ${getClassName()}`,
  });

  return (
    <Marker
      icon={CustomMarkerIcon}
      position={props.latlong}
      eventHandlers={eventHandlers}
    >
      <Tooltip sticky direction="auto">
        {props.name}
      </Tooltip>
    </Marker>
  );
}
