"use client";

import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { contract } from "@/lib/client";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";

type PropertyDataType =
  | "text"
  | "number"
  | "date"
  | "boolean"
  | "url"
  | "email"
  | "longtext"
  | "file"
  | "color";

interface AssetProperty {
  key: string;
  value: string;
  dataType: PropertyDataType;
}

interface RegisterAssetForm {
  assetName: string;
  assetId: string;
  properties: AssetProperty[];
}

const DATA_TYPES: { label: string; value: PropertyDataType }[] = [
  { label: "Text", value: "text" },
  { label: "Number", value: "number" },
  { label: "Date", value: "date" },
  { label: "Yes/No", value: "boolean" },
  { label: "URL", value: "url" },
  { label: "Email", value: "email" },
  { label: "Long Text", value: "longtext" },
  { label: "File", value: "file" },
  { label: "Color", value: "color" },
];

export function RegisterAssetDialog() {
  const [open, setOpen] = useState(false);
  const { mutate: sendTransaction } = useSendTransaction();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterAssetForm>({
    defaultValues: {
      assetName: "",
      assetId: "",
      properties: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "properties",
  });

  const addProperty = () => {
    append({ key: "", value: "", dataType: "text" });
  };

  const PropertyInput = ({
    index,
    dataType,
    value,
    onChange,
  }: {
    index: number;
    dataType: PropertyDataType;
    value: string;
    onChange: (value: string) => void;
  }) => {
    const [date, setDate] = useState<Date | undefined>(
      value ? new Date(value) : undefined
    );

    switch (dataType) {
      case "number":
        return (
          <Input
            type="number"
            placeholder="Value"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (newDate) {
                    onChange(newDate.toISOString());
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );

      case "boolean":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select value" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Yes</SelectItem>
              <SelectItem value="false">No</SelectItem>
            </SelectContent>
          </Select>
        );

      case "longtext":
        return (
          <Textarea
            placeholder="Value"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "file":
        return (
          <Input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file.name);
              }
            }}
          />
        );

      case "color":
        return (
          <div className="flex gap-2 items-center">
            <Input
              type="color"
              className="w-12 h-8 p-1"
              value={value || "#000000"}
              onChange={(e) => onChange(e.target.value)}
            />
            <Input
              type="text"
              placeholder="#000000"
              className="flex-1"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        );

      case "url":
        return (
          <Input
            type="url"
            placeholder="https://example.com"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      case "email":
        return (
          <Input
            type="email"
            placeholder="email@example.com"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );

      default:
        return (
          <Input
            type="text"
            placeholder="Value"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
    }
  };

  const onSubmit = (data: RegisterAssetForm) => {
    // Filter out empty properties
    const filteredProperties = data.properties.filter(
      (prop) => prop.key && prop.value
    );
    const finalData = {
      ...data,
      properties: filteredProperties,
    };
    console.log("Registering asset:", finalData);
    // Here you would typically make an API call to register the asset

    const transaction = prepareContractCall({
      contract,
      method: "function createAsset(uint256 _id, string _name)",
      params: [12, "Apple"],
    });
    sendTransaction(transaction);
    console.log("Asset registered!", transaction);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Register New Asset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Register New Asset</DialogTitle>
          <DialogDescription>
            Enter the asset details and add any additional properties needed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assetName" className="text-right">
                Name
              </Label>
              <Input
                id="assetName"
                className="col-span-3"
                {...register("assetName", {
                  required: "Asset name is required",
                })}
              />
            </div>
            {errors.assetName && (
              <p className="text-sm text-red-500 text-right">
                {errors.assetName.message}
              </p>
            )}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="assetId" className="text-right">
                ID
              </Label>
              <Input
                id="assetId"
                className="col-span-3"
                {...register("assetId", { required: "Asset ID is required" })}
              />
            </div>
            {errors.assetId && (
              <p className="text-sm text-red-500 text-right">
                {errors.assetId.message}
              </p>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Properties</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addProperty}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Property
                </Button>
              </div>

              {fields.map((field, index) => {
                const property = watch(`properties.${index}`);

                return (
                  <div
                    key={field.id}
                    className="grid grid-cols-12 gap-2 items-start"
                  >
                    <div className="col-span-3">
                      <Input
                        placeholder="Key"
                        {...register(`properties.${index}.key`)}
                      />
                    </div>
                    <div className="col-span-2">
                      <Select
                        value={property?.dataType || "text"}
                        onValueChange={(value: PropertyDataType) => {
                          setValue(`properties.${index}.dataType`, value);
                          setValue(`properties.${index}.value`, "");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {DATA_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-6">
                      <PropertyInput
                        index={index}
                        dataType={property?.dataType || "text"}
                        value={property?.value || ""}
                        onChange={(value) =>
                          setValue(`properties.${index}.value`, value)
                        }
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="col-span-1"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Register Asset</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
