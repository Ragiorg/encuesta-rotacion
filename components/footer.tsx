
import Link from 'next/link'
import { Users, Mail, Shield, HelpCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Users className="h-5 w-5" />
              </div>
              <span className="font-bold text-lg">Encuesta Rotación</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Plataforma profesional para evaluar factores de rotación de personal y mejorar el ambiente laboral organizacional.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navegación</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/instrucciones" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instrucciones
                </Link>
              </li>
              <li>
                <Link href="/encuesta" className="text-muted-foreground hover:text-foreground transition-colors">
                  Realizar Encuesta
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
                  <HelpCircle className="h-4 w-4" />
                  <span>Preguntas Frecuentes</span>
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Contacto</span>
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>Privacidad</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Información Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Confidencialidad Garantizada
                </span>
              </li>
              <li>
                <span className="text-muted-foreground">
                  Datos Protegidos
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Sistema de Encuesta de Rotación de Personal. Todos los derechos reservados.</p>
          <p className="mt-1">Diseñado para mejorar el ambiente laboral y reducir la rotación de personal.</p>
        </div>
      </div>
    </footer>
  )
}
