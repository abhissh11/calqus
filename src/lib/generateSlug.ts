export function generateJobSlug(company: string, title: string, jobType: string, uniqueId: string) {
    const safeCompany = company.replace(/\s+/g, "-");
    const safeTitle = title.replace(/\s+/g, "-");
    const safeType = jobType.replace(/\s+/g, "-");
    return `${safeCompany}-is-hiring-for-${safeTitle}-${safeType}-${uniqueId}`;
}
