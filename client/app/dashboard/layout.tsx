'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar" // Import the provider
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <SidebarProvider> {/* Wrap with SidebarProvider */}
      <div className="flex">
        <AppSidebar className={!isOpen ? "hidden" : ""} />
        <main className="flex items-center justify-center flex-1 overflow-auto">
          <div className="sticky top-0 z-10 lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="m-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}