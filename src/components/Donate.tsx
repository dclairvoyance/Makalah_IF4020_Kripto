import MoneyInput from "@/components/MoneyInput";
import { donate } from "@/app/donations/[id]/actions";

export default async function Donate({ id }: { id: string }) {
  return (
    <form action={donate} className="flex items-center gap-2 h-10 mt-2">
      <div className="w-[60%] h-full">
        <MoneyInput />
        <input id="campaign_id" name="campaign_id" type="hidden" value={id} />
      </div>
      <button className="w-[40%] bg-indigo-500 text-white rounded-sm h-full text-md">
        Donate
      </button>
    </form>
  );
}
