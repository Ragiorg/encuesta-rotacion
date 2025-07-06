
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Encuesta de Rotación de Personal - Sistema de Evaluación Organizacional',
  description: 'Plataforma profesional para evaluar factores de rotación de personal y mejorar el ambiente laboral en su organización.',
  keywords: 'rotación personal, encuesta laboral, recursos humanos, ambiente laboral, evaluación organizacional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
