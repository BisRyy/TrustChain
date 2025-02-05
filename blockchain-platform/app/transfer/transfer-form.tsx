"use client"

import { ArrowRight, Building2, Loader2, User } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { TransferConfirmDialog } from "./transfer-confirm-dialog"

const formSchema = z.object({
  recipientType: z.enum(["individual", "organization"]),
  recipientName: z.string().min(2, {
    message: "Recipient name must be at least 2 characters.",
  }),
  recipientAddress: z.string().min(42, {
    message: "Please enter a valid blockchain address.",
  }),
  transferType: z.enum(["immediate", "scheduled"]),
  transferDate: z.string().optional(),
  conditions: z.string().optional(),
  notes: z.string().optional(),
})

interface TransferFormProps {
  assetId: string
}

export function TransferForm({ assetId }: TransferFormProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientType: "organization",
      transferType: "immediate",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsConfirmOpen(true)
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="recipientType"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Recipient Type</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="individual" id="individual" />
                    <Label htmlFor="individual" className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Individual
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="organization" id="organization" />
                    <Label htmlFor="organization" className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      Organization
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipientName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter recipient name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="recipientAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter blockchain address" {...field} />
              </FormControl>
              <FormDescription>The blockchain address of the recipient</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="transferType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select transfer type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="immediate">Immediate Transfer</SelectItem>
                  <SelectItem value="scheduled">Scheduled Transfer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("transferType") === "scheduled" && (
          <FormField
            control={form.control}
            name="transferDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transfer Date</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="conditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transfer Conditions (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter any conditions for the transfer" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Specify any conditions that must be met for the transfer</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add any notes about this transfer" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            <>
              Continue to Review
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <TransferConfirmDialog
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        formData={form.getValues()}
        assetId={assetId}
      />
    </Form>
  )
}

function Label({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      {...props}
    >
      {children}
    </label>
  )
}

