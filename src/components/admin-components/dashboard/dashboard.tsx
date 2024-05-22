import {
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  EyeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import CardDataStat from "../CardDataStat";
import ChartOne from "../category/charts/ChartOne";
import ChartTwo from "../category/charts/ChartTwo";
import TableOne from "../tables/TableOne";
import ChatCard from "../ChatCard";
import { formatDate } from "~/utils/commonUtils";
import { Post } from "~/types/post";

const postData: Post[] = [
  
];

export default function Dashboard() {
  return (
    <section className="p-4 md:p-6 2xl:p-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStat title="Total views" total="3.456K" rate="0.43%" levelUp>
          <EyeIcon className="w-6 h-6 text-primary dark:text-white" />
        </CardDataStat>
        <CardDataStat title="Total blogs" total="45,2K" rate="4.35%" levelUp>
          <DocumentTextIcon className="w-6 h-6 text-primary dark:text-white" />
        </CardDataStat>
        <CardDataStat title="Total users" total="3.456" rate="0.95%" levelDown>
          <UsersIcon className="w-6 h-6 text-primary dark:text-white" />
        </CardDataStat>
        <CardDataStat title="Total comments" total="2.450" rate="2.59%" levelUp>
          <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-primary dark:text-white" />
        </CardDataStat>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <div className="col-span-12 xl:col-span-8">
          <TableOne postData={postData} title="Top post" />
        </div>
        <ChatCard />
      </div>
    </section>
  );
}
