import { create } from "zustand";

type OpenChatbox = {
  userId: string;
  isOpenChatbox: boolean;
  setOpenChatbox: (e?: boolean) => void;
  setUserId: (userId: string) => void;
};

export const useStoreChatbox = create<OpenChatbox>((set) => ({
  userId: "",
  role: "",
  isOpenChatbox: false,
  setOpenChatbox: () => set((e) => ({ isOpenChatbox: !e.isOpenChatbox })),
  setUserId: () => set((e) => ({ userId: e.userId })),
}));
