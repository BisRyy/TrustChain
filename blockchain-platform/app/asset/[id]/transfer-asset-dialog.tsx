"use client";

import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prepareContractCall } from "thirdweb";
import { contract } from "@/lib/client";
import { TransactionButton } from "thirdweb/react";

interface TransferFormData {
  recipient: string;
  notes: string;
}

export function TransferAssetDialog({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    watch,
    formState: { errors },
  } = useForm<TransferFormData>();

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
          <Send className="mr-2 h-4 w-4" />
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-w-lg">
        <DialogHeader>
          <DialogTitle>Transfer Asset</DialogTitle>
          <DialogDescription>
            Transfer this asset to another owner. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="Recipient's address"
                {...register("recipient", {
                  required: "Recipient address is required",
                })}
              />
              {errors.recipient && (
                <p className="text-sm text-red-500">
                  {errors.recipient.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Transfer Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes"
                {...register("notes")}
              />
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
                    "function transferAsset(uint256 _id, address _newOwner)",
                  params: [BigInt(id), watch("recipient")],
                })
              }
              onTransactionConfirmed={() => {
                setStatus({
                  type: "success",
                  message: "Asset transferred successfully!",
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
              Transfer Asset
            </TransactionButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
