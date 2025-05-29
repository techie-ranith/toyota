"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import {
  Form,
  FormControl,
  FormDescription,
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

const formSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  partType: z.string().min(1),
  brand: z.string().min(1),
  quantityInStock: z.number(),
  price: z.string().min(1),
  status: z.string().min(1),
})

export default function MyForm() {
  const partType = [
    { label: "Battery", value: "battery" },
    { label: "Tire", value: "tire" },
    { label: "Oil Filter", value: "oil_filter" },
  ] as const

  const statusOptions = [
    { label: "In Stock", value: "in_stock" },
    { label: "Out of Stock", value: "out_of_stock" },
  ] as const

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values)
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      )
    } catch (error) {
      console.error("Form submission error", error)
      toast.error("Failed to submit the form. Please try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4">
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Item ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

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

        <FormField
          control={form.control}
          name="partType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Part Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                      {field.value ? partType.find((pt) => pt.value === field.value)?.label : "Select part type"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search part..." />
                    <CommandList>
                      <CommandEmpty>No part type found.</CommandEmpty>
                      <CommandGroup>
                        {partType.map((pt) => (
                          <CommandItem
                            value={pt.label}
                            key={pt.value}
                            onSelect={() => form.setValue("partType", pt.value)}
                          >
                            <Check className={cn("mr-2 h-4 w-4", pt.value === field.value ? "opacity-100" : "opacity-0")} />
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

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 99.99" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}>
                      {field.value ? statusOptions.find((s) => s.value === field.value)?.label : "Select status"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandList>
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        {statusOptions.map((s) => (
                          <CommandItem
                            value={s.label}
                            key={s.value}
                            onSelect={() => form.setValue("status", s.value)}
                          >
                            <Check className={cn("mr-2 h-4 w-4", s.value === field.value ? "opacity-100" : "opacity-0")} />
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
