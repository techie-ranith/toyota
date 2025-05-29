"use client"

import React, { useState } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Slider } from "@/components/ui/slider"
import { Check, ChevronsUpDown } from "lucide-react"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"

// Updated schema - removed `id` and adjusted partType and status as arrays
const formSchema = z.object({
  name: z.string().min(1),
  partType: z.array(z.string()).min(1), // now an array
  brand: z.string().min(1),
  quantityInStock: z.number(),
  price: z.string().min(1),
  status: z.array(z.enum(["In Stock", "Out of Stock"])).min(1), // array of enums
})

export default function VehiclePartsPage() {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      partType: [],
      brand: "",
      quantityInStock: 0,
      price: "",
      status: [],
    },
  })

  // Options labels & values must match schema enums (status)
  const partTypeOptions = [
    { label: "Battery", value: "battery" },
    { label: "Tire", value: "tire" },
    { label: "Oil Filter", value: "oil_filter" },
  ] as const

  const statusOptions = [
    { label: "In Stock", value: "In Stock" }, // Match exactly enum string
    { label: "Out of Stock", value: "Out of Stock" },
  ] as const

  // Handle single selection for partType and status, convert to array for schema
  // If you want multiple select, you can adjust UI to support that (right now it's single select)

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Wrap single values in arrays for partType and status if they are strings
    // but here they are arrays already, so no conversion needed if UI provides arrays.

    console.log("Submitting:", values)
    try {
      await axios.post("http://localhost:5000/api/vehicleparts", {
        name: values.name,
        partType: values.partType,
        brand: values.brand,
        quantity: values.quantityInStock,
        price: values.price,
        status: values.status,
      })
      toast.success("Vehicle part created!")
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error("Submit Error", error)
      toast.error("Failed to create vehicle part")
    }
  }

  // You may want to convert your popovers to allow multi-selection for partType and status
  // For now, the example only allows single selection, so you can adapt as needed.

  return (
    <div className="p-6">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Add Vehicle Part</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 max-w-3xl py-4"
            >
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Item Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="partType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Part Type</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value.length && "text-muted-foreground"
                                )}
                              >
                                {field.value.length
                                  ? partTypeOptions
                                      .filter((pt) => field.value.includes(pt.value))
                                      .map((pt) => pt.label)
                                      .join(", ")
                                  : "Select part type"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search part..." />
                              <CommandList>
                                <CommandEmpty>No part type found.</CommandEmpty>
                                <CommandGroup>
                                  {partTypeOptions.map((pt) => (
                                    <CommandItem
                                      value={pt.value}
                                      key={pt.value}
                                      onSelect={() => {
                                        if (field.value.includes(pt.value)) {
                                          form.setValue(
                                            "partType",
                                            field.value.filter((v) => v !== pt.value)
                                          )
                                        } else {
                                          form.setValue("partType", [...field.value, pt.value])
                                        }
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value.includes(pt.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {pt.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brand</FormLabel>
                        <FormControl>
                          <Input placeholder="Brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="quantityInStock"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Quantity in Stock: {value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={0}
                        max={100}
                        step={1}
                        defaultValue={[value || 0]}
                        onValueChange={(vals) => onChange(vals[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g. 99.99" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value.length && "text-muted-foreground"
                                )}
                              >
                                {field.value.length
                                  ? statusOptions
                                      .filter((s) => field.value.includes(s.value))
                                      .map((s) => s.label)
                                      .join(", ")
                                  : "Select status"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0">
                            <Command>
                              <CommandInput placeholder="Search status..." />
                              <CommandList>
                                <CommandEmpty>No status found.</CommandEmpty>
                                <CommandGroup>
                                  {statusOptions.map((s) => (
                                    <CommandItem
                                      value={s.value}
                                      key={s.value}
                                      onSelect={() => {
                                        if (field.value.includes(s.value)) {
                                          form.setValue(
                                            "status",
                                            field.value.filter((v) => v !== s.value)
                                          )
                                        } else {
                                          form.setValue("status", [...field.value, s.value])
                                        }
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value.includes(s.value)
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {s.label}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
