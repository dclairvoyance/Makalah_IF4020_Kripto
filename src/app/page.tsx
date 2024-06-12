import { createClient } from "@/utils/supabase/server";
import Card from "../components/Card";

export default async function Home() {
  const supabase = createClient();

  const { data: campaigns } = await supabase.from("campaigns").select("*");

  return (
    <main className="flex w-full items-center">
      <div className="container px-8 py-4 flex flex-col max-w-6xl">
        <h1 className="text-xl font-bold mb-4">Daftar Donasi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {campaigns?.map((campaign) => (
            <Card
              key={campaign.campaign_id}
              campaign_id={campaign.campaign_id}
              description={campaign.description}
              fundraiser_id={campaign.fundraiser_id}
              goal_amount={campaign.goal_amount}
              title={campaign.title}
              thumbnail={campaign.thumbnail}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
