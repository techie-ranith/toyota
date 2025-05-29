'use client'
import { useEffect, useState } from "react"
import { toast } from "sonner"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { PartsTable } from "@/components/tables/PartTable"
import { PartForm } from "@/components/forms/partForm"

export default function VehiclePartsPage() {
  const [partsData, setPartsData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentPart, setCurrentPart] = useState<any>(null)

  const fetchParts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vehicleparts")
      if (Array.isArray(res.data.items)) {
        setPartsData(res.data.items)
      } else {
        setError("Invalid data format")
      }
    } catch (err) {
      setError("Failed to load parts")
      toast.error("Failed to load parts")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchParts()
  }, [])

  const handleEdit = (part: any) => {
    setCurrentPart(part)
    setIsDialogOpen(true)
  }

  const handleAddNew = () => {
    setCurrentPart(null)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (values: any) => {
    try {
      if (values._id) {
        // Update existing part
        await axios.put(`http://localhost:5000/api/vehicleparts/${values._id}`, values)
        toast.success("Part updated successfully!")
      } else {
        // Create new part
        await axios.post("http://localhost:5000/api/vehicleparts", values)
        toast.success("Part created successfully!")
      }
      
      await fetchParts()
      setIsDialogOpen(false)
    } catch (error) {
      console.error("Error:", error)
      toast.error("Operation failed")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/vehicleparts/${id}`)
      toast.success("Part deleted successfully!")
      await fetchParts()
    } catch (error) {
      console.error("Error:", error)
      toast.error("Failed to delete part")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-900">Vehicle Parts Inventory</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>Add Vehicle Part</Button>
          </DialogTrigger>
          <PartForm 
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onSubmit={handleSubmit}
            initialValues={currentPart}
          />
        </Dialog>
      </div>

      <PartsTable 
        partsData={partsData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
        error={error}
      />
    </div>
  )
}