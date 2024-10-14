import { PATIENT_DATA, HOSPITAL_DATA, ORGANIZER_DATA } from "~/constant";

export function getPatient(userId: string, role: string) {
  return PATIENT_DATA.find((data) => data.role === role && data.id === userId);
}

export function getHospital(userId: string, role: string) {
  return HOSPITAL_DATA.find((data) => data.role === role && data.id === userId);
}

export function getOrganizer(userId: string, role: string) {
  ORGANIZER_DATA.find((data) => data.role === role && data.id === userId);
}
