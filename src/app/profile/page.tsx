import { decrypt, addition } from "@/utils/algorithm/paillier";
import { createClient } from "@/utils/supabase/server";
import { formatToRupiah } from "@/utils/format";
import { redirect } from "next/navigation";

export default async function Profile() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("donor_id", user?.id ?? "");

  const publicKey = {
    n: BigInt(process.env.NEXT_PUBLIC_KEY_N ?? "0"),
    g: BigInt(process.env.NEXT_PUBLIC_KEY_G ?? "0"),
  };

  const privateKey = {
    lambda: BigInt(process.env.NEXT_PRIVATE_KEY_LAMBDA ?? "0"),
    mu: BigInt(process.env.NEXT_PRIVATE_KEY_MU ?? "0"),
  };

  let decTotalDonation = BigInt(0);
  let totalDonation = BigInt(donations?.[0]?.encrypted_amount ?? 0);
  if (donations) {
    for (let i = 1; i < donations.length; i++) {
      totalDonation = addition(
        publicKey,
        totalDonation,
        BigInt(donations[i]?.encrypted_amount ?? 0)
      );
    }
    decTotalDonation = decrypt(publicKey, privateKey, totalDonation);
  }

  return (
    <section className="flex w-full items-center">
      <div className="w-full px-8 py-4 max-w-6xl flex flex-col mx-auto gap-4">
        <div>
          <span className="font-bold">{user?.email}</span>, terima kasih orang
          baik!
        </div>
        <div>
          <h1 className="text-lg font-bold">Total donasi Saudara:</h1>
          <p className="text-indigo-500 font-bold text-2xl">
            {formatToRupiah(Number(decTotalDonation))}
          </p>
        </div>
      </div>
    </section>
  );
}
