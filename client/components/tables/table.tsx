"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const partsData = [
  {
    id: "PART001",
    name: "Brake Pads",
    type: "Braking System",
    brand: "Brembo",
    quantity: 42,
    price: "$89.99",
    status: "In Stock",
  },
  {
    id: "PART002",
    name: "Oil Filter",
    type: "Engine",
    brand: "Mobil",
    quantity: 68,
    price: "$12.50",
    status: "In Stock",
  },
  {
    id: "PART003",
    name: "Spark Plug",
    type: "Ignition",
    brand: "NGK",
    quantity: 0,
    price: "$8.75",
    status: "Out of Stock",
  },
  {
    id: "PART004",
    name: "Air Filter",
    type: "Intake",
    brand: "K&N",
    quantity: 15,
    price: "$32.99",
    status: "Low Stock",
  },
  {
    id: "PART005",
    name: "Headlight Assembly",
    type: "Lighting",
    brand: "Philips",
    quantity: 7,
    price: "$145.00",
    status: "Low Stock",
  },
  {
    id: "PART006",
    name: "Battery",
    type: "Electrical",
    brand: "Optima",
    quantity: 22,
    price: "$199.99",
    status: "In Stock",
  },
  {
    id: "PART007",
    name: "Tire Set (4)",
    type: "Wheels & Tires",
    brand: "Michelin",
    quantity: 5,
    price: "$720.00",
    status: "Low Stock",
  },
]

export default function PartsInventoryTable() {
  const totalParts = partsData.length
  const inStockParts = partsData.filter(part => part.status === "In Stock").length
  const outOfStockParts = partsData.filter(part => part.status === "Out of Stock").length

  return (
    <Table className="w-1/2">
      <TableCaption>Current vehicle parts inventory.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Part ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Part Type</TableHead>
          <TableHead>Brand</TableHead>
          <TableHead>Quantity in Stock</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {partsData.map((part) => (
          <TableRow key={part.id}>
            <TableCell className="font-medium">{part.id}</TableCell>
            <TableCell>{part.name}</TableCell>
            <TableCell>{part.type}</TableCell>
            <TableCell>{part.brand}</TableCell>
            <TableCell>{part.quantity}</TableCell>
            <TableCell className="text-right">{part.price}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                part.status === "In Stock" ? "bg-green-100 text-green-800" :
                part.status === "Out of Stock" ? "bg-red-100 text-red-800" :
                "bg-yellow-100 text-yellow-800"
              }`}>
                {part.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Parts</TableCell>
          <TableCell>{totalParts}</TableCell>
          <TableCell className="text-right">In Stock</TableCell>
          <TableCell>{inStockParts}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4}>Inventory Value</TableCell>
          <TableCell>
            {partsData.reduce((sum, part) => {
              const price = Number(part.price.replace(/[^0-9.-]+/g,""));
              return sum + (price * part.quantity);
            }, 0).toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
          </TableCell>
          <TableCell className="text-right">Out of Stock</TableCell>
          <TableCell>{outOfStockParts}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}