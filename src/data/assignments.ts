import assignmentsJson from "./assignments.json";

export type Assignment = {
  id: string;
  name: string;
  delegation: string;
  committee: string;
  committeeSlug: string;
  committeeAbbr: string;
  position: string;
  type: string;
};

export const assignments = assignmentsJson as Assignment[];

export const assignmentCommittees: { value: string; label: string; slugs?: string[] }[] = [
  { value: "all", label: "All Committees" },
  { value: "ga", label: "General Assembly", slugs: ["disec"] },
  { value: "sc", label: "Security Council", slugs: [] },
  { value: "ecosoc", label: "ECOSOC", slugs: ["ecosoc"] },
  { value: "specialized", label: "Specialized Agencies", slugs: ["hrc", "unep"] },
  { value: "regional", label: "Regional / Specialized Bodies", slugs: ["lp1", "lp2", "lp3"] },
  { value: "press", label: "Press Corps", slugs: ["ipc"] },
];
