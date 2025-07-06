
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  UserCheck,
  FileText,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

export default function PrivacidadPage() {
  const privacyPrinciples = [
    {
      icon: Shield,
      title: "Anonimato Completo",
      description: "Ninguna respuesta puede ser rastreada hasta una persona específica. No recopilamos información personal identificable."
    },
    {
      icon: Lock,
      title: "Datos Encriptados",
      description: "Toda la información se transmite y almacena utilizando protocolos de encriptación de nivel empresarial."
    },
    {
      icon: Eye,
      title: "Acceso Restringido",
      description: "Solo personal autorizado de RRHH tiene acceso a los datos agregados para análisis organizacional."
    },
    {
      icon: Database,
      title: "Almacenamiento Seguro",
      description: "Los datos se almacenan en servidores seguros con múltiples capas de protección y respaldos."
    }
  ]

  const dataUsage = [
    "Análisis de tendencias de rotación de personal",
    "Identificación de factores de riesgo organizacional",
    "Desarrollo de estrategias de retención de talento",
    "Mejora del ambiente y cultura laboral",
    "Reportes agregados para la dirección",
    "Benchmarking interno y mejora continua"
  ]

  const dataProtection = [
    "No se recopilan nombres, números de empleado o identificadores únicos",
    "Las direcciones IP se anonimizan automáticamente",
    "Los datos demográficos se agrupan para evitar identificación",
    "No se comparten datos con terceros externos",
    "Los datos se eliminan después del período de análisis",
    "Cumplimiento con regulaciones de protección de datos"
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
            <Shield className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Política de <span className="text-primary">Privacidad</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tu privacidad es nuestra prioridad. Conoce cómo protegemos y utilizamos la información recopilada en la encuesta de rotación de personal.
          </p>
        </motion.div>

        {/* Privacy Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Principios de <span className="text-primary">Protección</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {privacyPrinciples.map((principle, index) => {
              const Icon = principle.icon
              return (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-professional-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl">{principle.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {principle.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Data Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span>Información que Recopilamos</span>
              </CardTitle>
              <CardDescription>
                La encuesta recopila únicamente la información necesaria para el análisis organizacional.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-700">✓ Datos que SÍ recopilamos:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Datos demográficos generales (edad, género, nivel educativo)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Información laboral (departamento, posición, antigüedad)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Evaluaciones de factores de higiene laboral</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Respuestas a preguntas sobre ambiente laboral</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-red-700">✗ Datos que NO recopilamos:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Nombres completos o números de empleado</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Información de contacto personal</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Datos financieros o bancarios</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span>Información médica o de salud</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
                <span>Uso de la Información</span>
              </CardTitle>
              <CardDescription>
                Los datos recopilados se utilizan exclusivamente para los siguientes propósitos:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dataUsage.map((usage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{usage}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-6 w-6 text-primary" />
                <span>Medidas de Protección</span>
              </CardTitle>
              <CardDescription>
                Implementamos múltiples capas de seguridad para proteger tu información:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dataProtection.map((protection, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm">{protection}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rights and Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UserCheck className="h-6 w-6 text-primary" />
                <span>Tus Derechos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Derecho a la información sobre el uso de datos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Derecho a solicitar eliminación de datos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Derecho a retirar consentimiento</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">Derecho a reportar preocupaciones</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span>Contacto</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Si tienes preguntas sobre esta política de privacidad o el manejo de tus datos, puedes contactarnos:
              </p>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Departamento:</strong> Recursos Humanos
                </div>
                <div>
                  <strong>Responsable:</strong> Oficial de Privacidad
                </div>
                <div>
                  <strong>Contacto:</strong> A través de la página de contacto
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Card className="border-muted">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">
                <strong>Última actualización:</strong> Junio 2025
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Esta política puede actualizarse periódicamente para reflejar cambios en nuestras prácticas de privacidad.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
