"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface BarChartComponentProps {
  title: string;
  description?: string;
  chartData: { [key: string]: any }[];
  chartConfig: ChartConfig;
  dataKey: string;
  trendInfo?: string;
  subtext?: string;
  barRadius?: number;
  barColor?: string;
}

export default function BarChartComponent({
  title = "Bar Chart",
  description = "Default description",
  chartData,
  chartConfig,
  dataKey = "value",
  trendInfo = "Trending up",
  subtext = "Showing data overview",
  barRadius = 8,
  // barColor = "hsl(var(--chart-2))",
}: BarChartComponentProps) {
  const barColor = chartConfig[dataKey]?.color || "hsl(var(--chart-1))";
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar 
              dataKey={dataKey} 
              fill={barColor} 
              radius={barRadius} 
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendInfo} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          {subtext}
        </div>
      </CardFooter>
    </Card>
  )
}