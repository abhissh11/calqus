import { z } from "zod";

export const JobCreateSchema = z.object({
    companyLogo: z.string().url().optional().default("https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    title: z.string().min(2),
    company: z.string().min(2),
    location: z.string().optional().default(""),
    postedBy: z.string().min(2),
    jobType: z.enum(["Full Time", "Part Time", "Internship", "Contract"]),
    salary: z.string().min(1),
    experience: z.string().min(1),
});

export type JobCreateInput = z.infer<typeof JobCreateSchema>;
