import { Cutoff } from "./Cutoff";
import { Course } from "./Course";

export interface School {
  id: number;
  name: string;
  level: string;
  address: string;
  postal_code: number | string;
  latitude: number;
  longitude: number;
  website_url: string;
  email_address: string;
  telephone_no: string;
  ccas: string[];
  subjects: string[] | null;
  cutoff: Cutoff[] | null;
  courses: Course[] | null;

  distance: number;
  eta: number;
}
