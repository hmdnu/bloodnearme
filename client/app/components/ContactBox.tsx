import { useState } from "react";
import { useStoreChatbox } from "~/hooks/zustand";

export default function ContactBox() {
  const { isOpenChatbox, setOpenChatbox, userId } = useStoreChatbox();
  const [openDm, setOpenDm] = useState(false);

  return (
    <div
      style={{ boxShadow: "0px,0px,5px,5px,rgb(0,0,0,)" }}
      className={`fixed ${
        isOpenChatbox ? "bottom-0" : "-bottom-[500px]"
      }  right-0 bg-slate-200 rounded-t-md sm:h-[400px] h-[300px] sm:w-[400px] w-[200px] transition-all duration-500`}
    >
      <button
        onClick={() => setOpenChatbox()}
        className="bg-red-900 py-1 px-5 rounded-t-md text-white heading-4 text-center  w-full"
      >
        chat box
      </button>

      {/* chats */}
      {openDm ? (
        <>asd</>
      ) : (
        <div className="w-full h-full py-3">
          {/* users */}
          <div
            aria-hidden="true"
            onClick={() => setOpenDm(true)}
            className="flex gap-3 cursor-pointer hover:bg-white px-5 py-2 transition-all"
          >
            <img src="/hospital.jpg" alt="profile" className="w-[50px] h-[50px] object-cover rounded-full" />
            <div>
              <h1 className="heading-4">Username</h1>
              {/* latest chat */}
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>

          <div
            aria-hidden="true"
            onClick={() => setOpenDm(true)}
            className="flex gap-3 cursor-pointer hover:bg-white px-5 py-2 transition-all"
          >
            <img src="/hospital.jpg" alt="profile" className="w-[50px] h-[50px] object-cover rounded-full" />
            <div>
              <h1 className="heading-4">Username</h1>
              {/* latest chat */}
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
