// function ListSchools(filter = "") {
//   if (filter != "")
//     return fetch("http://127.0.0.1:8000/schoolFilter/?search=" + filter);
//   else return fetch("http://127.0.0.1:8000/schoolList/");
// }

import { School } from "../models/School";

// function FilterSchools(name: string, level: string) {
//   return fetch(
//     `http://127.0.0.1:8000/schoolFilter/?name__icontains=${name}&level__icontains=${level}`
//   );
// }

function ListSchools(filter = "") {
  if (filter != "")
    return fetch("http://127.0.0.1:8000/schoolFilter/?search=" + filter);
  else return fetch("http://127.0.0.1:8000/schoolList/");
}

function GetSchool(id: number) {
  return fetch("http://127.0.0.1:8000/schoolDetail/" + id + "/");
}

function GetDistancePostal(postalCode: string) {
  if (postalCode != "")
    return fetch("http://127.0.0.1:8000/init/Singapore " + postalCode + "/");
  else return ListSchools();
}

function FilterSchools(postalCode: string, name: string, level: string) {
  return GetDistancePostal(postalCode)
    .then((response) => response.json())
    .then((results) =>
      results
        .filter((school: School) =>
          school.name.toLowerCase().includes(name.toLowerCase())
        )
        .filter((school: School) => school.level.includes(level))
    );
}

function GetDistance(lat: number, long: number) {
  return fetch("http://127.0.0.1:8000/init/" + lat + "," + long + "/");
}

function Start() {
  return fetch("http://127.0.0.1:8000/reset/");
}

export {
  Start,
  FilterSchools,
  ListSchools,
  GetSchool,
  GetDistance,
  GetDistancePostal,
};
