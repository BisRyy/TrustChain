"use client";

import {
  CalendarIcon,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
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
import {
  lightTheme,
  TransactionButton,
  useSendTransaction,
} from "thirdweb/react";
import { pinata } from "@/lib/config";
import Image from "next/image";

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
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [previewImage, setPreviewImage] = useState("/placeholder.svg");
  const { mutate: sendTransaction } = useSendTransaction();
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    getValues,
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

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      console.log("Uploading image to Pinata...");
      const result = await pinata.upload.file(file);
      console.log("Uploaded image to Pinata:", result);
      setPreviewImage(`https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`);

      // Add or update the image property
      const imagePropertyIndex = fields.findIndex(
        (field) => field.key === "image"
      );
      if (imagePropertyIndex >= 0) {
        setValue(`properties.${imagePropertyIndex}.value`, result.IpfsHash);
      } else {
        append({ key: "image", value: result.IpfsHash, dataType: "file" });
      }
    } catch (error) {
      console.error("Error uploading image to Pinata:", error);
      setStatus({
        type: "error",
        message: "Failed to upload image",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = (data: RegisterAssetForm) => {
    // Filter out empty properties
    const filteredProperties = data.properties.filter(
      (prop) => prop.key && prop.value
    );

    const keys = filteredProperties.map((prop) => prop.key);
    const values = filteredProperties.map((prop) => prop.value);

    console.log("Registering asset:", {
      id: data.assetId,
      name: data.assetName,
      keys,
      values,
    });

    try {
      const transaction = prepareContractCall({
        contract,
        method:
          "function createAsset(uint256 _id, string _name, string[] _keys, string[] _values)",
        params: [BigInt(data.assetId), data.assetName, keys, values],
      });
      const x = sendTransaction(transaction);
      console.log("Asset registered!", transaction, x);
    } catch (error) {
      console.error("Error registering asset:", error);
    }
  };

  const resetForm = () => {
    setValue("assetName", "");
    setValue("assetId", "");
    setValue("properties", []);
  };

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
        <Button>Register New Asset</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px] max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Register New Asset</DialogTitle>
          <DialogDescription>
            Enter the asset details and add any additional properties needed.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="imageUpload"
                  disabled={isUploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleImageUpload(file);
                    }
                  }}
                />
                <Label
                  htmlFor="imageUpload"
                  className={`cursor-pointer block ${
                    isUploading ? "cursor-not-allowed" : ""
                  }`}
                >
                  <Image
                    src={previewImage}
                    alt="Asset Image"
                    className={`rounded-lg object-cover ${
                      !isUploading && "hover:opacity-80"
                    } transition-opacity`}
                    width={200}
                    height={100}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity text-white rounded-lg">
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      "Click to upload image"
                    )}
                  </div>
                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    </div>
                  )}
                </Label>
              </div>
              <div className="space-y-4 w-full">
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
                    {...register("assetId", {
                      required: "Asset ID is required",
                    })}
                  />
                </div>
                {errors.assetId && (
                  <p className="text-sm text-red-500 text-right">
                    {errors.assetId.message}
                  </p>
                )}
              </div>
            </div>

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
                let inputElement;

                if (property.dataType === "number") {
                  inputElement = (
                    <Input
                      type="number"
                      placeholder="Value"
                      {...register(`properties.${index}.value`)}
                    />
                  );
                } else if (property.dataType === "date") {
                  const dateValue = property.value
                    ? new Date(property.value)
                    : undefined;
                  inputElement = (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !dateValue && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateValue ? (
                            format(dateValue, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={dateValue}
                          onSelect={(newDate) => {
                            if (newDate) {
                              setValue(
                                `properties.${index}.value`,
                                newDate.toISOString()
                              );
                            }
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );
                } else if (property.dataType === "boolean") {
                  inputElement = (
                    <Select
                      value={property.value}
                      onValueChange={(val) =>
                        setValue(`properties.${index}.value`, val)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select value" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  );
                } else if (property.dataType === "longtext") {
                  inputElement = (
                    <Textarea
                      placeholder="Value"
                      {...register(`properties.${index}.value`)}
                    />
                  );
                } else if (property.dataType === "file") {
                  inputElement = (
                    <Input
                      type="file"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const result = await pinata.upload.file(file);
                            setValue(
                              `properties.${index}.value`,
                              result.IpfsHash
                            );
                          } catch (error) {
                            console.error("Error uploading to Pinata:", error);
                          }
                        }
                      }}
                    />
                  );
                } else if (property.dataType === "color") {
                  inputElement = (
                    <div className="flex gap-2 items-center">
                      <Input
                        type="color"
                        className="w-12 h-8 p-1"
                        {...register(`properties.${index}.value`)}
                      />
                      <Input
                        type="text"
                        placeholder="#000000"
                        className="flex-1"
                        {...register(`properties.${index}.value`)}
                      />
                    </div>
                  );
                } else if (property.dataType === "url") {
                  inputElement = (
                    <Input
                      type="url"
                      placeholder="https://example.com"
                      {...register(`properties.${index}.value`)}
                    />
                  );
                } else if (property.dataType === "email") {
                  inputElement = (
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      {...register(`properties.${index}.value`)}
                    />
                  );
                } else {
                  inputElement = (
                    <Input
                      type="text"
                      placeholder="Value"
                      {...register(`properties.${index}.value`)}
                    />
                  );
                }

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
                        value={property.dataType}
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
                    <div className="col-span-6">{inputElement}</div>
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <TransactionButton
              transaction={() => {
                setStatus({ type: null, message: "" });
                const values = getValues();
                if (!values.assetName) {
                  throw new Error("Asset name is required");
                }
                if (!values.assetId) {
                  throw new Error("Asset ID is required");
                }

                const filteredProperties = values.properties.filter(
                  (prop) => prop.key && prop.value
                );
                const keys = filteredProperties.map((prop) => prop.key);
                const propValues = filteredProperties.map((prop) => prop.value);

                return prepareContractCall({
                  contract,
                  method:
                    "function createAsset(uint256 _id, string _name, string[] _keys, string[] _values)",
                  params: [
                    BigInt(values.assetId),
                    values.assetName,
                    keys,
                    propValues,
                  ],
                });
              }}
              onTransactionConfirmed={async () => {
                setStatus({
                  type: "success",
                  message: "Asset registered successfully!",
                });
                setTimeout(() => {
                  setOpen(false);
                  setStatus({ type: null, message: "" });
                  resetForm();
                }, 2000);
              }}
              onError={(error) => {
                setStatus({
                  type: "error",
                  message: error.message,
                });
              }}
              theme={lightTheme()}
            >
              Register Asset
            </TransactionButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
