export type TPatient = {
  id: string;
  email: string;
  role: string;
  name: string;
  username: string;
  password: string;
  phone: string;
};

export type TBlood = {
  bloodType: string;
  stock: number;
};

export type THospital = {
  id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  bloodStock: TBlood[];
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

export type TEventPost = {
  id: string;
  creatorId: string;
  content: string;
  timeAndDatePost: Date;
  organizerName: string;
  regency: string;
  province: string;
};
