export interface Job {
  _id: string;
  slug: string;
  title: string;
  company: string;
  location?: string;
  jobType: string;
  companyLogo?: string; 
  salary?: string;
  experience?: string;
  postedAt?: string;
}
