import React from 'react'
import BarChart from '@/components/chats/barChart'

const page = () => {
  return (
    <div>
                <BarChart
        title="Applicants per Day"
        description="January - June 2024"
        chartData={[
            { month: "January", visitors: 186 },
            { month: "February", visitors: 305 },
            { month: "January", visitors: 186 },
            { month: "February", visitors: 305 },
            { month: "March", visitors: 400 },
            { month: "April", visitors: 450 },
            { month: "May", visitors: 500 },
            { month: "June", visitors: 600 },
            // ... more data
        ]}
        chartConfig={{
            visitors: {
            label: "Visitors",
            color: "hsl(var(--chart-2))",
            }
        }}
        dataKey="visitors"
        />
    </div>
  )
}

export default page