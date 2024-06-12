import { createClient } from "@/utils/supabase/server";

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <section className="flex w-full items-center">
      <div className="w-full px-8 py-4 max-w-6xl flex flex-col mx-auto gap-4">
        <div>
          <span className="font-bold">{user?.email}</span>, terima kasih orang
          baik!
        </div>
        <div>
          <h1 className="text-lg font-bold">Total donasi Saudara:</h1>
          <p className="text-indigo-500 font-bold text-2xl">Rp100.000</p>
        </div>
      </div>
    </section>
  );
}
