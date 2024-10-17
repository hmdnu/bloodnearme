import { TEventPost } from "~/types";

export default function CommunityCard({ post }: { post: TEventPost }) {
  return (
    <div className="bg-slate-200 p-5 rounded-md md:w-[400px] w-[300px]">
      <div className="flex items-center gap-2">
        <img src="/hospital.jpg" alt="profile" className="w-[50px] h-[50px] rounded-full" />
        <div>
          <h1 className="font-semibold">{post.organizerName}</h1>
          <h2 className="text-sm text-neutral-400">1 jam yang lalu</h2>
        </div>
      </div>

      <div className="mt-5">
        <p>{post.content}</p>

        <div className="mt-5">
          <img src="/hospital.jpg" alt="post" className="rounded-md w-full" />
        </div>
      </div>
    </div>
  );
}
