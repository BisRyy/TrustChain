"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/client";
import { TransactionButton, useReadContract } from "thirdweb/react";
import { CheckCircle2, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UpdatePropertyFormData {
  property: string;
  newValue: string;
}

export function UpdatePropertyDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const { data: properties, isPending } = useReadContract({
    contract,
    method:
      "function getAssetPropertyKeys(uint256 _id) view returns (string[])",
    params: [BigInt(id)],
  });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<UpdatePropertyFormData>();

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setStatus({ type: null, message: "" });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Update Property
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Property</DialogTitle>
          <DialogDescription>
            Modify an existing property value. All changes are recorded on the
            blockchain.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="property">Select Property</Label>
              <Select
                {...register("property", { required: "Property is required" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent>
                  {(properties || []).map((prop) => (
                    <SelectItem key={prop} value={prop}>
                      {prop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.property && (
                <p className="text-sm text-red-500">
                  {errors.property.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                placeholder="Enter new value"
                {...register("newValue", { required: "New value is required" })}
              />
              {errors.newValue && (
                <p className="text-sm text-red-500">
                  {errors.newValue.message}
                </p>
              )}
            </div>

            {status.type && (
              <div
                className={`flex items-center gap-2 p-3 rounded-md ${
                  status.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{status.message}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract,
                  method:
                    "function setAssetProperty(uint256 _id, string _key, string _value)",
                  params: [BigInt(id), watch("property"), watch("newValue")],
                })
              }
              onTransactionConfirmed={() => {
                setStatus({
                  type: "success",
                  message: "Property updated successfully!",
                });
                setTimeout(() => {
                  setOpen(false);
                  setStatus({ type: null, message: "" });
                }, 2000);
              }}
              onError={(error) => {
                setStatus({
                  type: "error",
                  message: error.message,
                });
              }}
            >
              Update Property
            </TransactionButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
