"use client"
import React, { useEffect, useState } from "react";
import AdminHeader from "~/components/admin-components/admin-header";
import Sidebar from "~/components/admin-components/sidebar";
import Loader from "~/components/common/Loader";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [contentSidebarOpen, setContentSidebarOpen] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div suppressContentEditableWarning={true}>
        <div className={`dark:bg-boxdark-2 ${loading ? 'hidden' : ''}`}>
          {loading ? <Loader /> :
            (
              <div className="flex h-screen overflow-hidden">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} contentSidebarOpen={contentSidebarOpen} setContentSidebarOpen={setContentSidebarOpen} />
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden ">
                  <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                  <main className=" z-10">
                    <div className=" ">
                      {children}
                    </div>
                  </main>
                </div>
              </div>
            )
          }
        </div>
      </div>
  );
};

export default AdminLayout;