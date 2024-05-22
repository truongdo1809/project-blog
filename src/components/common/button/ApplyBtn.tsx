import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

interface ApplyBtnProps {
  onClick?: () => void;
}

const ApplyBtn: React.FC<ApplyBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer h-10 w-full text-white border justify-center border-stroke  py-1 px-4 rounded-lg bg-primary hover:bg-[#4096ff]"
    >
      <ArrowUturnRightIcon className="w-4 h-4 mr-1" /> Apply
    </button>
  );
};
export default ApplyBtn;
