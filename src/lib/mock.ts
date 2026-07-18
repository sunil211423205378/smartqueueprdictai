export type Queue = {
  id: string;
  org: string;
  service: string;
  yourToken: string;
  currentToken: string;
  wait: number; // minutes
  confidence: number;
  progress: number;
  updated: string;
};

export const MOCK_QUEUES: Queue[] = [
  { id: "q1", org: "Mercy Hospital", service: "Outpatient · Cardiology", yourToken: "A-087", currentToken: "A-072", wait: 14, confidence: 96, progress: 68, updated: "just now" },
  { id: "q2", org: "Metro Bank", service: "New Account Opening", yourToken: "B-045", currentToken: "B-039", wait: 9, confidence: 92, progress: 82, updated: "1m ago" },
  { id: "q3", org: "City Hall", service: "Driver's License Renewal", yourToken: "C-121", currentToken: "C-101", wait: 32, confidence: 88, progress: 40, updated: "2m ago" },
  { id: "q4", org: "Cafe Nord", service: "Table for 2", yourToken: "T-14", currentToken: "T-09", wait: 18, confidence: 90, progress: 55, updated: "just now" },
];

export const NOTIFICATIONS = [
  { id: "n1", title: "Your turn is near", body: "Mercy Hospital ” A-085 now serving. Arrive in ~6 min.", type: "upcoming", time: "1m ago" },
  { id: "n2", title: "Queue delayed", body: "City Hall ” average service time increased by 4 min.", type: "delay", time: "12m ago" },
  { id: "n3", title: "Token accepted", body: "Your token B-045 was accepted by Priya.", type: "accepted", time: "34m ago" },
  { id: "n4", title: "Queue completed", body: "Cafe Nord â€” hope you enjoyed your meal!", type: "done", time: "2h ago" },
];

export const ORGS = [
  { name: "Mercy Hospital", cat: "Hospital", wait: 14, distance: "0.8 km" },
  { name: "Metro Bank â€” Branch 4", cat: "Bank", wait: 9, distance: "1.2 km" },
  { name: "City Hall", cat: "Government", wait: 32, distance: "2.4 km" },
  { name: "Cafe Nord", cat: "Restaurant", wait: 18, distance: "0.4 km" },
  { name: "Bright Clinic", cat: "Clinic", wait: 6, distance: "3.1 km" },
  { name: "UniServe Center", cat: "University", wait: 22, distance: "5.6 km" },
];

