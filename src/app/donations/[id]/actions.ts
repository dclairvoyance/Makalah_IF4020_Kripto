"use server";

import { createClient } from "@/utils/supabase/server";
import { addition, encrypt, decrypt } from "@/utils/algorithm/paillier";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function donate(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/donations/${formData.get("campaign_id")}?error=You need to login first`
    );
  }

  const publicKey = {
    n: BigInt(process.env.NEXT_PUBLIC_KEY_N ?? "0"),
    g: BigInt(process.env.NEXT_PUBLIC_KEY_G ?? "0"),
  };

  const amount = Number(formData.get("amount") as string);
  const encrypted_amount = encrypt(publicKey, BigInt(amount));
  const campaign_id = Number(formData.get("campaign_id") as string);
  const donor_id = user?.id ?? "";

  const { error } = await supabase.from("donations").insert({
    campaign_id,
    donor_id,
    encrypted_amount: encrypted_amount.toString(),
    amount,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/donations/${campaign_id}`, "layout");
}
