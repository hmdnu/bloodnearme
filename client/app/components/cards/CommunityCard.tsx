export default function CommunityCard() {
  return (
    <div className="bg-slate-200 p-5 rounded-md">
      <div className="w-[400px]">
        <div className="flex items-center gap-2">
          <img src="/hospital.jpg" alt="profile" className="w-[50px] h-[50px] rounded-full" />
          <div>
            <h1 className="font-semibold">username</h1>
            <h2 className="text-sm text-neutral-400">1 jam yang lalu</h2>
          </div>
        </div>

        <div className="mt-5">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, voluptatibus iure iusto, illo possimus
            aliquid, consectetur incidunt numquam ad hic ut nulla architecto perferendis eum dolores iste dolor rerum
            facere.
          </p>

          <div className="mt-5">
            <img src="/hospital.jpg" alt="post" className="rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
