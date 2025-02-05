"use client"

import { Send } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TransferFormData {
  recipient: string
  notes: string
}

export function TransferAssetDialog() {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransferFormData>()

  const onSubmit = (data: TransferFormData) => {
    console.log("Transferring asset:", data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Send className="mr-2 h-4 w-4" />
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transfer Asset</DialogTitle>
          <DialogDescription>Transfer this asset to another owner. This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input
                id="recipient"
                placeholder="Enter recipient's blockchain address"
                {...register("recipient", { required: "Recipient address is required" })}
              />
              {errors.recipient && <p className="text-sm text-red-500">{errors.recipient.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Transfer Notes</Label>
              <Textarea id="notes" placeholder="Add any notes about this transfer" {...register("notes")} />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Transfer Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

