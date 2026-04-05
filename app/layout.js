import './globals.css'

export const metadata = {
  title: 'ATC Operations Platform',
  description: 'ATC Operations Dashboard - Powered by CaratSense',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
