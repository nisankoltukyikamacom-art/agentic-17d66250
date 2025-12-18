import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Coding Hub - Tüm Vibe Coding Araçları',
  description: 'Tüm AI kod yazma araçlarına tek platformdan erişin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
