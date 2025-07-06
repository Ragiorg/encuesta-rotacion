
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Clock, 
  MessageCircle, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight,
  Users,
  FileText,
  Shield,
  Lightbulb,
  Target,
  BarChart3
} from 'lucide-react'

export default function InstruccionesPage() {
  const steps = [
    {
      number: "01",
      title: "Accede al Chatbot",
      description: "Haz clic en 'Comenzar Encuesta' para acceder al chatbot especializado.",
      icon: MessageCircle
    },
    {
      number: "02", 
      title: "Datos Demográficos",
      description: "Proporciona información básica como edad, departamento, antigüedad y posición.",
      icon: Users
    },
    {
      number: "03",
      title: "Factores de Higiene",
      description: "Responde 21 preguntas sobre salario, ambiente, supervisión y políticas organizacionales.",
      icon: BarChart3
    },
    {
      number: "04",
      title: "Finalización",
      description: "Revisa tus respuestas y confirma el envío. Recibirás confirmación inmediata.",
      icon: CheckCircle
    }
  ]

  const tips = [
    {
      icon: Target,
      title: "Sé Honesto",
      description: "Responde con sinceridad para obtener resultados precisos que beneficien a toda la organización."
    },
    {
      icon: Clock,
      title: "Tómate tu Tiempo",
      description: "No hay prisa. Reflexiona sobre cada pregunta antes de responder."
    },
    {
      icon: Shield,
      title: "Confidencialidad",
      description: "Tus respuestas son completamente anónimas y no pueden ser rastreadas hasta ti."
    },
    {
      icon: Lightbulb,
      title: "Piensa en el Presente",
      description: "Enfócate en tu experiencia actual en la organización, no en experiencias pasadas."
    }
  ]

  const expectations = [
    "Preguntas sobre datos demográficos básicos",
    "Evaluación de factores salariales y beneficios",
    "Análisis del ambiente y cultura laboral",
    "Evaluación de la supervisión y liderazgo",
    "Revisión de políticas organizacionales",
    "Análisis de relaciones interpersonales",
    "Oportunidades de desarrollo profesional"
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
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Instrucciones para la <span className="text-primary">Encuesta</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sigue esta guía paso a paso para completar exitosamente la encuesta de rotación de personal y contribuir al mejoramiento de tu ambiente laboral.
          </p>
        </motion.div>

        {/* Time and Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="text-center">
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Tiempo Estimado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">15-20</div>
              <CardDescription>minutos promedio</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Total de Preguntas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">~60</div>
              <CardDescription>preguntas estructuradas</CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle>Confidencialidad</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <CardDescription>anónima y segura</CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Proceso Paso a <span className="text-primary">Paso</span>
          </h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-6"
                >
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <Card className="h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <Icon className="h-6 w-6 text-primary" />
                          <CardTitle className="text-xl">{step.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* What to Expect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            Qué <span className="text-primary">Esperar</span>
          </h2>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <span>Áreas de Evaluación</span>
              </CardTitle>
              <CardDescription>
                La encuesta cubrirá los siguientes aspectos de tu experiencia laboral:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expectations.map((expectation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{expectation}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Consejos para <span className="text-primary">Responder</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-professional-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle>{tip.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{tip.description}</CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-16"
        >
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-6 w-6 text-amber-600" />
                <CardTitle className="text-amber-800">Nota Importante</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-amber-700">
                Esta encuesta es completamente voluntaria y anónima. No hay respuestas correctas o incorrectas. 
                Tu participación honesta ayudará a mejorar el ambiente laboral para todos. Los datos se utilizarán 
                únicamente para análisis organizacional y mejora continua.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center space-y-6"
        >
          <h3 className="text-2xl font-bold">¿Listo para Comenzar?</h3>
          <p className="text-muted-foreground">
            Ahora que conoces el proceso, puedes proceder con confianza a completar la encuesta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gradient-bg-1 hover:opacity-90 transition-opacity">
              <Link href="/encuesta" className="flex items-center space-x-2">
                <span>Comenzar Encuesta</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/faq">
                Ver Preguntas Frecuentes
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
