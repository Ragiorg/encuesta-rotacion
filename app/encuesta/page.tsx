
'use client'

import { getSession, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageCircle, 
  Shield, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Users,
  BarChart3,
  User,
  Building
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function EncuestaPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession({ broadcast: false });
      if (!session) {
        router.push('/auth/signin')
        return
      }
    }
    checkSession()
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen py-8">
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">
            Encuesta de <span className="text-primary">Rotación de Personal</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Completa la encuesta a través de nuestro chatbot especializado. Tus respuestas son completamente confidenciales.
          </p>

          {/* User Info */}
          <Card className="border-blue-200 bg-blue-50 max-w-md mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-4 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{session.user?.name}</span>
                </div>
                {session.user?.organizationId && (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    <span>Organización registrada</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Info Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">15-20 min</div>
              <div className="text-sm text-muted-foreground">Tiempo estimado</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">~60 preguntas</div>
              <div className="text-sm text-muted-foreground">Cuestionario completo</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">Datos seguros</div>
              <div className="text-sm text-muted-foreground">Información protegida</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="font-semibold">Análisis inmediato</div>
              <div className="text-sm text-muted-foreground">Resultados en tiempo real</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Important Notice */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-blue-800">Antes de Comenzar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-blue-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Asegúrate de tener 15-20 minutos disponibles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Responde con honestidad para obtener mejores resultados</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Tus respuestas están asociadas a tu organización para análisis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Puedes pausar y continuar en cualquier momento</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Chatbot Container */}
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full"
        >
          <Card className="border-0 shadow-professional-lg">
            <CardContent className="p-0">
              <iframe
                src={`https://apps.abacus.ai/chatllm/?appId=f2a8afb18&hideTopBar=2&userId=${session.user?.id}&organizationId=${session.user?.organizationId || ''}&userName=${encodeURIComponent(session.user?.name || '')}`}
                className="w-full h-[800px] border-0 rounded-lg"
                title="Encuesta de Rotación de Personal - Chatbot"
                allow="microphone; camera"
                style={{ minHeight: '800px' }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Support Info */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center space-y-4"
        >
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Soporte Disponible</span>
              </div>
              <p className="text-sm text-green-600 mt-2">
                Si tienes alguna dificultad técnica o pregunta sobre la encuesta, 
                puedes contactarnos a través de la página de contacto.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
