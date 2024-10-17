import { useStoreChatbox } from "~/hooks/zustand";

export default function ContactBox() {
  const { isOpenChatbox, setOpenChatbox, userId } = useStoreChatbox();

  return (
    <div
      className={`fixed ${
        isOpenChatbox ? "bottom-0" : "-bottom-[500px]"
      }  sm:right-10 right-5 bg-slate-200 rounded-t-md sm:h-[400px] h-[300px] sm:w-[250px] w-[200px] transition-all duration-500`}
    >
      <button
        onClick={() => setOpenChatbox()}
        className="bg-red-900 py-1 px-5 rounded-t-md text-white heading-4 text-center  w-full"
      >
        chat box
      </button>

      <div>{userId}</div>
    </div>
  );
}
