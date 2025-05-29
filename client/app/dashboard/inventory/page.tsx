import React from 'react'
import Table from '@/components/tables/table'
import HiringTable from "@/components/tables/table"


const page = () => {
  return (
    <div>
     <h1 className="text-2xl font-bold">Vehhicle Part Management</h1>
      {/* <Card> */}
        <HiringTable />
      {/* </Card> */}
    </div>
  )
}

export default page