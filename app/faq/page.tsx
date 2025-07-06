
'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { 
  HelpCircle, 
  Clock, 
  Shield, 
  Users, 
  BarChart3,
  MessageCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Sobre la Encuesta",
      icon: HelpCircle,
      questions: [
        {
          question: "¿Qué es la encuesta de rotación de personal?",
          answer: "Es una herramienta de evaluación organizacional que analiza los factores que influyen en la decisión de los empleados de permanecer o dejar la empresa. Evalúa aspectos como ambiente laboral, supervisión, políticas organizacionales y factores de higiene laboral."
        },
        {
          question: "¿Por qué es importante participar?",
          answer: "Tu participación ayuda a identificar áreas de mejora en la organización, lo que puede resultar en un mejor ambiente laboral, políticas más efectivas y mayor satisfacción para todos los empleados. Es una oportunidad de contribuir al cambio positivo."
        },
        {
          question: "¿Cuántas preguntas incluye la encuesta?",
          answer: "La encuesta incluye aproximadamente 60 preguntas estructuradas que cubren datos demográficos básicos y 21 factores de higiene laboral. Está diseñada para ser completa pero eficiente."
        },
        {
          question: "¿Qué tipo de preguntas me harán?",
          answer: "Las preguntas incluyen datos demográficos (edad, departamento, antigüedad), evaluaciones sobre salario y beneficios, ambiente laboral, calidad de supervisión, políticas organizacionales y relaciones interpersonales. Utilizamos escalas de frecuencia (Nunca, Rara vez, A veces, Frecuentemente, Siempre)."
        }
      ]
    },
    {
      title: "Tiempo y Proceso",
      icon: Clock,
      questions: [
        {
          question: "¿Cuánto tiempo toma completar la encuesta?",
          answer: "El tiempo promedio es de 15-20 minutos. Sin embargo, puedes tomarte el tiempo que necesites para reflexionar sobre cada pregunta. No hay límite de tiempo."
        },
        {
          question: "¿Puedo pausar y continuar después?",
          answer: "Sí, puedes pausar la encuesta en cualquier momento y continuar más tarde. El chatbot recordará dónde te quedaste y podrás retomar desde ese punto."
        },
        {
          question: "¿Qué pasa si tengo problemas técnicos?",
          answer: "Si experimentas dificultades técnicas, puedes contactarnos a través de la página de contacto. También puedes intentar refrescar la página o usar un navegador diferente."
        },
        {
          question: "¿Funciona en dispositivos móviles?",
          answer: "Sí, la encuesta está optimizada para funcionar en computadoras, tablets y teléfonos móviles. Recomendamos usar una conexión estable a internet para la mejor experiencia."
        }
      ]
    },
    {
      title: "Privacidad y Confidencialidad",
      icon: Shield,
      questions: [
        {
          question: "¿Mis respuestas son realmente anónimas?",
          answer: "Sí, absolutamente. No recopilamos nombres, números de empleado o cualquier información que pueda identificarte. Los datos se procesan de forma agregada y no pueden ser rastreados hasta individuos específicos."
        },
        {
          question: "¿Quién puede ver mis respuestas?",
          answer: "Solo personal autorizado de Recursos Humanos tiene acceso a los datos agregados para análisis organizacional. Ninguna respuesta individual es visible o identificable."
        },
        {
          question: "¿Qué hacen con la información recopilada?",
          answer: "Los datos se utilizan exclusivamente para análisis organizacional, identificación de tendencias de rotación, desarrollo de estrategias de retención y mejora del ambiente laboral. No se comparten con terceros externos."
        },
        {
          question: "¿Cuánto tiempo guardan mis datos?",
          answer: "Los datos se mantienen solo durante el período necesario para el análisis y desarrollo de estrategias de mejora. Después de este período, se eliminan de forma segura."
        }
      ]
    },
    {
      title: "Resultados y Seguimiento",
      icon: BarChart3,
      questions: [
        {
          question: "¿Cuándo veré los resultados?",
          answer: "Los resultados se procesan en tiempo real. El análisis organizacional completo estará disponible para el departamento de RRHH dentro de las siguientes semanas después del cierre de la encuesta."
        },
        {
          question: "¿Cómo se utilizarán los resultados?",
          answer: "Los resultados se utilizarán para desarrollar planes de acción específicos, mejorar políticas organizacionales, implementar programas de retención de talento y crear un mejor ambiente laboral."
        },
        {
          question: "¿Habrá seguimiento después de la encuesta?",
          answer: "Sí, la organización puede implementar encuestas de seguimiento para medir el progreso de las mejoras implementadas y asegurar que las acciones tomadas sean efectivas."
        },
        {
          question: "¿Recibiré feedback sobre los cambios implementados?",
          answer: "La organización típicamente comunica las acciones tomadas basadas en los resultados de la encuesta a través de canales internos de comunicación."
        }
      ]
    }
  ]

  const quickTips = [
    {
      icon: CheckCircle,
      title: "Responde con honestidad",
      description: "Tus respuestas sinceras son clave para obtener resultados útiles"
    },
    {
      icon: Clock,
      title: "Tómate tu tiempo",
      description: "No hay prisa, reflexiona sobre cada pregunta"
    },
    {
      icon: Shield,
      title: "Confía en la confidencialidad",
      description: "Tus datos están completamente protegidos"
    },
    {
      icon: Users,
      title: "Piensa en el equipo",
      description: "Tu participación beneficia a toda la organización"
    }
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
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Preguntas <span className="text-primary">Frecuentes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre la encuesta de rotación de personal y el proceso de participación.
          </p>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Consejos <span className="text-primary">Rápidos</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickTips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="text-center h-full hover:shadow-professional-lg transition-shadow duration-300">
                    <CardContent className="pt-6">
                      <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold mb-2">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-8"
        >
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + categoryIndex * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-2xl">{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16"
        >
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <CardTitle className="text-blue-800">¿No encuentras tu respuesta?</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-blue-700 mb-4">
                Si tienes una pregunta que no está cubierta en esta sección, no dudes en contactarnos. 
                Estamos aquí para ayudarte a completar la encuesta exitosamente.
              </CardDescription>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contacto"
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Contactar Soporte
                </a>
                <a
                  href="/instrucciones"
                  className="inline-flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                >
                  Ver Instrucciones Detalladas
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8"
        >
          <Card className="border-amber-200 bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-amber-700 mb-2">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Recordatorio Importante</span>
              </div>
              <p className="text-sm text-amber-600">
                La encuesta es completamente voluntaria. Si en algún momento decides no continuar, 
                puedes cerrar la ventana sin consecuencias. Tu bienestar y comodidad son prioritarios.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
