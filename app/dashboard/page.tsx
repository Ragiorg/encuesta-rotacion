
'use client'

import { useSession, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  Download,
  RefreshCw,
  Building,
  Target,
  ThumbsUp,
  Brain,
  Heart,
  DollarSign,
  Award,
  Clock,
  TrendingDown,
  Lightbulb,
  Shield,
  Zap,
  UserCheck,
  Calendar,
  PieChart,
  Activity
} from 'lucide-react'
import { 
  safeNumber, 
  safeString, 
  safeArray, 
  safeObject, 
  safeToFixed, 
  safePercentage,
  getDefaultAnalytics 
} from '@/lib/safe-utils'

interface Analytics {
  organization: {
    id: string
    name: string
  }
  totalResponses: number
  averageScores: {
    satisfaction: number
    workLifeBalance: number
    careerDevelopment: number
    managementQuality: number
    compensationSatisfaction: number
    workEnvironment: number
  }
  departmentBreakdown: Array<{name: string, count: number, percentage: number}>
  riskDistribution: Array<{name: string, count: number, percentage: number}>
  recommendationRate: number
  trends: Array<{date: string, satisfaction: number}>
  herzbergAnalysis: {
    hygieneFactors: {
      compensation: number
      workEnvironment: number
      managementQuality: number
      workLifeBalance: number
    }
    motivationFactors: {
      careerDevelopment: number
      satisfaction: number
    }
    hygieneAverage: number
    motivationAverage: number
    motivationHygieneRatio: number
    departmentAnalysis: Array<{
      department: string
      hygieneScore: number
      motivationScore: number
      employeeCount: number
      riskLevel: string
    }>
    criticalFactors: Array<{
      name: string
      value: number
      type: string
    }>
  }
  advancedMetrics: {
    demographicAnalysis: {
      ageAnalysis: Array<{name: string, count: number, averageScore: number, percentage: number}>
      experienceAnalysis: Array<{name: string, count: number, averageScore: number, percentage: number}>
      positionAnalysis: Array<{name: string, count: number, averageScore: number, percentage: number}>
    }
    riskIndicators: {
      highRiskEmployees: number
      highRiskPercentage: number
      avgExpectedTenure: number
      engagementIndex: number
      departmentRisks: Array<{
        department: string
        totalEmployees: number
        highRiskCount: number
        riskPercentage: number
        avgSatisfaction: number
      }>
    }
    impactAnalysis: {
      estimatedTurnoverCost: number
      highRiskEmployees: number
      costPerEmployee: number
      factorCorrelations: Array<{
        factor: string
        correlation: number
        impact: string
      }>
    }
    retentionMetrics: {
      retentionRate: number
      promoterRate: number
      satisfiedEmployees: number
      totalResponses: number
    }
  }
  recommendations: Array<{
    type: string
    priority: string
    title: string
    description: string
    actions: string[]
    expectedImpact: string
    timeframe: string
  }>
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics>(getDefaultAnalytics())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession({ broadcast: false });
      if (!session) {
        router.push('/auth/signin')
        return
      }

      if (session.user?.role !== 'ADMIN') {
        router.push('/')
        return
      }

      fetchAnalytics()
    }
    checkSession()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/analytics')
      
      if (!response.ok) {
        throw new Error('Error al cargar los datos')
      }
      
      const data = await response.json()
      
      // Aplicar valores seguros a todos los datos
      const safeData = {
        organization: safeObject(data.organization, { id: "demo", name: "Organización Demo" }),
        totalResponses: safeNumber(data.totalResponses, 0),
        averageScores: safeObject(data.averageScores, {}),
        departmentBreakdown: safeArray(data.departmentBreakdown, []),
        riskDistribution: safeArray(data.riskDistribution, []),
        recommendationRate: safeNumber(data.recommendationRate, 0),
        trends: safeArray(data.trends, []),
        herzbergAnalysis: safeObject(data.herzbergAnalysis, {}),
        advancedMetrics: safeObject(data.advancedMetrics, {}),
        recommendations: safeArray(data.recommendations, [])
      }
      
      setAnalytics(safeData as Analytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
      setError('Error al cargar los datos del dashboard')
      // Mantener datos por defecto en caso de error
      setAnalytics(getDefaultAnalytics())
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']

  // Funciones auxiliares seguras
  const getSafeScore = (score: any) => safeToFixed(score, 1)
  const getSafePercentage = (value: any, total: any) => safePercentage(value, total)
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH': return 'text-red-600 bg-red-50'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50'
      case 'LOW': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Dashboard de Análisis Avanzado
                </h1>
              </div>
              <p className="text-gray-600">
                Análisis basado en la Teoría de Herzberg - {safeString(analytics?.organization?.name, 'Organización Demo')}
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={fetchAnalytics} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </motion.div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">{error} - Mostrando datos de ejemplo</p>
          </div>
        )}

        {/* Métricas Principales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Respuestas</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{safeNumber(analytics?.totalResponses, 0)}</div>
              <p className="text-xs text-muted-foreground">Encuestas completadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfacción Promedio</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {getSafeScore(analytics?.averageScores?.satisfaction)}/10
              </div>
              <p className="text-xs text-muted-foreground">Puntuación general</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Riesgo Alto</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {safeNumber(
                   safeArray<{name: string, count: number, percentage: number}>(analytics?.riskDistribution, [])
                    .find((r: any) => r && r?.name === 'HIGH')?.percentage,
                  0
                )}%
              </div>
              <p className="text-xs text-muted-foreground">Empleados en riesgo</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recomendación</CardTitle>
              <ThumbsUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{safeNumber(analytics?.recommendationRate, 0)}%</div>
              <p className="text-xs text-muted-foreground">Recomendarían la empresa</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Análisis de Herzberg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Factores de Higiene</CardTitle>
              <Shield className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {getSafeScore(analytics?.herzbergAnalysis?.hygieneAverage)}/10
              </div>
              <p className="text-xs text-muted-foreground">Previenen insatisfacción</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Factores Motivacionales</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {getSafeScore(analytics?.herzbergAnalysis?.motivationAverage)}/10
              </div>
              <p className="text-xs text-muted-foreground">Generan satisfacción</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ratio Motivación/Higiene</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {safeToFixed(analytics?.herzbergAnalysis?.motivationHygieneRatio, 2)}
              </div>
              <p className="text-xs text-muted-foreground">Equilibrio ideal: 1.0</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs para diferentes análisis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Tabs defaultValue="departments" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="departments">Departamentos</TabsTrigger>
              <TabsTrigger value="demographics">Demografía</TabsTrigger>
              <TabsTrigger value="risk">Análisis de Riesgo</TabsTrigger>
              <TabsTrigger value="impact">Impacto</TabsTrigger>
              <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="departments" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución por Departamento</CardTitle>
                    <CardDescription>Participación de empleados por área</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {safeArray(analytics?.departmentBreakdown, []).map((dept: { name: string; count: number; percentage: number }, index) => (
                        <div key={dept.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{safeString(dept.name, 'Sin nombre')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={safeNumber(dept.percentage, 0)} className="w-20" />
                            <span className="text-sm font-semibold min-w-[40px]">{safeNumber(dept.count, 0)}</span>
                          </div>
                        </div>
                      ))}
                      {safeArray(analytics?.departmentBreakdown, []).length === 0 && (
                        <p className="text-gray-500">No hay datos de departamentos disponibles</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Análisis Herzberg por Departamento</CardTitle>
                    <CardDescription>Factores de higiene vs motivación por área</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {safeArray(analytics?.herzbergAnalysis?.departmentAnalysis, []).map((dept: { department: string; riskLevel: string; hygieneScore: number; motivationScore: number; employeeCount: number }, index) => (
                        <div key={dept.department} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{safeString(dept.department, 'Sin nombre')}</span>
                            <Badge className={getRiskColor(dept.riskLevel)}>
                              {dept.riskLevel}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-blue-600">Higiene: {getSafeScore(dept.hygieneScore)}</span>
                            </div>
                            <div>
                              <span className="text-green-600">Motivación: {getSafeScore(dept.motivationScore)}</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {safeNumber(dept.employeeCount, 0)} empleados
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Por Edad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safeArray(analytics?.advancedMetrics?.demographicAnalysis?.ageAnalysis, []).map((age: { name: string; averageScore: number; count: number }, index) => (
                        <div key={age.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{safeString(age.name, 'Sin especificar')}</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{getSafeScore(age.averageScore)}</div>
                            <div className="text-xs text-gray-500">{safeNumber(age.count, 0)} personas</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Por Experiencia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safeArray(analytics?.advancedMetrics?.demographicAnalysis?.experienceAnalysis, []).map((exp: { name: string; averageScore: number; count: number }, index) => (
                        <div key={exp.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{safeString(exp.name, 'Sin especificar')}</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{getSafeScore(exp.averageScore)}</div>
                            <div className="text-xs text-gray-500">{safeNumber(exp.count, 0)} personas</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Por Posición
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safeArray(analytics?.advancedMetrics?.demographicAnalysis?.positionAnalysis, []).map((pos: { name: string; averageScore: number; count: number }, index) => (
                        <div key={pos.name} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="font-medium">{safeString(pos.name, 'Sin especificar')}</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{getSafeScore(pos.averageScore)}</div>
                            <div className="text-xs text-gray-500">{safeNumber(pos.count, 0)} personas</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de Riesgo</CardTitle>
                    <CardDescription>Clasificación de empleados según riesgo de abandono</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {safeArray(analytics?.riskDistribution, []).map((risk: { name: string; count: number; percentage: number }, index) => (
                        <div key={risk.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: COLORS[index] }}
                            />
                            <span className="font-medium">
                              {risk.name === 'LOW' ? 'Riesgo Bajo' : 
                               risk.name === 'MEDIUM' ? 'Riesgo Medio' : 
                               risk.name === 'HIGH' ? 'Riesgo Alto' : safeString(risk.name, 'Sin especificar')}
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">{safeNumber(risk.count, 0)}</div>
                            <div className="text-sm text-gray-500">{safeNumber(risk.percentage, 0)}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Riesgo por Departamento</CardTitle>
                    <CardDescription>Departamentos con mayor riesgo de rotación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safeArray(analytics?.advancedMetrics?.riskIndicators?.departmentRisks, []).map((dept: { department: string; riskPercentage: number; totalEmployees: number; highRiskCount: number; avgSatisfaction: number }, index) => (
                        <div key={dept.department} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{safeString(dept.department, 'Sin nombre')}</span>
                            <Badge variant={dept.riskPercentage > 20 ? "destructive" : dept.riskPercentage > 10 ? "secondary" : "default"}>
                              {safeNumber(dept.riskPercentage, 0)}% riesgo
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>Total: {safeNumber(dept.totalEmployees, 0)}</div>
                            <div>En riesgo: {safeNumber(dept.highRiskCount, 0)}</div>
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Satisfacción promedio: {getSafeScore(dept.avgSatisfaction)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Métricas adicionales de riesgo */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Empleados Alto Riesgo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">
                      {safeNumber(analytics?.advancedMetrics?.riskIndicators?.highRiskEmployees, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {safeNumber(analytics?.advancedMetrics?.riskIndicators?.highRiskPercentage, 0)}% del total
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Permanencia Promedio</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {getSafeScore(analytics?.advancedMetrics?.riskIndicators?.avgExpectedTenure)} años
                    </div>
                    <p className="text-xs text-muted-foreground">Tiempo esperado</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Índice de Compromiso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {safeNumber(analytics?.advancedMetrics?.riskIndicators?.engagementIndex, 0)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Empleados comprometidos</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Tasa de Retención</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {safeNumber(analytics?.advancedMetrics?.retentionMetrics?.retentionRate, 0)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Empleados satisfechos</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Impacto Económico
                    </CardTitle>
                    <CardDescription>Costo estimado de rotación</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-600">
                          ${safeNumber(analytics?.advancedMetrics?.impactAnalysis?.estimatedTurnoverCost, 0).toLocaleString()}
                        </div>
                        <p className="text-sm text-red-700">Costo potencial de rotación</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Empleados en riesgo:</span>
                          <div className="font-bold">{safeNumber(analytics?.advancedMetrics?.impactAnalysis?.highRiskEmployees, 0)}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Costo por empleado:</span>
                          <div className="font-bold">${safeNumber(analytics?.advancedMetrics?.impactAnalysis?.costPerEmployee, 0).toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      Correlaciones de Factores
                    </CardTitle>
                    <CardDescription>Factores con mayor impacto en satisfacción</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {safeArray(analytics?.advancedMetrics?.impactAnalysis?.factorCorrelations, []).map((corr: { factor: string; correlation: number; impact: string }, index) => (
                        <div key={corr.factor} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-medium capitalize">
                              {safeString(corr.factor, 'Factor desconocido').replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <div className="text-xs text-gray-500">
                              Correlación: {safeToFixed(corr.correlation, 2)}
                            </div>
                          </div>
                          <Badge variant={
                            corr.impact === 'HIGH' ? 'destructive' : 
                            corr.impact === 'MEDIUM' ? 'secondary' : 
                            'default'
                          }>
                            {safeString(corr.impact, 'UNKNOWN')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {safeArray(analytics?.recommendations, []).map((rec: { title: string; description: string; priority: string; actions: string[]; expectedImpact: string; timeframe: string }, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          {safeString(rec.title, 'Recomendación sin título')}
                        </CardTitle>
                        <Badge className={getPriorityColor(rec.priority)}>
                          {safeString(rec.priority, 'MEDIUM')}
                        </Badge>
                      </div>
                      <CardDescription>
                        {safeString(rec.description, 'Sin descripción disponible')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">Acciones Recomendadas:</h4>
                          <ul className="space-y-2">
                            {safeArray(rec.actions, []).map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start gap-2 text-sm">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>{safeString(action, 'Acción no especificada')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="space-y-4">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <h5 className="font-semibold text-green-800 mb-1">Impacto Esperado:</h5>
                            <p className="text-sm text-green-700">
                              {safeString(rec.expectedImpact, 'Impacto no especificado')}
                            </p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <h5 className="font-semibold text-blue-800 mb-1">Tiempo Estimado:</h5>
                            <p className="text-sm text-blue-700">
                              {safeString(rec.timeframe, 'Tiempo no especificado')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {safeArray(analytics?.recommendations, []).length === 0 && (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No hay recomendaciones disponibles en este momento.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Factores Críticos de Herzberg */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Factores Críticos Identificados
              </CardTitle>
              <CardDescription>Áreas que requieren atención inmediata según el análisis de Herzberg</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {safeArray(analytics?.herzbergAnalysis?.criticalFactors, []).map((factor: { name: string; type: string; value: number }, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    factor.type === 'hygiene' ? 'border-blue-200 bg-blue-50' : 'border-green-200 bg-green-50'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-semibold ${
                        factor.type === 'hygiene' ? 'text-blue-700' : 'text-green-700'
                      }`}>
                        {safeString(factor.name, 'Factor desconocido')}
                      </h4>
                      <Badge variant="outline" className={
                        factor.type === 'hygiene' ? 'border-blue-300 text-blue-700' : 'border-green-300 text-green-700'
                      }>
                        {factor.type === 'hygiene' ? 'Higiene' : 'Motivación'}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {getSafeScore(factor.value)}/10
                    </div>
                    <p className="text-sm text-gray-600">
                      {factor.type === 'hygiene' 
                        ? 'Factor de higiene crítico - puede generar insatisfacción activa'
                        : 'Factor motivacional crítico - oportunidad de mejora en satisfacción'
                      }
                    </p>
                  </div>
                ))}
                
                {safeArray(analytics?.herzbergAnalysis?.criticalFactors, []).length === 0 && (
                  <div className="col-span-2 text-center py-8">
                    <ThumbsUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <p className="text-green-600 font-medium">¡Excelente! No se identificaron factores críticos.</p>
                    <p className="text-gray-500 text-sm">Todos los factores están en niveles aceptables.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
