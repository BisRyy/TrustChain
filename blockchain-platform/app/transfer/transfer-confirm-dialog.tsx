"use client"

import { Building2, Loader2, User } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface TransferConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  formData: any
  assetId: string
}

export function TransferConfirmDialog({ open, onOpenChange, formData, assetId }: TransferConfirmDialogProps) {
  const [isTransferring, setIsTransferring] = useState(false)
  const router = useRouter()

  async function handleTransfer() {
    setIsTransferring(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTransferring(false)
    onOpenChange(false)
    // Redirect to transaction page
    router.push("/transaction/tx123")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Confirm Transfer</DialogTitle>
          <DialogDescription>Please review the transfer details before confirming</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Asset</p>
            <p className="text-sm">Asset #{assetId}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Recipient</p>
            <div className="flex items-center gap-2 text-sm">
              {formData.recipientType === "organization" ? (
                <Building2 className="h-4 w-4" />
              ) : (
                <User className="h-4 w-4" />
              )}
              <span>{formData.recipientName}</span>
            </div>
            <p className="text-sm font-mono">{formData.recipientAddress}</p>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm font-medium">Transfer Details</p>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="capitalize">{formData.transferType} Transfer</span>
              </div>
              {formData.transferDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date</span>
                  <span>{new Date(formData.transferDate).toLocaleString()}</span>
                </div>
              )}
              {formData.conditions && (
                <div className="space-y-1 text-sm">
                  <span className="text-muted-foreground">Conditions</span>
                  <p className="text-sm">{formData.conditions}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Back
          </Button>
          <Button onClick={handleTransfer} disabled={isTransferring}>
            {isTransferring ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Confirm Transfer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

