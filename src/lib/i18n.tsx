import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ta" | "en";

type Dict = Record<string, { ta: string; en: string }>;

export const dict = {
  app_name: { ta: "கிராம அறிவு ERP", en: "Grama Arivu ERP" },
  app_tagline: {
    ta: "தமிழ்நாட்டுக்கான கிராம ஆட்சி மற்றும் ஊராட்சி நுண்ணறிவு தளம்",
    en: "Rural Governance & Panchayat Intelligence Platform for Tamil Nadu",
  },
  choose_role: { ta: "உங்கள் பங்கைத் தேர்வு செய்க", en: "Choose your role" },
  citizen: { ta: "குடிமகன்", en: "Citizen" },
  citizen_desc: { ta: "புகார் பதிவு மற்றும் திட்டங்களைப் பயன்படுத்துங்கள்", en: "File complaints, access schemes" },
  official: { ta: "அரசு அதிகாரி", en: "Government Official" },
  official_desc: { ta: "புகார்களைக் கையாளவும், திட்டங்களைப் புதுப்பிக்கவும்", en: "Handle complaints, update projects" },
  volunteer: { ta: "தன்னார்வலர் / NGO", en: "Volunteer / NGO" },
  volunteer_desc: { ta: "குடிமக்களுக்கு உதவவும், பணிகளை சரிபார்க்கவும்", en: "Assist citizens, verify works" },
  continue: { ta: "தொடரவும்", en: "Continue" },
  login: { ta: "உள்நுழைய", en: "Login" },
  phone_number: { ta: "கைபேசி எண்", en: "Phone number" },
  send_otp: { ta: "OTP அனுப்பவும்", en: "Send OTP" },
  enter_otp: { ta: "OTP-ஐ உள்ளிடவும்", en: "Enter OTP" },
  verify: { ta: "சரிபார்க்கவும்", en: "Verify" },
  language: { ta: "மொழி", en: "Language" },
  back: { ta: "பின்னால்", en: "Back" },
  dashboard: { ta: "முகப்பு", en: "Dashboard" },
  // departments
  dept_water: { ta: "தண்ணீர்", en: "Water" },
  dept_roads: { ta: "சாலைகள்", en: "Roads" },
  dept_drainage: { ta: "வடிகால்", en: "Drainage" },
  dept_lights: { ta: "தெரு விளக்குகள்", en: "Street Lights" },
  dept_waste: { ta: "கழிவு மேலாண்மை", en: "Waste Mgmt" },
  dept_health: { ta: "சுகாதாரம்", en: "Health" },
  dept_agri: { ta: "வேளாண்மை", en: "Agriculture" },
  dept_transport: { ta: "போக்குவரத்து", en: "Transport" },
  dept_other: { ta: "மற்ற புகார்கள்", en: "Other" },
  // tiles
  my_complaints: { ta: "என் புகார்கள்", en: "My Complaints" },
  learning_centre: { ta: "கற்றல் மையம்", en: "Learning Centre" },
  search_tn: { ta: "தமிழ்நாடு தேடல்", en: "Search Tamil Nadu" },
  settings: { ta: "அமைப்புகள்", en: "Settings" },
  file_complaint: { ta: "புகார் பதிவு செய்யவும்", en: "File a complaint" },
  new_infra: { ta: "புதிய உள்கட்டமைப்பு", en: "New infrastructure" },
  repair_infra: { ta: "பழுதுபார்ப்பு", en: "Repair existing" },
  photo: { ta: "புகைப்படம்", en: "Photo" },
  description: { ta: "விளக்கம்", en: "Description" },
  location: { ta: "இடம் (GPS)", en: "Location (GPS)" },
  capture_gps: { ta: "GPS பெறவும்", en: "Capture GPS" },
  department: { ta: "துறை", en: "Department" },
  priority: { ta: "முன்னுரிமை", en: "Priority" },
  submit: { ta: "சமர்ப்பிக்கவும்", en: "Submit" },
  low: { ta: "குறைவு", en: "Low" },
  medium: { ta: "நடுத்தர", en: "Medium" },
  high: { ta: "உயர்", en: "High" },
  urgent: { ta: "அவசரம்", en: "Urgent" },
  status: { ta: "நிலை", en: "Status" },
  pending: { ta: "நிலுவையில்", en: "Pending" },
  in_progress: { ta: "செயலில்", en: "In Progress" },
  resolved: { ta: "தீர்க்கப்பட்டது", en: "Resolved" },
  escalated: { ta: "மேலெடுக்கப்பட்டது", en: "Escalated" },
  no_complaints: { ta: "புகார்கள் எதுவும் இல்லை", en: "No complaints yet" },
  schemes_state: { ta: "மாநில அரசு திட்டங்கள்", en: "State Government Schemes" },
  schemes_central: { ta: "மத்திய அரசு திட்டங்கள்", en: "Central Government Schemes" },
  eligibility: { ta: "தகுதி", en: "Eligibility" },
  benefits: { ta: "பலன்கள்", en: "Benefits" },
  required_docs: { ta: "தேவையான ஆவணங்கள்", en: "Required Documents" },
  apply_steps: { ta: "விண்ணப்பிக்கும் படிகள்", en: "Application Steps" },
  apply_myself: { ta: "நானே விண்ணப்பிக்கிறேன்", en: "Apply Myself" },
  request_volunteer: { ta: "தன்னார்வலர் உதவி கேட்கவும்", en: "Request Volunteer" },
  village: { ta: "கிராமம்", en: "Village" },
  ward: { ta: "வார்டு", en: "Ward" },
  panchayat: { ta: "ஊராட்சி", en: "Panchayat" },
  district: { ta: "மாவட்டம்", en: "District" },
  trust_score: { ta: "நம்பிக்கை மதிப்பெண்", en: "Trust Score" },
  village_progress: { ta: "கிராம முன்னேற்றம்", en: "Village Progress" },
  changes_by_me: { ta: "நான் செய்த மாற்றங்கள்", en: "Changes Made By Me" },
  before: { ta: "முன்", en: "Before" },
  after: { ta: "பின்", en: "After" },
  vai: { ta: "கிராம முன்னேற்ற குறியீடு", en: "Village Advancement Index" },
  assigned_to_me: { ta: "என்னிடம் ஒப்படைக்கப்பட்டவை", en: "Assigned to me" },
  citizen_id: { ta: "குடிமகன் ID", en: "Citizen ID" },
  identity_hidden: { ta: "குடிமகனின் அடையாளம் மறைக்கப்பட்டுள்ளது", en: "Citizen identity is hidden" },
  search_placeholder: { ta: "கிராமம், வார்டு, ஊராட்சி, மாவட்டம்...", en: "Village, ward, panchayat, district..." },
  performance: { ta: "செயல்திறன்", en: "Performance" },
  upload_before_after: { ta: "முன் / பின் புகைப்படங்களை பதிவேற்றவும்", en: "Upload before / after photos" },
} satisfies Dict;

type Key = keyof typeof dict;

const I18nCtx = createContext<{ lang: Lang; t: (k: Key) => string; setLang: (l: Lang) => void }>({
  lang: "ta",
  t: (k) => dict[k].ta,
  setLang: () => {},
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ta");
  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("grp_lang") as Lang | null) : null;
    if (saved === "ta" || saved === "en") setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem("grp_lang", l);
  };
  const t = (k: Key) => dict[k][lang];
  return <I18nCtx.Provider value={{ lang, t, setLang }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  return useContext(I18nCtx);
}
