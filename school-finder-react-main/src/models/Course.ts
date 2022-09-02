import { Cutoff } from "./Cutoff";

export interface Course {
  code: string;
  name: string;
  website_url: string;
  cutoff: Cutoff;
}
