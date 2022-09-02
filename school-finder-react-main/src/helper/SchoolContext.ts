import { LatLngTuple } from "leaflet";
import { createContext } from "react";

interface SchoolContextProp {
  flyToSchool: (school: LatLngTuple) => void;
}

const SchoolContext = createContext<SchoolContextProp>({
  flyToSchool: (school: LatLngTuple) => {
    // to pass in MapView
  },
});

export { SchoolContext };
