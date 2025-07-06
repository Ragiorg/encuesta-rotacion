
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  MessageSquare, 
  Shield, 
  Clock, 
  CheckCircle,
  Users,
  BarChart3,
  ArrowRight
} from 'lucide-react'

export default function EncuestaPublica() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
      {/* Header Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Encuesta de Rotación de Personal
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tu opinión es importante. Ayúdanos a mejorar el ambiente laboral 
              respondiendo esta encuesta confidencial.
            </p>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-8"
          >
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <MessageSquare className="h-5 w-5" />
                  Instrucciones
                </CardTitle>
              </CardHeader>
              <CardContent className="text-blue-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Selecciona tu Organización</h4>
                      <p className="text-sm">El chatbot te preguntará a qué empresa perteneces</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Responde Honestamente</h4>
                      <p className="text-sm">Todas las respuestas son anónimas y confidenciales</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200 text-blue-800 font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Tiempo Estimado</h4>
                      <p className="text-sm">La encuesta toma aproximadamente 15-20 minutos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8"
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 mx-auto mb-2">
                  <Shield className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">100% Confidencial</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Tus respuestas son completamente anónimas y seguras
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mx-auto mb-2">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Rápido y Fácil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Interfaz conversacional intuitiva y amigable
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mx-auto mb-2">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">Impacto Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Tu feedback ayuda a mejorar el ambiente laboral
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto"
          >
            <Card className="border-2 border-blue-200 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-2 text-center justify-center">
                  <MessageSquare className="h-5 w-5" />
                  Asistente de Encuesta Inteligente
                </CardTitle>
                <CardDescription className="text-blue-100 text-center">
                  Responde las preguntas de forma conversacional con nuestro chatbot especializado
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <iframe
                    src="https://apps.abacus.ai/chatllm/?appId=f2a8afb18&hideTopBar=2"
                    className="w-full border-0 rounded-b-lg"
                    style={{ minHeight: '800px' }}
                    title="Encuesta de Rotación de Personal"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-8 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Encuesta Segura y Confidencial</span>
            </div>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto">
              Esta encuesta cumple con los más altos estándares de privacidad y seguridad. 
              Ninguna respuesta puede ser rastreada hasta un individuo específico.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
