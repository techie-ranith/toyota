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
  _id: string;
  name: string;
  partType: string[];
  brand: string;
  quantity: number;
  price: string;
  status: string[];
}

export default function PartsInventoryTable() {
  const [partsData, setPartsData] = useState<Part[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vehicleparts");
        if (Array.isArray(res.data.items)) {
          setPartsData(res.data.items);
        } else {
          setError("Invalid data format received from API");
        }
      } catch (err: any) {
        setError("Failed to load parts data");
      } finally {
        setLoading(false);
      }
    };
    fetchParts();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><p>Loading...</p></div>
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>

  const inventoryValue = partsData.reduce((sum, part) => {
    const price = parseFloat(part.price.replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(price) ? 0 : price * part.quantity);
  }, 0);

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm border-blue-100">
      <Table className="min-w-full">
        <TableCaption className="bg-blue-50 py-2 text-blue-900">Current vehicle parts inventory</TableCaption>
        <TableHeader className="bg-blue-50">
          <TableRow className="hover:bg-blue-50">
            <TableHead className="w-[120px] text-blue-900 font-semibold">Part ID</TableHead>
            <TableHead className="text-blue-900 font-semibold">Name</TableHead>
            <TableHead className="text-blue-900 font-semibold">Type</TableHead>
            <TableHead className="text-blue-900 font-semibold">Brand</TableHead>
            <TableHead className="text-center text-blue-900 font-semibold">Qty</TableHead>
            <TableHead className="text-right text-blue-900 font-semibold">Price</TableHead>
            <TableHead className="text-center text-blue-900 font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {partsData.map((part) => (
            <TableRow key={part._id} className="hover:bg-blue-50/50">
              <TableCell className="font-medium text-blue-800">{part._id.slice(-6)}</TableCell>
              <TableCell className="text-blue-900">{part.name}</TableCell>
              <TableCell className="text-blue-800">{part.partType?.join(', ')}</TableCell>
              <TableCell className="text-blue-800">{part.brand}</TableCell>
              <TableCell className="text-center text-blue-900">{part.quantity}</TableCell>
              <TableCell className="text-right text-blue-900 font-medium">{part.price}</TableCell>
              <TableCell className="text-center">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  part.status?.[0] === "In Stock"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-rose-100 text-rose-800"
                }`}>
                  {part.status?.[0]}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-blue-50">
          <TableRow>
            <TableCell colSpan={4} className="text-blue-900 font-semibold">
              Total Parts
            </TableCell>
            <TableCell className="text-center text-blue-900 font-semibold">
              {partsData.length}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} className="text-right text-blue-900 font-semibold">
                Inventory Value
              </TableCell>
              <TableCell className="text-right text-blue-900 font-semibold">
                {inventoryValue.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}