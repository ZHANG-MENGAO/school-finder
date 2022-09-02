import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import MapView from "./components/MapView";
import { Start } from "./services/SchoolAPI";

function App() {
  useEffect(() => {
    Start().then((response) => response.json());
  }, []);

  return (
    <Box height="100vh" width="100vw">
      <MapView />
    </Box>
  );
}

export default App;
