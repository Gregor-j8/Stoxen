'use client'
import React from "react"
import "./globals.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
              {children}
          </QueryClientProvider>
        </React.StrictMode>
      </body>
    </html>
  )
}