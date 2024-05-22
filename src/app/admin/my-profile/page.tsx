"use client";
import { useState } from "react";
import Breadcrumb from "~/components/admin-components/Breadcrumb";
import ChatCard from "~/components/admin-components/ChatCard";
import ProfileCard from "~/components/admin-components/my-profile/ProfileCard";
import ProfileEdit from "~/components/admin-components/my-profile/ProfileCardEdit";
import TableOne from "~/components/admin-components/tables/TableOne";
import { Post } from "~/types/post";
import { User } from "~/types/user";


const postData: Post[] = [
];

const Profile: React.FC = () => {
  const [editedUser, setEditedUser] = useState<User | null>(null);

  const handleSave = (updatedUser: User) => {
    console.log("Updated user:", updatedUser);
    setEditedUser(updatedUser);
  };

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <section className="mx-auto max-w-7xl grid sm:grid-cols-6 gap-4 lg:gap-6">
        <div className="sm:col-span-3 lg:col-span-2 h-full">
          <ProfileCard  />
        </div>
        <div className="sm:col-span-3 lg:col-span-4">
          {editedUser !== null ? (
            <ProfileEdit />
          ) : (
            <ProfileEdit />
          )}
        </div>
        <div className="sm:col-span-6 lg:col-span-2 h-full">
          <ChatCard />
        </div>
        <div className="sm:col-span-6 lg:col-span-4">
          <TableOne title="Post" postData={postData} />
        </div>
      </section>
    </>
  );
};

export default Profile;
