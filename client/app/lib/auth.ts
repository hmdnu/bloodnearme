import { HOSPITAL_DATA, ORGANIZER_DATA, PATIENT_DATA } from "~/constant";

export function authPatient({ email, password }: { email: string; password: string }) {
  const patient = PATIENT_DATA.find((data) => data.email === email && data.password === password);

  return { ok: patient !== undefined, cookie: { id: patient?.id, role: patient?.role } };
}

export function authHospital({ email, password }: { email: string; password: string }) {
  const hospital = HOSPITAL_DATA.find((data) => data.email === email && data.password === password);

  return { ok: hospital !== undefined, cookie: { id: hospital?.id, role: hospital?.role } };
}

export function authOrganizer({ email, password }: { email: string; password: string }) {
  const organizer = ORGANIZER_DATA.find((data) => data.email === email && data.password === password);

  return { ok: organizer !== undefined, cookie: { id: organizer?.id, role: organizer?.role } };
}
