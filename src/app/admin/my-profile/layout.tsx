"use client";
import React, { useEffect, useState } from "react";
import AdminHeader from "~/components/admin-components/admin-header";
import Sidebar from "~/components/admin-components/sidebar";
import Loader from "~/components/common/Loader";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [contentSidebarOpen, setContentSidebarOpen] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <html lang="en">
      <body suppressContentEditableWarning={true}>
        <div className={`dark:bg-boxdark-2 ${loading ? "hidden" : ""}`}>
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                contentSidebarOpen={contentSidebarOpen}
                setContentSidebarOpen={setContentSidebarOpen}
              />
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <AdminHeader
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <main>
                  <div className="mx-auto max-w-[1140px] p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
};

export default AdminLayout;
