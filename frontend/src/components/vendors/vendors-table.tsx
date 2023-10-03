import { Vendor } from "@/data/vendor-details";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DataTable } from "./data-table";
import { columns } from "./vendor-col";
import { ColumnDef } from "@tanstack/react-table";
import {
  fetchVendors,
  addVendor,
  deleteVendor,
  updateVendor,
} from "../../api/vendorApi";
import React from "react";

export default function VendorsTable() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const { data: vendors, error, isLoading } = useQuery("vendors", fetchVendors);
  const addVendorMutation = useMutation(addVendor, {
    onSuccess: () => {
      // Data successfully added to the backend.
      // You can update your list or take other actions here
      setDialogOpen(false);
      queryClient.invalidateQueries("vendors"); // Optionally refetch the list.
    },
  });
  const deleteVendorMutation = useMutation(deleteVendor, {
    onSuccess: () => {
      queryClient.invalidateQueries("vendors");
    },
  }); // Create a mutation for deleting vendors
  const updateVendorMutation = useMutation(updateVendor, {
    onSuccess: () => {
      setDialogOpen(false);
      queryClient.invalidateQueries("vendors");
    },
  });
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error;

  const handleAddVendor = async (newVendor: Vendor) => {
    try {
      await addVendorMutation.mutateAsync(newVendor);
      // if (addVendorMutation.isSuccess) {
      //   queryClient.invalidateQueries("vendors");
      // }
      //show loading in form, remove dialog box and show Vendor added in toast.
    } catch (error) {
      //show loading and then error message in toast.
      console.error("Error adding vendor:", error);
    }
  };

  const handleDeleteVendor = async (vendorId: string) => {
    try {
      await deleteVendorMutation.mutateAsync(vendorId);
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  const handleUpdateVendor = async (updatedVendor: Vendor) => {
    try {
      await updateVendorMutation.mutateAsync(updatedVendor);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const columnsTemp: ColumnDef<Vendor>[] = columns({
    onDeleteVendor: handleDeleteVendor,
    onUpdateVendor: handleUpdateVendor,
    updateVendorMutation,
  });
  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columnsTemp}
        data={vendors.vendors}
        onAddVendor={handleAddVendor}
        addVendorMutation={addVendorMutation}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
}
