import Image from "next/image";
import { formatToRupiah } from "../utils/format";
import Link from "next/link";
import { Campaign } from "@/types/custom";

export default function Card(campaign: Campaign) {
  return (
    <Link href={`/donations/${campaign.campaign_id}`}>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <div className="relative w-full h-60">
          <Image
            fill
            src={campaign.thumbnail}
            alt="Thumbnail"
            className="object-cover"
          />
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between gap-4">
            <div>
              <p className="font-bold text-lg md:text-xl line-clamp-1">
                {campaign.title}
              </p>
              <p className="text-gray-500 text-xs md:text-sm line-clamp-2">
                {campaign.description}
              </p>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-sm leading-4">Goal:</p>
              <p className="text-indigo-500 text-lg md:text-xl font-bold">
                {formatToRupiah(campaign.goal_amount ?? 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
