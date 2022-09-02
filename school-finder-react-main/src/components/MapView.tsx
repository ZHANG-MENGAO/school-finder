import React, { useState, useMemo, useEffect } from "react";
import { Box } from "@mui/system";
import { Drawer } from "@mui/material";
import { LatLngTuple, Map } from "leaflet";
import { ListSchools } from "../services/SchoolAPI";
import { MapContainer, TileLayer } from "react-leaflet";
import { School } from "../models/School";
import { SchoolContext } from "../helper/SchoolContext";
import SchoolDetailView from "./SchoolDetailView";
import SchoolFilterView from "./SchoolFilterView";
import SchoolMarkerLayer from "./Map/SchoolMarkerLayer";

import "../styles/map.css";
import Legend from "./Map/LegendView";

const SingaporeCentreLatLng: LatLngTuple = [1.3521, 103.8198];

export default function MapView() {
  const [map, setMap] = useState<Map | null>(null);
  const [state, setState] = useState<{
    schools: School[];
    selectedSchool: number;
    open: boolean;
  }>({
    schools: [],
    selectedSchool: -1,
    open: false,
  });

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, open: open });
  };

  const setSchools = (schools: School[]) => {
    setState({ ...state, schools: schools });
  };

  const flyToSchool = (school: LatLngTuple) => {
    map?.flyTo(school, 18);
  };

  const showSchoolDetail = (schoolId: number) => {
    setState({ ...state, selectedSchool: schoolId, open: true });
  };

  useEffect(() => {
    ListSchools()
      .then((response) => response.json())
      .then((results) => setState({ ...state, schools: results }));
  }, []);

  const DisplayMap = useMemo(
    () => (
      <MapContainer
        className="school-map"
        center={SingaporeCentreLatLng}
        zoom={12}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        whenCreated={setMap}
        preferCanvas
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Legend map={map} />
        <SchoolMarkerLayer
          schools={state.schools}
          showSchoolDetail={showSchoolDetail}
        />
      </MapContainer>
    ),
    [state.schools]
  );

  return (
    <Box display="flex">
      <SchoolContext.Provider
        value={{
          flyToSchool: flyToSchool,
        }}
      >
        {DisplayMap}
        <SchoolFilterView setSchools={setSchools} />
        <React.Fragment key="right">
          <Drawer
            anchor="right"
            open={state.open}
            variant="temporary"
            onClose={toggleDrawer(false)}
            BackdropProps={{ invisible: true }}
          >
            <SchoolDetailView id={state.selectedSchool} />
          </Drawer>
        </React.Fragment>
      </SchoolContext.Provider>
    </Box>
  );
}
