import Link from "next/link";
import Selector from "./Selector";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Pagination() {
  return (
    <div className="flex justify-end mt-5">
      <div className="flex items-center">
        <p className="dark:text-white mr-4">Page <span>1</span> of <span>1</span></p>

        <div className="rounded-sm flex items-center justify-center overflow-hidden w-[73px] h-9">
            <Link href="#">
                <span className="flex flex-1 bg-white justify-center items-center w-9 h-9 text-[var(--secondary-color)] border border-stroke mr-[1px]">
                    <ChevronLeftIcon className="w-5 h-5" />
                </span>
            </Link>
            <Link href="#">
                <span className="flex flex-1 bg-white justify-center items-center w-9 h-9 text-[var(--secondary-color)] border border-stroke">
                    <ChevronRightIcon className="w-5 h-5" />
                </span>
            </Link>
        </div>
      </div>
    </div>
  );
}
