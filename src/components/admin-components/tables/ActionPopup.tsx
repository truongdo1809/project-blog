import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import authSlice from "~/app/lib/features/authSlice";
import { API_URLS } from "~/utils/commonUtils";

interface ActionsPopupProps {
  postId: number;
  onDelete: () => void;
}

export default function ActionsPopup({ postId, onDelete }: ActionsPopupProps) {
  const { user } = useSelector(authSlice.selectSlice);
  const accessToken = user && user.user.accessToken;
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/admin/blogs/blog-editor?id=${postId}`);
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URLS.DELETEPOST}${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      onDelete();
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  }

  return (
    <div className="flex items-center justify-center pt-3">
      <button
        className="border border-stroke px-2.5 py-1.5 bg-primary text-white rounded-md mr-2 opacity-90 hover:opacity-100"
        title="View full blog"
      >
        <EyeIcon className="w-5 h-5" />
      </button>
      <button
        className="border border-stroke px-2.5 py-1.5 bg-secondary text-white rounded-md mr-2 opacity-90 hover:opacity-100"
        title="Edit blog"
        onClick={handleEdit}
      >
        <PencilSquareIcon className="w-5 h-5 pl-0.5" />
      </button>
      <button
        className="border border-stroke px-2.5 py-1.5 bg-meta-1 text-white rounded-md opacity-90 hover:opacity-100"
        title="Delete post"
        onClick={handleDelete}
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
