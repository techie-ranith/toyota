'use client'
import { useState, useEffect } from "react"
import { Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface Part {
  _id: string
  name: string
  partType: string[]
  brand: string
  quantity: number
  price: number
  status: string[]
}

interface PartsTableProps {
  partsData: Part[]
  onEdit: (part: Part) => void
  onDelete: (id: string) => Promise<void>
  loading: boolean
  error: string | null
}

export function PartsTable({ partsData, onEdit, loading, error }: PartsTableProps) {
  const [typeFilter, setTypeFilter] = useState<string>("All")
  const [statusFilter, setStatusFilter] = useState<string>("All")

  // Debug: Check props
  useEffect(() => {
    console.log("Parts Data received:", partsData)
    console.log("Loading:", loading)
    console.log("Error:", error)
  }, [partsData, loading, error])

  if (loading) return <div className="flex justify-center items-center h-64"><p>Loading...</p></div>
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>

  if (!partsData || partsData.length === 0) {
    return (
      <div className="text-center text-blue-800 p-4">
        No parts available to display.
      </div>
    )
  }

  const allTypes = Array.from(new Set(partsData.flatMap(part => part.partType)))
  const allStatuses = Array.from(new Set(partsData.flatMap(part => part.status)))

  const filteredParts = partsData.filter(part => {
    const matchesType = typeFilter === "All" || part.partType.includes(typeFilter)
    const matchesStatus = statusFilter === "All" || part.status.includes(statusFilter)
    return matchesType && matchesStatus
  })

  console.log("Filtered Parts:", filteredParts)

  const inventoryValue = filteredParts.reduce((sum, part) => {
    const isInStock = part.status?.includes("In Stock")
    const price = part.price
    return isInStock ? sum + (isNaN(price) ? 0 : price * part.quantity) : sum
  }, 0)
  

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm border-blue-100">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 p-4 bg-blue-50">
        <div>
          <label className="block text-blue-900 font-semibold mb-1">Filter by Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-blue-200 rounded px-3 py-1"
          >
            <option value="All">All</option>
            {allTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-blue-900 font-semibold mb-1">Filter by Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-blue-200 rounded px-3 py-1"
          >
            <option value="All">All</option>
            {allStatuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <Table className="min-w-full">
        <TableCaption className="bg-blue-50 py-2 text-blue-900">Current vehicle parts inventory</TableCaption>
        <TableHeader className="bg-blue-50">
          <TableRow className="hover:bg-blue-50">
            <TableHead className="w-[120px] text-blue-900 font-semibold">Part ID</TableHead>
            <TableHead className="text-blue-900 font-semibold">Name</TableHead>
            <TableHead className="text-blue-900 font-semibold">Type</TableHead>
            <TableHead className="text-blue-900 font-semibold">Brand</TableHead>
            <TableHead className="text-center text-blue-900 font-semibold">Qty</TableHead>
            <TableHead className="text-right text-blue-900 font-semibold">Price (Rs.)</TableHead>
            <TableHead className="text-center text-blue-900 font-semibold">Status</TableHead>
            <TableHead className="text-right text-blue-900 font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredParts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-blue-800 py-6">
                No parts match the selected filters.
              </TableCell>
            </TableRow>
          ) : (
            filteredParts.map((part) => (
              <TableRow key={part._id} className="hover:bg-blue-50/50">
                <TableCell className="font-medium text-blue-800">{part._id?.slice(-6)}</TableCell>
                <TableCell className="text-blue-900">{part.name}</TableCell>
                <TableCell className="text-blue-800">{part.partType?.join(', ')}</TableCell>
                <TableCell className="text-blue-800">{part.brand}</TableCell>
                <TableCell className="text-center text-blue-900">{part.quantity}</TableCell>
                <TableCell className="text-right text-blue-900 font-medium"> Rs.{part.price}</TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    part.status?.[0] === "In Stock"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-rose-100 text-rose-800"
                  }`}>
                    {part.status?.[0]}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      console.log("Editing part:", part)
                      onEdit(part)
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
        <TableFooter className="bg-blue-50">
          <TableRow>
            <TableCell colSpan={5} className="text-blue-900 font-semibold">
              Total Parts
            </TableCell>
            <TableCell className="text-center text-blue-900 font-semibold">
              {filteredParts.length}
            </TableCell>
            <TableCell colSpan={2}></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4} className="text-right text-blue-900 font-semibold">
              Inventory Value
            </TableCell>
            <TableCell colSpan={2} className="text-right text-blue-900 font-semibold">
              {inventoryValue.toLocaleString("en-US", { style: "currency", currency: "LKR" })}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
