import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Vendor } from "@/data/vendor-details";
import { UseMutationResult } from "react-query";

interface InputField {
  id: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export default function NewVendorForm({
  onAddVendor,
  addVendorMutation,
  edit,
  row,
  onUpdateVendor,
  updateVendorMutation,
}: {
  onAddVendor?: (vendor: Vendor) => void;
  addVendorMutation?: UseMutationResult<Vendor, unknown, Vendor, unknown>;
  edit: boolean;
  row?: Vendor;
  onUpdateVendor?: (vendor: Vendor) => void;
  updateVendorMutation?: UseMutationResult<Vendor, unknown, Vendor, unknown>;
}) {
  const inputFields: InputField[] = [
    {
      id: "name",
      label: "Vendor Name",
      required: true,
      defaultValue: row?.name,
    },
    {
      id: "accountNumber",
      label: "Account Number",
      required: true,
      defaultValue: row?.accountNumber,
    },
    { id: "bankName", label: "Bank Name", defaultValue: row?.bankName },
    { id: "address1", label: "Address Line 1", defaultValue: row?.address1 },
    { id: "address2", label: "Address Line 2", defaultValue: row?.address2 },
    { id: "city", label: "City", defaultValue: row?.city },
    { id: "country", label: "Country", defaultValue: row?.country },
    { id: "zipcode", label: "Zip", defaultValue: row?.zipcode?.toString() },
  ];

  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newVendor: Vendor = {
      name: formData.name,
      accountNumber: formData.accountNumber,
      bankName: formData.bankName,
      address1: formData.address1,
      address2: formData.address2,
      city: formData.city,
      country: formData.country,
      zipcode: Number(formData.zipcode),
    };
    if (!edit && onAddVendor) onAddVendor(newVendor);
    else {
      newVendor._id = row?._id;
      if (onUpdateVendor) onUpdateVendor(newVendor);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      {inputFields.map((field) => (
        <div className="flex flex-col gap-2" key={field.id}>
          <label htmlFor={field.id} className="text-primary">
            {field.label}
          </label>
          <Input
            required={field.required}
            className="shadow-none focus-visible:ring-0 h-8"
            id={field.id}
            // value={formData[field.id] || ""}
            onChange={handleInputChange}
            defaultValue={field.defaultValue}
          />
        </div>
      ))}
      <Button
        type="submit"
        variant="default"
        disabled={
          addVendorMutation?.isLoading || updateVendorMutation?.isLoading
        }
      >
        Save
      </Button>
    </form>
  );
}
