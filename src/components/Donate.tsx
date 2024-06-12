import MoneyInput from "@/components/MoneyInput";
import { donate } from "@/app/donations/[id]/actions";
import SubmitButton from "./SubmitButton";

export default function Donate({ id }: { id: string }) {
  return (
    <form action={donate} className="flex items-center gap-2 h-10 mt-2">
      <div className="w-[60%] h-full">
        <MoneyInput />
        <input id="campaign_id" name="campaign_id" type="hidden" value={id} />
      </div>
      <SubmitButton />
    </form>
  );
}
