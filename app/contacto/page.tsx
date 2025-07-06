
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    departamento: '',
    tipoConsulta: '',
    mensaje: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prepare mailto link
    const subject = `Consulta sobre Encuesta de Rotación - ${formData.tipoConsulta}`
    const body = `
Nombre: ${formData.nombre}
Email: ${formData.email}
Departamento: ${formData.departamento}
Tipo de Consulta: ${formData.tipoConsulta}

Mensaje:
${formData.mensaje}

---
Enviado desde el formulario de contacto de la Encuesta de Rotación de Personal
    `.trim()

    const mailtoLink = `mailto:rrhh@empresa.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.location.href = mailtoLink
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const contactInfo = [
    {
      icon: Users,
      title: "Departamento de RRHH",
      description: "Equipo especializado en gestión de talento y ambiente laboral",
      details: "Disponible para consultas sobre la encuesta"
    },
    {
      icon: Clock,
      title: "Horario de Atención",
      description: "Lunes a Viernes: 8:00 AM - 6:00 PM",
      details: "Respuesta típica en 24-48 horas"
    },
    {
      icon: Mail,
      title: "Soporte por Email",
      description: "rrhh@empresa.com",
      details: "Para consultas técnicas y generales"
    }
  ]

  const consultaTypes = [
    "Problemas técnicos con la encuesta",
    "Preguntas sobre privacidad y confidencialidad",
    "Dudas sobre el proceso de la encuesta",
    "Consultas sobre los resultados",
    "Sugerencias de mejora",
    "Otro"
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 mb-16"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary text-primary-foreground mx-auto">
            <Phone className="h-8 w-8" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold">
            Contacto y <span className="text-primary">Soporte</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ¿Tienes preguntas sobre la encuesta de rotación de personal? Nuestro equipo de RRHH está aquí para ayudarte.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Enviar Consulta</span>
                </CardTitle>
                <CardDescription>
                  Completa el formulario y te contactaremos a la brevedad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre Completo</Label>
                      <Input
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                        placeholder="Tu nombre completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Corporativo</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="tu.email@empresa.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="departamento">Departamento</Label>
                    <Input
                      id="departamento"
                      value={formData.departamento}
                      onChange={(e) => handleInputChange('departamento', e.target.value)}
                      placeholder="Tu departamento o área"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipoConsulta">Tipo de Consulta</Label>
                    <Select onValueChange={(value) => handleInputChange('tipoConsulta', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el tipo de consulta" />
                      </SelectTrigger>
                      <SelectContent>
                        {consultaTypes.map((tipo) => (
                          <SelectItem key={tipo} value={tipo}>
                            {tipo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje">Mensaje</Label>
                    <Textarea
                      id="mensaje"
                      value={formData.mensaje}
                      onChange={(e) => handleInputChange('mensaje', e.target.value)}
                      placeholder="Describe tu consulta o problema en detalle..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full gradient-bg-1 hover:opacity-90 transition-opacity">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Consulta
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6"
            >
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-blue-700 mb-2">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Privacidad Garantizada</span>
                  </div>
                  <p className="text-sm text-blue-600">
                    Tu información de contacto se utiliza únicamente para responder a tu consulta. 
                    No se comparte con terceros y se maneja con la misma confidencialidad que la encuesta.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Información de <span className="text-primary">Contacto</span>
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="hover:shadow-professional-lg transition-shadow duration-300">
                        <CardContent className="pt-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                              <Icon className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg mb-1">{info.title}</h3>
                              <p className="text-muted-foreground mb-2">{info.description}</p>
                              <p className="text-sm text-muted-foreground">{info.details}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* FAQ Reference */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-green-800">Antes de Contactarnos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-green-700 mb-4">
                    Muchas preguntas comunes ya están respondidas en nuestra sección de FAQ. 
                    Te recomendamos revisarla primero para obtener respuestas inmediatas.
                  </CardDescription>
                  <Button asChild variant="outline" className="border-green-600 text-green-600 hover:bg-green-100">
                    <a href="/faq">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Ver Preguntas Frecuentes
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 text-amber-700 mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span className="font-medium">Problemas Urgentes</span>
                  </div>
                  <p className="text-sm text-amber-600 mb-3">
                    Si experimentas problemas técnicos críticos que impiden completar la encuesta, 
                    puedes contactar directamente al departamento de IT.
                  </p>
                  <p className="text-sm text-amber-600">
                    <strong>IT Support:</strong> soporte.tecnico@empresa.com
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
