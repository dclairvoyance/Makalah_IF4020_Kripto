"use server";

import { createClient } from "@/utils/supabase/server";
import { addition, encrypt, decrypt } from "@/utils/algorithm/paillier";
import { revalidatePath } from "next/cache";

export async function donate(formData: FormData) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const publicKey = {
    n: BigInt(process.env.NEXT_PUBLIC_KEY_N ?? "0"),
    g: BigInt(process.env.NEXT_PUBLIC_KEY_G ?? "0"),
  };

  const privateKey = {
    lambda: BigInt(process.env.NEXT_PRIVATE_KEY_LAMBDA ?? "0"),
    mu: BigInt(process.env.NEXT_PRIVATE_KEY_MU ?? "0"),
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
