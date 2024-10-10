import { HOSPITAL_DATA, ORGANIZER_DATA, PATIENT_DATA } from "~/constant";

export function authPatient({ email, password }: { email: string; password: string }) {
  const patient = PATIENT_DATA.find((data) => data.email === email && data.password === password);

  return patient !== undefined;
}

export function authHospital({ email, password }: { email: string; password: string }) {
  const hospital = HOSPITAL_DATA.find((data) => data.email === email && data.password === password);

  return hospital !== undefined;
}

export function authOrganizer({ email, password }: { email: string; password: string }) {
  const organizer = ORGANIZER_DATA.find((data) => data.email === email && data.password === password);

  return organizer !== undefined;
}
