// Mock data for the MVP. Replace with Lovable Cloud (Supabase) queries in phase 2.

export type DeptCode =
  | "water" | "roads" | "drainage" | "lights" | "waste"
  | "health" | "agri" | "transport" | "other";

export const departments: { code: DeptCode; labelKey: string; icon: string; tone: string }[] = [
  { code: "water", labelKey: "dept_water", icon: "💧", tone: "info" },
  { code: "roads", labelKey: "dept_roads", icon: "🛣️", tone: "muted" },
  { code: "drainage", labelKey: "dept_drainage", icon: "🌊", tone: "info" },
  { code: "lights", labelKey: "dept_lights", icon: "💡", tone: "warning" },
  { code: "waste", labelKey: "dept_waste", icon: "🗑️", tone: "success" },
  { code: "health", labelKey: "dept_health", icon: "🏥", tone: "destructive" },
  { code: "agri", labelKey: "dept_agri", icon: "🌾", tone: "success" },
  { code: "transport", labelKey: "dept_transport", icon: "🚌", tone: "secondary" },
  { code: "other", labelKey: "dept_other", icon: "📝", tone: "muted" },
];

export type ComplaintStatus = "pending" | "in_progress" | "resolved" | "escalated";
export type ComplaintLevel = "ward" | "panchayat" | "block" | "district" | "state";

export interface Complaint {
  id: string;
  code: string;
  department: DeptCode;
  type: "new" | "repair";
  title: string;
  description: string;
  village: string;
  ward: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: ComplaintStatus;
  level: ComplaintLevel;
  createdAt: string;
  photo?: string;
  citizenCode: string;
  timeline: { at: string; level: ComplaintLevel; action: string; note?: string }[];
}

export const mockComplaints: Complaint[] = [
  {
    id: "c1", code: "GRP-2026-00142", department: "water", type: "repair",
    title: "Hand pump not working", description: "Hand pump near temple has been dry for 4 days.",
    village: "Melur", ward: "Ward 3", priority: "high", status: "in_progress", level: "panchayat",
    createdAt: "2026-06-09T09:14:00Z", citizenCode: "CIT-9X42K",
    timeline: [
      { at: "2026-06-09T09:14:00Z", level: "ward", action: "filed" },
      { at: "2026-06-10T11:00:00Z", level: "panchayat", action: "escalated", note: "Ward SLA breach" },
    ],
  },
  {
    id: "c2", code: "GRP-2026-00138", department: "roads", type: "new",
    title: "Approach road to school missing", description: "Children walk through fields in monsoon.",
    village: "Vadakkur", ward: "Ward 1", priority: "urgent", status: "escalated", level: "block",
    createdAt: "2026-06-02T07:21:00Z", citizenCode: "CIT-2A88M",
    timeline: [
      { at: "2026-06-02T07:21:00Z", level: "ward", action: "filed" },
      { at: "2026-06-04T07:21:00Z", level: "panchayat", action: "escalated" },
      { at: "2026-06-08T07:21:00Z", level: "block", action: "escalated", note: "Panchayat SLA breach" },
    ],
  },
  {
    id: "c3", code: "GRP-2026-00127", department: "lights", type: "repair",
    title: "Street light out on main road", description: "Section between bus stop and market dark at night.",
    village: "Melur", ward: "Ward 2", priority: "medium", status: "resolved", level: "ward",
    createdAt: "2026-05-26T18:02:00Z", citizenCode: "CIT-9X42K",
    timeline: [
      { at: "2026-05-26T18:02:00Z", level: "ward", action: "filed" },
      { at: "2026-05-28T10:00:00Z", level: "ward", action: "resolved", note: "Bulb replaced" },
    ],
  },
];

export interface Scheme {
  id: string;
  level: "state" | "central";
  nameTa: string; nameEn: string;
  eligibilityTa: string; eligibilityEn: string;
  benefitsTa: string; benefitsEn: string;
  docs: { ta: string; en: string }[];
  steps: { ta: string; en: string }[];
}

export const mockSchemes: Scheme[] = [
  {
    id: "s1", level: "state",
    nameTa: "முதலமைச்சர் காப்பீட்டுத் திட்டம்", nameEn: "CM Comprehensive Health Insurance",
    eligibilityTa: "ரூ. 1.2 லட்சத்திற்குக் கீழ் ஆண்டு வருமானம் கொண்ட குடும்பங்கள்",
    eligibilityEn: "Families with annual income below ₹1.2 lakh",
    benefitsTa: "ஆண்டிற்கு ரூ. 5 லட்சம் வரை மருத்துவ உதவி",
    benefitsEn: "Medical cover up to ₹5 lakh per year",
    docs: [
      { ta: "குடும்ப அட்டை", en: "Ration card" },
      { ta: "ஆதார் அட்டை", en: "Aadhaar card" },
      { ta: "வருமான சான்றிதழ்", en: "Income certificate" },
    ],
    steps: [
      { ta: "அருகிலுள்ள ஊராட்சி அலுவலகத்தைச் சந்திக்கவும்", en: "Visit nearest panchayat office" },
      { ta: "விண்ணப்பப் படிவத்தைப் பெற்று நிரப்பவும்", en: "Collect and fill the application form" },
      { ta: "ஆவணங்களுடன் சமர்ப்பிக்கவும்", en: "Submit with documents" },
      { ta: "14 நாட்களுக்குள் அட்டை வழங்கப்படும்", en: "Card issued within 14 days" },
    ],
  },
  {
    id: "s2", level: "central",
    nameTa: "PM கிசான் சம்மான் நிதி", nameEn: "PM Kisan Samman Nidhi",
    eligibilityTa: "சிறு மற்றும் குறு விவசாயிகள்", eligibilityEn: "Small and marginal farmers",
    benefitsTa: "ஆண்டிற்கு ரூ. 6,000 நேரடி பண பரிமாற்றம்",
    benefitsEn: "₹6,000 per year direct transfer",
    docs: [
      { ta: "நில உரிமை ஆவணம்", en: "Land ownership document" },
      { ta: "ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு", en: "Aadhaar-linked bank account" },
    ],
    steps: [
      { ta: "pmkisan.gov.in-ல் பதிவு செய்யவும்", en: "Register at pmkisan.gov.in" },
      { ta: "VAO-வை சந்தித்து சரிபார்ப்பு பெறவும்", en: "Get verification from VAO" },
      { ta: "தவணைகள் நேரடியாக வங்கிக்கு வரும்", en: "Installments credited directly" },
    ],
  },
];

export interface VillageScore {
  village: string;
  panchayat: string;
  district: string;
  water: number; roads: number; health: number; governance: number;
  vai: number;
  complaints: { open: number; resolved: number };
}

export const mockVillages: VillageScore[] = [
  { village: "Melur", panchayat: "Melur Panchayat", district: "Madurai",
    water: 78, roads: 64, health: 71, governance: 82, vai: 74,
    complaints: { open: 12, resolved: 58 } },
  { village: "Vadakkur", panchayat: "Vadakkur Panchayat", district: "Thanjavur",
    water: 55, roads: 41, health: 60, governance: 58, vai: 53,
    complaints: { open: 24, resolved: 31 } },
  { village: "Sengottai", panchayat: "Sengottai Panchayat", district: "Tenkasi",
    water: 88, roads: 79, health: 82, governance: 90, vai: 85,
    complaints: { open: 6, resolved: 102 } },
];

export interface OfficialProfile {
  id: string;
  name: string;
  designation: string;
  panchayat: string;
  ward: string;
  trustScore: number;
  resolved: number;
  escalations: number;
}

export const mockOfficials: OfficialProfile[] = [
  { id: "o1", name: "R. Selvi", designation: "Ward Councillor", panchayat: "Melur Panchayat", ward: "Ward 3", trustScore: 82, resolved: 47, escalations: 3 },
  { id: "o2", name: "K. Murugan", designation: "Panchayat President", panchayat: "Melur Panchayat", ward: "—", trustScore: 76, resolved: 134, escalations: 11 },
  { id: "o3", name: "S. Anbarasi", designation: "Block Officer", panchayat: "Melur Block", ward: "—", trustScore: 88, resolved: 312, escalations: 8 },
];

export interface OfficialProject {
  id: string;
  title: string;
  department: DeptCode;
  village: string;
  description: string;
  beforePhoto: string;
  afterPhoto: string;
  completedAt: string;
  impact: string;
}

export const mockProjects: OfficialProject[] = [
  {
    id: "p1", title: "RO drinking water unit installed", department: "water",
    village: "Melur", description: "Set up a 500 LPH RO unit serving Ward 3.",
    beforePhoto: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800",
    afterPhoto: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=800",
    completedAt: "2026-05-18", impact: "Serving ~420 households daily",
  },
  {
    id: "p2", title: "Concrete road relaid", department: "roads",
    village: "Melur", description: "350m stretch from school to health sub-centre.",
    beforePhoto: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
    afterPhoto: "https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=800",
    completedAt: "2026-04-02", impact: "Cuts school travel time by 12 minutes",
  },
];
