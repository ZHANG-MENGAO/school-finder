import L, { Map } from "leaflet";
import { useEffect } from "react";

interface LegendProps {
  map: Map | null;
}

export default function Legend(props: LegendProps) {
  const { map } = props;

  useEffect(() => {
    if (map) {
      const legend = new L.Control({ position: "bottomright" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "school-legend");
        div.innerHTML = `
          <b>LEGEND</b>
          <span class="primary"></span>
          Primary School
          <span class="secondary"></span>
          Secondary School
          <span class="junior-college"></span>
          Junior College
          <span class="ite poly"></span>
          ITE & Polytechnics
          <span class="mixed"></span>
          Mixed Levels
          `;
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);

  return null;
}
