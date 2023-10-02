import React from "react";
import dummyVendors, { Vendor } from "@/data/vendor-details";
import { DataTable } from "./data-table";
import { columns } from "./vendor-col";
import { ColumnDef } from "@tanstack/react-table";

export default function VendorsTable() {
  const [vendors, setVendors] = React.useState(dummyVendors);
  const handleDeleteVendor = (vendorId: string) => {
    console.log(vendorId);
    // Filter out the vendor with the specified ID
    const updatedVendors = vendors.filter((vendor) => vendor.id !== vendorId);
    console.log(updatedVendors);
    setVendors(updatedVendors);
  };
  const columnsTemp: ColumnDef<Vendor>[] = columns({
    onDeleteVendor: handleDeleteVendor,
  });
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columnsTemp} data={vendors} />
    </div>
  );
}
