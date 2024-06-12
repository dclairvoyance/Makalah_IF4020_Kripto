import MoneyInput from "@/components/MoneyInput";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { addition, encrypt, decrypt } from "@/utils/algorithm/paillier";
import { formatToRupiah, formatTime } from "@/utils/format";
import Donate from "@/components/Donate";

export default async function Donation({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { error: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: campaign } = await supabase
    .from("campaigns")
    .select("*")
    .eq("campaign_id", params.id)
    .single();

  const { data: donations } = await supabase
    .from("donations")
    .select("*")
    .eq("campaign_id", params.id)
    .order("created_at", { ascending: false });

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
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative w-full md:w-[60%] h-80">
            <Image
              fill
              src={campaign?.thumbnail ?? ""}
              alt="Thumbnail"
              className="object-cover rounded-md"
            />
          </div>
          <div className="w-full md:w-[40%] flex flex-col my-auto gap-2">
            <div>
              <h1 className="font-bold text-2xl">{campaign?.title}</h1>
              <p className="text-gray-500 text-sm">{campaign?.description}</p>
            </div>
            <div className="flex flex-row md:flex-col gap-2 md:gap-0.5 items-center md:items-start">
              <p className="text-indigo-500 text-2xl font-bold">
                {formatToRupiah(Number(decTotalDonation))}
              </p>
              <p className="text-md md:text-lg leading-4">dari</p>
              <p className="text-indigo-500 text-2xl font-bold">
                {formatToRupiah(campaign?.goal_amount ?? 0)}
              </p>
            </div>
            <Donate id={params.id} />
            {searchParams.error && (
              <div className="text-red-500 text-sm mb-4">
                {searchParams.error}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h1
            className={`${
              donations &&
              donations.filter((donation) => donation.donor_id === user?.id)
                .length > 0
                ? "ml-2"
                : ""
            } font-bold text-xl mb-1`}
          >
            Donasimu (5 terakhir):
          </h1>
          <div className="w-full md:w-[58%]">
            {donations &&
            donations.filter((donation) => donation.donor_id === user?.id)
              .length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-end">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donations
                    .filter((donation) => donation.donor_id === user?.id)
                    .slice(0, 5)
                    .map((donation) => (
                      <TableRow key={donation.donation_id}>
                        <TableCell>
                          {formatTime(donation.created_at ?? "")}
                        </TableCell>
                        <TableCell className="text-end">
                          {formatToRupiah(
                            Number(
                              decrypt(
                                publicKey,
                                privateKey,
                                BigInt(donation.encrypted_amount ?? "0")
                              )
                            )
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            ) : (
              <div
                className={`${
                  donations &&
                  donations.filter((donation) => donation.donor_id === user?.id)
                    .length > 0
                    ? "ml-2"
                    : ""
                }`}
              >
                Belum ada nih, yuk donasi!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
