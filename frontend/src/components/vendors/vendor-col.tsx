import { Vendor } from "@/data/vendor-details";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import NewVendorForm from "./new-vendor-form";
import { UseMutationResult } from "react-query";

interface CreateColumnsProps {
  onDeleteVendor: (vendorId: string) => void;
  onUpdateVendor: (vendor: Vendor) => void;
  updateVendorMutation: UseMutationResult<Vendor, unknown, Vendor, unknown>;
}

export function columns({
  onDeleteVendor,
  onUpdateVendor,
  updateVendorMutation,
}: CreateColumnsProps): ColumnDef<Vendor>[] {
  return [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "accountNumber",
      header: "Account Number",
    },
    {
      accessorKey: "bankName",
      header: "Bank Name",
    },
    {
      accessorKey: "address1",
      header: "Address Line 1",
    },
    {
      accessorKey: "address2",
      header: "Address Line 2",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "zipcode",
      header: "Zip Code",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        // const payment = row.original;

        return (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <span>Edit</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => onDeleteVendor(row.original._id!)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to
                  permanently delete this file from our servers?
                </DialogDescription>
              </DialogHeader>
              <NewVendorForm
                edit={true}
                onUpdateVendor={onUpdateVendor}
                updateVendorMutation={updateVendorMutation}
                row={row.original}
              />
            </DialogContent>
          </Dialog>
        );
      },
    },
  ];
}

// export const columns: ColumnDef<Vendor>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "accountNumber",
//     header: "Account Number",
//   },
//   {
//     accessorKey: "bankName",
//     header: "Bank Name",
//   },
//   {
//     accessorKey: "address1",
//     header: "Address Line 1",
//   },
//   {
//     accessorKey: "address2",
//     header: "Address Line 2",
//   },
//   {
//     accessorKey: "city",
//     header: "City",
//   },
//   {
//     accessorKey: "country",
//     header: "Country",
//   },
//   {
//     accessorKey: "zipcode",
//     header: "Zip Code",
//   },
//   {
//     id: "actions",
//     cell: () => {
//       // const payment = row.original;

//       return (
//         <Dialog>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               {/* <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(payment.id)}
//             >
//               Copy payment ID
//             </DropdownMenuItem> */}
//               <DropdownMenuSeparator />
//               <DialogTrigger asChild>
//                 <DropdownMenuItem>
//                   <span>Edit</span>
//                 </DropdownMenuItem>
//               </DialogTrigger>
//               <DropdownMenuItem className="text-red-600">
//                 Delete
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>Are you sure absolutely sure?</DialogTitle>
//               <DialogDescription>
//                 This action cannot be undone. Are you sure you want to
//                 permanently delete this file from our servers?
//               </DialogDescription>
//             </DialogHeader>
//             <NewVendorForm />
//           </DialogContent>
//         </Dialog>
//       );
//     },
//   },
// ];
