export type TPatient = {
  id: string;
  email: string;
  role: string;
  name: string;
  username: string;
  password: string;
  phone: string;
};

export type TDarah = {
  golDarah: string;
  stok: number;
};

export type THospital = {
  id: string;
  nama: string;
  role: string;
  email: string;
  password: string;
  alamat: string;
  noTelpon: string;
  stokDarah: TDarah[];
};

export type TOrganizer = {
  id: string;
  name: string;
  role: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  postId: string;
};

export type TPost = {
  id: string;
  description: string;
  time: string;
  location: string;
  date: string;
  organizerName: string;
  eventName: string;
};
