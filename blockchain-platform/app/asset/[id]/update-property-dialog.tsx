"use client"

import { Edit } from "lucide-react"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UpdatePropertyFormData {
  property: string
  newValue: string
}

export function UpdatePropertyDialog() {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePropertyFormData>()

  // This would come from your API/database
  const properties = ["Batch Number", "Manufacturing Date", "Serial Number", "Quality Certification", "Warranty Period"]

  const onSubmit = (data: UpdatePropertyFormData) => {
    console.log("Updating property:", data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            Modify an existing property value. All changes are recorded on the blockchain.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="property">Select Property</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a property" />
                </SelectTrigger>
                <SelectContent>
                  {properties.map((prop) => (
                    <SelectItem key={prop} value={prop}>
                      {prop}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newValue">New Value</Label>
              <Input
                id="newValue"
                placeholder="Enter new value"
                {...register("newValue", { required: "New value is required" })}
              />
              {errors.newValue && <p className="text-sm text-red-500">{errors.newValue.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Update Property</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

