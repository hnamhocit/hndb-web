"use client";

import AddDataSourceDialog from "@/components/AddDataSourceDialog";
import DataSources from "@/components/DataSources";
import QueryBuilder from "@/components/QueryBuilder";
import TableDetail from "@/components/TableDetail";
import Tabs from "@/components/Tabs";
import { useTabsStore } from "@/stores";

export default function Home() {
  const { activeTab } = useTabsStore();

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="shrink-0 w-92 border-r overflow-y-scroll">
        <div className="h-12 border-b p-4 flex items-center justify-between">
          <div className="text-xl font-bold">Data Sources</div>

          <AddDataSourceDialog />
        </div>

        <DataSources />
      </div>

      <div className="flex-1 min-w-0">
        <Tabs />

        {activeTab && (
          <div className="h-[calc(100vh-4rem)] overflow-auto relative space-y-7">
            {activeTab.type === "query" ? (
              <QueryBuilder />
            ) : activeTab.type === "table" ? (
              <TableDetail />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                No active tab. Click &quot;New&quot; to create a query tab.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
