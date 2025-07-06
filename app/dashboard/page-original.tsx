
'use client'

import { useSession } from 'next-auth/react'
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
  Zap
} from 'lucide-react'

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
      departmentRisks: Array<{
        department: string
        totalEmployees: number
        highRiskCount: number
        riskPercentage: number
        avgSatisfaction: number
      }>
      avgExpectedTenure: number
      engagementIndex: number
    }
    impactAnalysis: {
      factorCorrelations: Array<{
        factor: string
        correlation: number
        impact: string
      }>
      estimatedTurnoverCost: number
      highRiskEmployees: number
      costPerEmployee: number
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

const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3', '#A19AD3', '#72BF78']

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchAnalytics()
    }
  }, [session])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando análisis avanzado...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-200'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-blue-100 text-blue-800 border-blue-200'
    }
  }

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'HIGH': return 'text-red-600'
      case 'MEDIUM': return 'text-yellow-600'
      case 'LOW': return 'text-green-600'
      default: return 'text-gray-600'
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
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Dashboard Avanzado de Rotación</h1>
                  {analytics?.organization && (
                    <p className="text-lg font-semibold text-blue-600">
                      {analytics.organization.name}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-gray-600">
                Análisis basado en la Teoría de Herzberg • Factores de Higiene y Motivación
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={fetchAnalytics} variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualizar
              </Button>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="herzberg">Análisis Herzberg</TabsTrigger>
            <TabsTrigger value="advanced">Métricas Avanzadas</TabsTrigger>
            <TabsTrigger value="demographics">Demografía</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
          </TabsList>

          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Respuestas</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.totalResponses || 0}</div>
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
                    {analytics?.averageScores?.satisfaction?.toFixed(1) || '0.0'}/10
                  </div>
                  <p className="text-xs text-muted-foreground">Puntuación general</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Empleados en Riesgo</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {analytics?.advancedMetrics?.riskIndicators?.highRiskPercentage || 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {analytics?.advancedMetrics?.riskIndicators?.highRiskEmployees || 0} empleados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Costo Estimado</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${(analytics?.advancedMetrics?.impactAnalysis?.estimatedTurnoverCost || 0).toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">Costo de rotación estimado</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Puntuaciones por Categoría</CardTitle>
                  <CardDescription>Promedio de satisfacción en diferentes áreas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics && [
                      { name: 'Satisfacción General', value: analytics.averageScores.satisfaction, icon: Target },
                      { name: 'Balance Vida-Trabajo', value: analytics.averageScores.workLifeBalance, icon: Clock },
                      { name: 'Desarrollo Profesional', value: analytics.averageScores.careerDevelopment, icon: TrendingUp },
                      { name: 'Calidad de Gestión', value: analytics.averageScores.managementQuality, icon: Shield },
                      { name: 'Compensación', value: analytics.averageScores.compensationSatisfaction, icon: DollarSign },
                      { name: 'Ambiente Laboral', value: analytics.averageScores.workEnvironment, icon: Building },
                    ].map((item, index) => {
                      const Icon = item.icon
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={(item.value / 10) * 100} className="w-20" />
                            <span className="text-sm font-semibold min-w-[40px]">{item.value?.toFixed(1) || '0.0'}/10</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Riesgo</CardTitle>
                  <CardDescription>Clasificación de empleados según riesgo de abandono</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.riskDistribution?.map((risk, index) => (
                      <div key={risk.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="font-medium">
                            {risk.name === 'LOW' ? 'Riesgo Bajo' : 
                             risk.name === 'MEDIUM' ? 'Riesgo Medio' : 
                             risk.name === 'HIGH' ? 'Riesgo Alto' : risk.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{risk.count}</div>
                          <div className="text-xs text-gray-500">{risk.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* HERZBERG ANALYSIS TAB */}
          <TabsContent value="herzberg" className="space-y-6">
            {/* Herzberg Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Factores de Higiene</CardTitle>
                  <Shield className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {analytics?.herzbergAnalysis?.hygieneAverage?.toFixed(1) || '0.0'}/10
                  </div>
                  <p className="text-xs text-muted-foreground">Previenen insatisfacción</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Factores Motivadores</CardTitle>
                  <Zap className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analytics?.herzbergAnalysis?.motivationAverage?.toFixed(1) || '0.0'}/10
                  </div>
                  <p className="text-xs text-muted-foreground">Generan satisfacción</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Ratio M/H</CardTitle>
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {analytics?.herzbergAnalysis?.motivationHygieneRatio?.toFixed(2) || '0.00'}
                  </div>
                  <p className="text-xs text-muted-foreground">Equilibrio ideal: 1.0</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Factors */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    Factores de Higiene (Extrínsecos)
                  </CardTitle>
                  <CardDescription>Elementos que previenen la insatisfacción</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.herzbergAnalysis && [
                      { name: 'Compensación', value: analytics.herzbergAnalysis.hygieneFactors.compensation, icon: DollarSign },
                      { name: 'Ambiente Laboral', value: analytics.herzbergAnalysis.hygieneFactors.workEnvironment, icon: Building },
                      { name: 'Calidad de Gestión', value: analytics.herzbergAnalysis.hygieneFactors.managementQuality, icon: Shield },
                      { name: 'Balance Vida-Trabajo', value: analytics.herzbergAnalysis.hygieneFactors.workLifeBalance, icon: Clock },
                    ].map((factor, index) => {
                      const Icon = factor.icon
                      const isLow = factor.value < 6
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isLow ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <Icon className={`h-4 w-4 ${isLow ? 'text-red-600' : 'text-gray-500'}`} />
                            <span className="font-medium">{factor.name}</span>
                            {isLow && <Badge variant="destructive" className="text-xs">Crítico</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={(factor.value / 10) * 100} className="w-20" />
                            <span className={`text-sm font-semibold min-w-[40px] ${isLow ? 'text-red-600' : ''}`}>
                              {factor.value?.toFixed(1) || '0.0'}/10
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-green-600" />
                    Factores Motivadores (Intrínsecos)
                  </CardTitle>
                  <CardDescription>Elementos que generan satisfacción y compromiso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.herzbergAnalysis && [
                      { name: 'Desarrollo Profesional', value: analytics.herzbergAnalysis.motivationFactors.careerDevelopment, icon: TrendingUp },
                      { name: 'Satisfacción General', value: analytics.herzbergAnalysis.motivationFactors.satisfaction, icon: Heart },
                    ].map((factor, index) => {
                      const Icon = factor.icon
                      const isLow = factor.value < 6
                      return (
                        <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${isLow ? 'bg-red-50 border border-red-200' : 'bg-gray-50'}`}>
                          <div className="flex items-center gap-3">
                            <Icon className={`h-4 w-4 ${isLow ? 'text-red-600' : 'text-gray-500'}`} />
                            <span className="font-medium">{factor.name}</span>
                            {isLow && <Badge variant="destructive" className="text-xs">Crítico</Badge>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={(factor.value / 10) * 100} className="w-20" />
                            <span className={`text-sm font-semibold min-w-[40px] ${isLow ? 'text-red-600' : ''}`}>
                              {factor.value?.toFixed(1) || '0.0'}/10
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Análisis por Departamento</CardTitle>
                <CardDescription>Comparación de factores de Herzberg por área organizacional</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.herzbergAnalysis?.departmentAnalysis?.map((dept, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Building className="h-4 w-4 text-gray-500" />
                          <span className="font-semibold">{dept.department}</span>
                          <Badge variant="outline" className="text-xs">
                            {dept.employeeCount} empleados
                          </Badge>
                          <Badge className={`text-xs ${getRiskColor(dept.riskLevel)}`} variant="outline">
                            {dept.riskLevel === 'HIGH' ? 'Alto Riesgo' : 
                             dept.riskLevel === 'MEDIUM' ? 'Riesgo Medio' : 'Bajo Riesgo'}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Factores de Higiene</span>
                          <div className="flex items-center gap-2">
                            <Progress value={(dept.hygieneScore / 10) * 100} className="w-20" />
                            <span className="text-sm font-semibold">{dept.hygieneScore}/10</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Factores Motivadores</span>
                          <div className="flex items-center gap-2">
                            <Progress value={(dept.motivationScore / 10) * 100} className="w-20" />
                            <span className="text-sm font-semibold">{dept.motivationScore}/10</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ADVANCED METRICS TAB */}
          <TabsContent value="advanced" className="space-y-6">
            {/* Risk Indicators */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Empleados Alto Riesgo</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {analytics?.advancedMetrics?.riskIndicators?.highRiskPercentage || 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {analytics?.advancedMetrics?.riskIndicators?.highRiskEmployees || 0} empleados
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Permanencia Promedio</CardTitle>
                  <Clock className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {analytics?.advancedMetrics?.riskIndicators?.avgExpectedTenure?.toFixed(1) || '0.0'}
                  </div>
                  <p className="text-xs text-muted-foreground">años en la empresa</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Índice de Compromiso</CardTitle>
                  <Heart className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {analytics?.advancedMetrics?.riskIndicators?.engagementIndex?.toFixed(1) || '0.0'}%
                  </div>
                  <p className="text-xs text-muted-foreground">recomiendan la empresa</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Tasa de Retención</CardTitle>
                  <Award className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {analytics?.advancedMetrics?.retentionMetrics?.retentionRate || 0}%
                  </div>
                  <p className="text-xs text-muted-foreground">empleados satisfechos</p>
                </CardContent>
              </Card>
            </div>

            {/* Department Risks */}
            <Card>
              <CardHeader>
                <CardTitle>Riesgo por Departamento</CardTitle>
                <CardDescription>Departamentos ordenados por nivel de riesgo de rotación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.advancedMetrics?.riskIndicators?.departmentRisks?.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">{dept.department}</span>
                        <Badge variant="outline" className="text-xs">
                          {dept.totalEmployees} empleados
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-red-600">
                            {dept.highRiskCount} en riesgo
                          </div>
                          <div className="text-xs text-gray-500">
                            Satisfacción: {dept.avgSatisfaction?.toFixed(1) || '0.0'}/10
                          </div>
                        </div>
                        <div className={`text-lg font-bold ${dept.riskPercentage > 50 ? 'text-red-600' : dept.riskPercentage > 30 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {dept.riskPercentage}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Factor Correlations */}
            <Card>
              <CardHeader>
                <CardTitle>Correlaciones de Factores</CardTitle>
                <CardDescription>Factores con mayor impacto en la satisfacción general</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics?.advancedMetrics?.impactAnalysis?.factorCorrelations?.map((corr, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">
                          {corr.factor === 'compensationSatisfaction' ? 'Compensación' :
                           corr.factor === 'workEnvironment' ? 'Ambiente Laboral' :
                           corr.factor === 'managementQuality' ? 'Calidad de Gestión' :
                           corr.factor === 'workLifeBalance' ? 'Balance Vida-Trabajo' :
                           corr.factor === 'careerDevelopment' ? 'Desarrollo Profesional' : corr.factor}
                        </span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            corr.impact === 'HIGH' ? 'border-red-200 text-red-800' :
                            corr.impact === 'MEDIUM' ? 'border-yellow-200 text-yellow-800' :
                            'border-green-200 text-green-800'
                          }`}
                        >
                          {corr.impact === 'HIGH' ? 'Alto Impacto' :
                           corr.impact === 'MEDIUM' ? 'Impacto Medio' : 'Bajo Impacto'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {corr.correlation > 0 ? '+' : ''}{corr.correlation?.toFixed(2) || '0.00'}
                        </div>
                        <div className="text-xs text-gray-500">correlación</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DEMOGRAPHICS TAB */}
          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Age Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Análisis por Edad</CardTitle>
                  <CardDescription>Satisfacción por rango de edad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics?.advancedMetrics?.demographicAnalysis?.ageAnalysis?.map((age, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{age.name}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">{age.averageScore?.toFixed(1) || '0.0'}/10</div>
                          <div className="text-xs text-gray-500">{age.count} empleados</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Análisis por Experiencia</CardTitle>
                  <CardDescription>Satisfacción por años en la empresa</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics?.advancedMetrics?.demographicAnalysis?.experienceAnalysis?.map((exp, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{exp.name} años</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">{exp.averageScore?.toFixed(1) || '0.0'}/10</div>
                          <div className="text-xs text-gray-500">{exp.count} empleados</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Position Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle>Análisis por Posición</CardTitle>
                  <CardDescription>Satisfacción por nivel jerárquico</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics?.advancedMetrics?.demographicAnalysis?.positionAnalysis?.map((pos, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{pos.name}</span>
                        <div className="text-right">
                          <div className="text-sm font-bold">{pos.averageScore?.toFixed(1) || '0.0'}/10</div>
                          <div className="text-xs text-gray-500">{pos.count} empleados</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* RECOMMENDATIONS TAB */}
          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Recomendaciones Basadas en Herzberg
                </CardTitle>
                <CardDescription>
                  Acciones prioritarias para mejorar la retención y satisfacción del personal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analytics?.recommendations?.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="border rounded-lg p-6 bg-white shadow-sm"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            {rec.type.includes('HYGIENE') && <Shield className="h-5 w-5 text-blue-600" />}
                            {rec.type.includes('MOTIVATION') && <Zap className="h-5 w-5 text-green-600" />}
                            {rec.type === 'DEPARTMENT_RISK' && <Building className="h-5 w-5 text-orange-600" />}
                            {rec.type === 'HIGH_IMPACT' && <TrendingUp className="h-5 w-5 text-red-600" />}
                            <h3 className="text-lg font-semibold">{rec.title}</h3>
                          </div>
                        </div>
                        <Badge className={`${getPriorityColor(rec.priority)} border`}>
                          {rec.priority === 'CRITICAL' ? 'Crítico' :
                           rec.priority === 'HIGH' ? 'Alto' :
                           rec.priority === 'MEDIUM' ? 'Medio' : 'Bajo'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{rec.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2 text-sm">Acciones Recomendadas:</h4>
                          <ul className="space-y-1">
                            {rec.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="text-sm text-gray-600 flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-600" />
                            <span className="text-sm font-medium">Impacto Esperado:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{rec.expectedImpact}</p>
                          
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span className="text-sm font-medium">Tiempo de Implementación:</span>
                          </div>
                          <p className="text-sm text-gray-600 ml-6">{rec.timeframe}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {(!analytics?.recommendations || analytics.recommendations.length === 0) && (
                    <div className="text-center py-12 text-gray-500">
                      <Lightbulb className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No hay recomendaciones disponibles en este momento.</p>
                      <p className="text-sm">Asegúrate de tener suficientes respuestas de encuestas.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
