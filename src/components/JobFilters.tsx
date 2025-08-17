"use client";

import React, { useState } from "react";

interface JobFiltersProps {
  jobTypes: string[];
  experiences: string[];
  salaries: string[];
  onFilterChange: (filters: {
    jobType: string[];
    experience: string[];
    salary: string[];
  }) => void;
}

export default function JobFilters({
  jobTypes,
  experiences,
  salaries,
  onFilterChange,
}: JobFiltersProps) {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedSalaries, setSelectedSalaries] = useState<string[]>([]);

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const updated = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    setSelected(updated);
    onFilterChange({
      jobType: value.includes("Time") ? updated : selectedJobTypes,
      experience: experiences.includes(value) ? updated : selectedExperiences,
      salary: salaries.includes(value) ? updated : selectedSalaries,
    });
  };

  return (
    <div className="w-64 bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Job Type */}
      <div className="mb-4">
        <h4 className="font-medium">Job Type</h4>
        {jobTypes.map((type) => (
          <label key={type} className="block">
            <input
              type="checkbox"
              checked={selectedJobTypes.includes(type)}
              onChange={() =>
                handleCheckboxChange(
                  type,
                  selectedJobTypes,
                  setSelectedJobTypes
                )
              }
            />
            <span className="ml-2">{type}</span>
          </label>
        ))}
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h4 className="font-medium">Experience</h4>
        {experiences.map((exp) => (
          <label key={exp} className="block">
            <input
              type="checkbox"
              checked={selectedExperiences.includes(exp)}
              onChange={() =>
                handleCheckboxChange(
                  exp,
                  selectedExperiences,
                  setSelectedExperiences
                )
              }
            />
            <span className="ml-2">{exp}</span>
          </label>
        ))}
      </div>

      {/* Salary */}
      <div>
        <h4 className="font-medium">Salary</h4>
        {salaries.map((salary) => (
          <label key={salary} className="block">
            <input
              type="checkbox"
              checked={selectedSalaries.includes(salary)}
              onChange={() =>
                handleCheckboxChange(
                  salary,
                  selectedSalaries,
                  setSelectedSalaries
                )
              }
            />
            <span className="ml-2">{salary}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
