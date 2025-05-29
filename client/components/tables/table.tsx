'use client'
import { useEffect, useState } from "react"
import axios from "axios"
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

type Part = {
  _id: string; // from MongoDB
  name: string;
  partType: string[];
  brand: string;
  quantity: number;
  price: string;
  status: string[]; // It's an array
}


export default function PartsInventoryTable() {
  const [partsData, setPartsData] = useState<Part[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

useEffect(() => {
  const fetchParts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicleparts");
      console.log("API response:", res.data);

      if (Array.isArray(res.data.items)) {
        setPartsData(res.data.items);
      } else {
        console.error("Expected res.data.items to be an array");
        setError("Invalid data format received from API");
      }
    } catch (err: any) {
      console.error("Error fetching parts:", err);
      setError("Failed to load parts data");
    } finally {
      setLoading(false); // ✅ Important
    }
  };

  fetchParts();
}, []);



  const totalParts = partsData.length
  const inStockParts = partsData.filter(part => part.status.includes("In Stock")).length
  const outOfStockParts = partsData.filter(part => part.status.includes("Out of Stock")).length

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

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
          <TableRow key={part._id}>
            <TableCell className="font-medium">{part._id}</TableCell>
            <TableCell>{part.name}</TableCell>
            <TableCell>{part.partType?.join(', ')}</TableCell>
            <TableCell>{part.brand}</TableCell>
            <TableCell>{part.quantity}</TableCell>
            <TableCell className="text-right">{part.price}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                part.status?.[0] === "In Stock"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}>
                {part.status?.[0]}
              </span>
            </TableCell>
          </TableRow>
        ))}
</TableBody>

<TableFooter>
  <TableRow>
    <TableCell colSpan={4} className="text-left font-medium">
      Total Parts
    </TableCell>
    <TableCell className="text-center font-semibold">
      {totalParts}
    </TableCell>
    <TableCell className="text-right font-medium">In Stock</TableCell>
    <TableCell className="text-center font-semibold">
      {inStockParts}
    </TableCell>
  </TableRow>
  <TableRow>
    <TableCell colSpan={4} className="text-left font-medium">
      Inventory Value
    </TableCell>
    <TableCell className="text-center font-semibold">
      {partsData
        .reduce((sum, part) => {
          const price = parseFloat(part.price.replace(/[^0-9.-]+/g, ""));
          return sum + (isNaN(price) ? 0 : price * part.quantity);
        }, 0)
        .toLocaleString("en-US", { style: "currency", currency: "USD" })}
    </TableCell>
    <TableCell className="text-right font-medium">Out of Stock</TableCell>
    <TableCell className="text-center font-semibold">
      {outOfStockParts}
    </TableCell>
  </TableRow>
</TableFooter>
        

    </Table>
  )
}
