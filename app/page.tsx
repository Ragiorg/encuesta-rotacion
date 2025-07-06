'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Shield, 
  Clock, 
  BarChart3, 
  Users, 
  CheckCircle, 
  ArrowRight,
  FileText,
  Lock,
  TrendingUp,
  Target,
  User,
  Building
} from 'lucide-react'

export default function HomePage() {
  const { data: session, status } = useSession()

  // Show different content based on authentication status
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Authenticated user dashboard
  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50">
        {/* Welcome Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Bienvenido, {session.user?.name}
              </h1>
              <p className="text-xl text-gray-600">
                {session.user?.role === 'ADMIN' 
                  ? 'Panel de administración - Gestiona encuestas y analiza resultados'
                  : 'Completa tu encuesta de rotación de personal'
                }
              </p>
            </motion.div>

            {/* User Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md mx-auto mb-12"
            >
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center gap-4 text-sm text-blue-800">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{session.user?.email}</span>
                    </div>
                    {session.user?.organizationId && (
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>Organización</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Survey Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mb-4">
                      <FileText className="h-6 w-6" />
                    </div>
                    <CardTitle>Encuesta de Rotación</CardTitle>
                    <CardDescription>
                      Completa la encuesta para ayudar a mejorar el ambiente laboral
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href="/encuesta">
                        Comenzar Encuesta
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Admin Dashboard */}
              {session.user?.role === 'ADMIN' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 mb-4">
                        <BarChart3 className="h-6 w-6" />
                      </div>
                      <CardTitle>Dashboard de Análisis</CardTitle>
                      <CardDescription>
                        Visualiza resultados y métricas de las encuestas
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild className="w-full" variant="outline">
                        <Link href="/dashboard">
                          Ver Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Profile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 mb-4">
                      <User className="h-6 w-6" />
                    </div>
                    <CardTitle>Mi Perfil</CardTitle>
                    <CardDescription>
                      Gestiona tu información personal y configuración
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/profile">
                        Ver Perfil
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats for Admins */}
        {session.user?.role === 'ADMIN' && (
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="max-w-4xl mx-auto"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Resumen Rápido
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Respuestas Totales</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">-</div>
                      <p className="text-xs text-muted-foreground">
                        Encuestas completadas
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Satisfacción Promedio</CardTitle>
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">-/10</div>
                      <p className="text-xs text-muted-foreground">
                        Puntuación general
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Riesgo de Rotación</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">-%</div>
                      <p className="text-xs text-muted-foreground">
                        Empleados en riesgo
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    )
  }

  // Public landing page for non-authenticated users
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Evalúa la <span className="text-teal-300">Rotación de Personal</span> en tu Organización
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-blue-100">
              Plataforma profesional y confidencial para identificar factores de riesgo 
              y mejorar la retención de talento en tu empresa
            </p>
            
            {/* Two Main Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Employee Survey */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-teal-400 text-white mx-auto mb-4">
                      <Users className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">Soy Empleado</CardTitle>
                    <CardDescription className="text-blue-100">
                      Responde la encuesta de forma anónima y confidencial
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild size="lg" className="w-full bg-teal-500 hover:bg-teal-600 text-white">
                      <Link href="/encuesta-publica">
                        <FileText className="mr-2 h-5 w-5" />
                        Responder Encuesta
                      </Link>
                    </Button>
                    <p className="text-xs text-blue-200 mt-2 text-center">
                      No necesitas registrarte • 15-20 minutos
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Admin Access */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
                  <CardHeader>
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-blue-400 text-white mx-auto mb-4">
                      <BarChart3 className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">Soy Administrador</CardTitle>
                    <CardDescription className="text-blue-100">
                      Accede al dashboard de análisis y resultados
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button asChild size="lg" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                        <Link href="/auth/signin">
                          <Lock className="mr-2 h-5 w-5" />
                          Iniciar Sesión
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline" className="w-full border-white/30 text-white hover:bg-white hover:text-blue-600">
                        <Link href="/auth/signup">
                          Registrar Empresa
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir nuestra plataforma?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Herramientas profesionales diseñadas específicamente para recursos humanos 
              y gestión organizacional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "100% Confidencial",
                description: "Todas las respuestas están protegidas con los más altos estándares de seguridad."
              },
              {
                icon: Clock,
                title: "Rápido y Eficiente",
                description: "Completa la encuesta en solo 15-20 minutos con nuestro sistema inteligente."
              },
              {
                icon: BarChart3,
                title: "Análisis Avanzado",
                description: "Obtén insights detallados y reportes profesionales para tomar decisiones."
              },
              {
                icon: Users,
                title: "Fácil de Usar",
                description: "Interfaz intuitiva diseñada para empleados de todos los niveles."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 mx-auto mb-4">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿Listo para Mejorar la Retención en tu Empresa?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Únete a organizaciones que ya están utilizando nuestra plataforma 
              para reducir la rotación de personal y mejorar el ambiente laboral.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <Link href="/auth/signup">
                  <FileText className="mr-2 h-5 w-5" />
                  Registrarse Gratis
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Link href="/contacto">
                  Contactar Soporte
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}