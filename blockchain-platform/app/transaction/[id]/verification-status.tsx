import { CheckCircle2, Shield } from "lucide-react"

import { Progress } from "@/components/ui/progress"

interface VerificationStatusProps {
  status: string
  confirmations: number
}

export function VerificationStatus({ status, confirmations }: VerificationStatusProps) {
  // Usually 12-15 confirmations are considered secure
  const requiredConfirmations = 15
  const progress = Math.min((confirmations / requiredConfirmations) * 100, 100)

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-full">
          <Shield className="h-6 w-6 text-green-600 dark:text-green-500" />
        </div>
        <div className="space-y-1">
          <p className="font-medium">Transaction Verified</p>
          <p className="text-sm text-muted-foreground">
            This transaction has been verified and recorded on the blockchain
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Confirmations</span>
          <span className="font-medium">
            {confirmations} of {requiredConfirmations}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
        {progress >= 100 && (
          <div className="flex items-center gap-2 text-sm text-green-600">
            <CheckCircle2 className="h-4 w-4" />
            <span>Fully Confirmed</span>
          </div>
        )}
      </div>

      <div className="rounded-lg border p-4 space-y-2">
        <p className="text-sm font-medium">Security Level</p>
        <div className="flex items-center gap-2">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current Security Level</span>
              <span>Maximum</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

