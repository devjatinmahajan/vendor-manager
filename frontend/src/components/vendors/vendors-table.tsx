import dummyVendors from "@/data/vendor-details";
import { DataTable } from "./data-table";
import { columns } from "./vendor-col";

export default function vendorsTable() {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={dummyVendors} />
    </div>
  );
}
