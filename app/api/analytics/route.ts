
import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Unauthorized - Admin access required" },
        { status: 401 }
      )
    }

    // Security: Only use the organization ID from the session, ignore query params
    const organizationId = session.user.organizationId

    if (!organizationId) {
      return NextResponse.json(
        { error: "No organization associated with user" },
        { status: 400 }
      )
    }

    // Get organization info and responses
    const organization = await prisma.organization.findUnique({
      where: { id: organizationId }
    })

    const responses = await prisma.surveyResponse.findMany({
      where: {
        organizationId: organizationId
      }
    })

    if (responses.length === 0) {
      return NextResponse.json({
        organization: {
          id: organizationId,
          name: organization?.name || 'Organización Desconocida'
        },
        totalResponses: 0,
        averageScores: {},
        departmentBreakdown: [],
        riskDistribution: {},
        trends: [],
        herzbergAnalysis: {},
        advancedMetrics: {},
        recommendations: []
      })
    }

    // Calculate analytics
    const totalResponses = responses.length

    // Average scores
    const averageScores = {
      satisfaction: calculateAverage(responses, 'satisfactionScore'),
      workLifeBalance: calculateAverage(responses, 'workLifeBalance'),
      careerDevelopment: calculateAverage(responses, 'careerDevelopment'),
      managementQuality: calculateAverage(responses, 'managementQuality'),
      compensationSatisfaction: calculateAverage(responses, 'compensationSatisfaction'),
      workEnvironment: calculateAverage(responses, 'workEnvironment')
    }

    // Department breakdown
    const departmentBreakdown = groupByField(responses, 'department')

    // Risk distribution
    const riskDistribution = groupByField(responses, 'turnoverRisk')

    // Recommendation rate
    const recommendationRate = responses.filter((r: any) => r.recommendCompany === true).length / totalResponses * 100

    // Trends (last 30 days)
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const recentResponses = responses.filter((r: any) => r.completedAt >= thirtyDaysAgo)
    const trends = recentResponses.map((r: any) => ({
      date: r.completedAt.toISOString().split('T')[0],
      satisfaction: r.satisfactionScore || 0
    }))

    // HERZBERG ANALYSIS
    const herzbergAnalysis = calculateHerzbergFactors(responses)

    // ADVANCED METRICS
    const advancedMetrics = calculateAdvancedMetrics(responses)

    // RECOMMENDATIONS
    const recommendations = generateRecommendations(herzbergAnalysis, advancedMetrics, responses)

    return NextResponse.json({
      organization: {
        id: organizationId,
        name: organization?.name || 'Organización Desconocida'
      },
      totalResponses,
      averageScores,
      departmentBreakdown,
      riskDistribution,
      recommendationRate,
      trends,
      herzbergAnalysis,
      advancedMetrics,
      recommendations
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

function calculateAverage(responses: any[], field: string): number {
  const validResponses = responses.filter(r => r[field] !== null && r[field] !== undefined)
  if (validResponses.length === 0) return 0
  
  const sum = validResponses.reduce((acc, r) => acc + (r[field] || 0), 0)
  return Math.round((sum / validResponses.length) * 100) / 100
}

function groupByField(responses: any[], field: string): Array<{name: string, count: number, percentage: number}> {
  const groups: Record<string, number> = {}
  
  responses.forEach(r => {
    const value = r[field] || 'No especificado'
    groups[value] = (groups[value] || 0) + 1
  })

  const total = responses.length
  return Object.entries(groups).map(([name, count]) => ({
    name,
    count,
    percentage: Math.round((count / total) * 100)
  }))
}

// HERZBERG ANALYSIS FUNCTIONS
function calculateHerzbergFactors(responses: any[]) {
  // Factores de Higiene (Extrínsecos)
  const hygieneFactors = {
    compensation: calculateAverage(responses, 'compensationSatisfaction'),
    workEnvironment: calculateAverage(responses, 'workEnvironment'),
    managementQuality: calculateAverage(responses, 'managementQuality'),
    workLifeBalance: calculateAverage(responses, 'workLifeBalance')
  }

  // Factores Motivadores (Intrínsecos)
  const motivationFactors = {
    careerDevelopment: calculateAverage(responses, 'careerDevelopment'),
    satisfaction: calculateAverage(responses, 'satisfactionScore')
  }

  // Promedios generales
  const hygieneAverage = Object.values(hygieneFactors).reduce((a, b) => a + b, 0) / Object.values(hygieneFactors).length
  const motivationAverage = Object.values(motivationFactors).reduce((a, b) => a + b, 0) / Object.values(motivationFactors).length

  // Ratio Motivadores/Higiene
  const motivationHygieneRatio = hygieneAverage > 0 ? motivationAverage / hygieneAverage : 0

  // Análisis por departamento
  const departmentAnalysis = calculateHerzbergByDepartment(responses)

  return {
    hygieneFactors,
    motivationFactors,
    hygieneAverage: Math.round(hygieneAverage * 100) / 100,
    motivationAverage: Math.round(motivationAverage * 100) / 100,
    motivationHygieneRatio: Math.round(motivationHygieneRatio * 100) / 100,
    departmentAnalysis,
    criticalFactors: identifyCriticalFactors(hygieneFactors, motivationFactors)
  }
}

function calculateHerzbergByDepartment(responses: any[]) {
  const departments = [...new Set(responses.map(r => r.department || 'No especificado'))]
  
  return departments.map(dept => {
    const deptResponses = responses.filter(r => (r.department || 'No especificado') === dept)
    
    const hygiene = (
      calculateAverage(deptResponses, 'compensationSatisfaction') +
      calculateAverage(deptResponses, 'workEnvironment') +
      calculateAverage(deptResponses, 'managementQuality') +
      calculateAverage(deptResponses, 'workLifeBalance')
    ) / 4

    const motivation = (
      calculateAverage(deptResponses, 'careerDevelopment') +
      calculateAverage(deptResponses, 'satisfactionScore')
    ) / 2

    return {
      department: dept,
      hygieneScore: Math.round(hygiene * 100) / 100,
      motivationScore: Math.round(motivation * 100) / 100,
      employeeCount: deptResponses.length,
      riskLevel: hygiene < 6 || motivation < 6 ? 'HIGH' : hygiene < 7 || motivation < 7 ? 'MEDIUM' : 'LOW'
    }
  })
}

function identifyCriticalFactors(hygieneFactors: any, motivationFactors: any) {
  const allFactors = [
    { name: 'Compensación', value: hygieneFactors.compensation, type: 'hygiene' },
    { name: 'Ambiente Laboral', value: hygieneFactors.workEnvironment, type: 'hygiene' },
    { name: 'Calidad de Gestión', value: hygieneFactors.managementQuality, type: 'hygiene' },
    { name: 'Balance Vida-Trabajo', value: hygieneFactors.workLifeBalance, type: 'hygiene' },
    { name: 'Desarrollo Profesional', value: motivationFactors.careerDevelopment, type: 'motivation' },
    { name: 'Satisfacción General', value: motivationFactors.satisfaction, type: 'motivation' }
  ]

  return allFactors
    .filter(factor => factor.value < 7) // Factores críticos (< 7/10)
    .sort((a, b) => a.value - b.value) // Ordenar por criticidad
    .slice(0, 3) // Top 3 más críticos
}

// ADVANCED METRICS FUNCTIONS
function calculateAdvancedMetrics(responses: any[]) {
  // Análisis demográfico
  const demographicAnalysis = calculateDemographicAnalysis(responses)
  
  // Indicadores de riesgo
  const riskIndicators = calculateRiskIndicators(responses)
  
  // Análisis de impacto
  const impactAnalysis = calculateImpactAnalysis(responses)
  
  // Métricas de retención
  const retentionMetrics = calculateRetentionMetrics(responses)

  return {
    demographicAnalysis,
    riskIndicators,
    impactAnalysis,
    retentionMetrics
  }
}

function calculateDemographicAnalysis(responses: any[]) {
  // Satisfacción por rango de edad
  const ageAnalysis = groupByFieldWithAverage(responses, 'ageRange', 'satisfactionScore')
  
  // Análisis por años de experiencia
  const experienceAnalysis = groupByFieldWithAverage(responses, 'yearsInCompany', 'satisfactionScore')
  
  // Análisis por posición
  const positionAnalysis = groupByFieldWithAverage(responses, 'position', 'satisfactionScore')

  return {
    ageAnalysis,
    experienceAnalysis,
    positionAnalysis
  }
}

function calculateRiskIndicators(responses: any[]) {
  // Empleados con alta probabilidad de renuncia (score < 6)
  const highRiskEmployees = responses.filter(r => (r.satisfactionScore || 0) < 6).length
  const highRiskPercentage = Math.round((highRiskEmployees / responses.length) * 100)

  // Factores críticos por departamento
  const departmentRisks = calculateDepartmentRisks(responses)

  // Tiempo promedio de permanencia esperado
  const avgExpectedTenure = calculateAverage(responses, 'yearsInCompany')

  // Índice de compromiso organizacional (basado en recomendación)
  const engagementIndex = responses.filter(r => r.recommendCompany === true).length / responses.length * 100

  return {
    highRiskEmployees,
    highRiskPercentage,
    departmentRisks,
    avgExpectedTenure: Math.round(avgExpectedTenure * 100) / 100,
    engagementIndex: Math.round(engagementIndex * 100) / 100
  }
}

function calculateDepartmentRisks(responses: any[]) {
  const departments = [...new Set(responses.map(r => r.department || 'No especificado'))]
  
  return departments.map(dept => {
    const deptResponses = responses.filter(r => (r.department || 'No especificado') === dept)
    const highRisk = deptResponses.filter(r => (r.satisfactionScore || 0) < 6).length
    const riskPercentage = Math.round((highRisk / deptResponses.length) * 100)
    
    return {
      department: dept,
      totalEmployees: deptResponses.length,
      highRiskCount: highRisk,
      riskPercentage,
      avgSatisfaction: calculateAverage(deptResponses, 'satisfactionScore')
    }
  }).sort((a, b) => b.riskPercentage - a.riskPercentage)
}

function calculateImpactAnalysis(responses: any[]) {
  // Correlación entre factores y intención de renuncia
  const factorCorrelations = calculateFactorCorrelations(responses)
  
  // Costo estimado de rotación (estimación básica)
  const avgSalaryEstimate = 50000 // Estimación base
  const turnoverCostPerEmployee = avgSalaryEstimate * 0.75 // 75% del salario anual
  const highRiskEmployees = responses.filter(r => (r.satisfactionScore || 0) < 6).length
  const estimatedTurnoverCost = highRiskEmployees * turnoverCostPerEmployee

  return {
    factorCorrelations,
    estimatedTurnoverCost,
    highRiskEmployees,
    costPerEmployee: turnoverCostPerEmployee
  }
}

function calculateFactorCorrelations(responses: any[]) {
  const factors = [
    'compensationSatisfaction',
    'workEnvironment', 
    'managementQuality',
    'workLifeBalance',
    'careerDevelopment'
  ]

  return factors.map(factor => {
    const correlation = calculateCorrelation(responses, factor, 'satisfactionScore')
    return {
      factor,
      correlation: Math.round(correlation * 100) / 100,
      impact: Math.abs(correlation) > 0.7 ? 'HIGH' : Math.abs(correlation) > 0.4 ? 'MEDIUM' : 'LOW'
    }
  }).sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
}

function calculateCorrelation(responses: any[], field1: string, field2: string): number {
  const validResponses = responses.filter(r => 
    r[field1] !== null && r[field1] !== undefined && 
    r[field2] !== null && r[field2] !== undefined
  )
  
  if (validResponses.length < 2) return 0

  const mean1 = validResponses.reduce((sum, r) => sum + r[field1], 0) / validResponses.length
  const mean2 = validResponses.reduce((sum, r) => sum + r[field2], 0) / validResponses.length

  let numerator = 0
  let sum1Sq = 0
  let sum2Sq = 0

  validResponses.forEach(r => {
    const diff1 = r[field1] - mean1
    const diff2 = r[field2] - mean2
    numerator += diff1 * diff2
    sum1Sq += diff1 * diff1
    sum2Sq += diff2 * diff2
  })

  const denominator = Math.sqrt(sum1Sq * sum2Sq)
  return denominator === 0 ? 0 : numerator / denominator
}

function calculateRetentionMetrics(responses: any[]) {
  const totalResponses = responses.length
  const satisfiedEmployees = responses.filter(r => (r.satisfactionScore || 0) >= 7).length
  const retentionRate = Math.round((satisfiedEmployees / totalResponses) * 100)

  // Empleados que recomiendan la empresa
  const promoters = responses.filter(r => r.recommendCompany === true).length
  const promoterRate = Math.round((promoters / totalResponses) * 100)

  return {
    retentionRate,
    promoterRate,
    satisfiedEmployees,
    totalResponses
  }
}

function groupByFieldWithAverage(responses: any[], groupField: string, avgField: string) {
  const groups: Record<string, any[]> = {}
  
  responses.forEach(r => {
    const value = r[groupField] || 'No especificado'
    if (!groups[value]) groups[value] = []
    groups[value].push(r)
  })

  return Object.entries(groups).map(([name, groupResponses]) => ({
    name,
    count: groupResponses.length,
    averageScore: calculateAverage(groupResponses, avgField),
    percentage: Math.round((groupResponses.length / responses.length) * 100)
  }))
}

// RECOMMENDATIONS GENERATION
function generateRecommendations(herzbergAnalysis: any, advancedMetrics: any, responses: any[]) {
  const recommendations = []

  // Recomendaciones basadas en factores críticos de Herzberg
  herzbergAnalysis.criticalFactors.forEach((factor: any) => {
    if (factor.type === 'hygiene') {
      recommendations.push(generateHygieneRecommendation(factor))
    } else {
      recommendations.push(generateMotivationRecommendation(factor))
    }
  })

  // Recomendaciones basadas en departamentos de alto riesgo
  const highRiskDepts = advancedMetrics.riskIndicators.departmentRisks
    .filter((dept: any) => dept.riskPercentage > 30)
    .slice(0, 2)

  highRiskDepts.forEach((dept: any) => {
    recommendations.push({
      type: 'DEPARTMENT_RISK',
      priority: 'HIGH',
      title: `Intervención Urgente en ${dept.department}`,
      description: `El departamento ${dept.department} tiene un ${dept.riskPercentage}% de empleados en riesgo alto de rotación.`,
      actions: [
        'Realizar entrevistas individuales con empleados en riesgo',
        'Revisar cargas de trabajo y distribución de tareas',
        'Implementar programa de reconocimiento específico',
        'Evaluar necesidades de capacitación y desarrollo'
      ],
      expectedImpact: 'Reducción del 40-60% en riesgo de rotación',
      timeframe: '1-2 meses'
    })
  })

  // Recomendaciones basadas en correlaciones
  const strongCorrelations = advancedMetrics.impactAnalysis.factorCorrelations
    .filter((corr: any) => corr.impact === 'HIGH')
    .slice(0, 1)

  strongCorrelations.forEach((corr: any) => {
    recommendations.push(generateCorrelationRecommendation(corr))
  })

  return recommendations.slice(0, 6) // Máximo 6 recomendaciones
}

function generateHygieneRecommendation(factor: any) {
  const recommendations: Record<string, any> = {
    'Compensación': {
      type: 'HYGIENE_COMPENSATION',
      priority: 'HIGH',
      title: 'Revisión de Estructura Salarial',
      description: `La satisfacción con compensación es crítica (${factor.value}/10). Esto puede generar insatisfacción activa.`,
      actions: [
        'Realizar estudio de mercado salarial',
        'Revisar bandas salariales por posición',
        'Implementar programa de beneficios adicionales',
        'Establecer criterios transparentes para aumentos'
      ],
      expectedImpact: 'Reducción del 50-70% en insatisfacción salarial',
      timeframe: '2-3 meses'
    },
    'Ambiente Laboral': {
      type: 'HYGIENE_ENVIRONMENT',
      priority: 'MEDIUM',
      title: 'Mejora del Ambiente Físico de Trabajo',
      description: `El ambiente laboral requiere atención (${factor.value}/10). Condiciones deficientes afectan la moral.`,
      actions: [
        'Evaluar condiciones físicas del espacio de trabajo',
        'Mejorar iluminación, temperatura y ergonomía',
        'Actualizar equipos y herramientas de trabajo',
        'Crear espacios de descanso y colaboración'
      ],
      expectedImpact: 'Mejora del 30-50% en satisfacción ambiental',
      timeframe: '1-2 meses'
    },
    'Calidad de Gestión': {
      type: 'HYGIENE_MANAGEMENT',
      priority: 'HIGH',
      title: 'Programa de Desarrollo Gerencial',
      description: `La calidad de gestión es problemática (${factor.value}/10). Supervisión deficiente genera insatisfacción.`,
      actions: [
        'Capacitar gerentes en habilidades de liderazgo',
        'Implementar feedback 360° para supervisores',
        'Establecer reuniones regulares one-on-one',
        'Crear políticas claras de comunicación'
      ],
      expectedImpact: 'Mejora del 40-60% en relación empleado-supervisor',
      timeframe: '2-4 meses'
    }
  }

  return recommendations[factor.name] || {
    type: 'HYGIENE_GENERAL',
    priority: 'MEDIUM',
    title: `Mejora en ${factor.name}`,
    description: `${factor.name} requiere atención (${factor.value}/10).`,
    actions: ['Evaluar causas específicas', 'Implementar plan de mejora'],
    expectedImpact: 'Mejora general en satisfacción',
    timeframe: '1-3 meses'
  }
}

function generateMotivationRecommendation(factor: any) {
  const recommendations: Record<string, any> = {
    'Desarrollo Profesional': {
      type: 'MOTIVATION_DEVELOPMENT',
      priority: 'HIGH',
      title: 'Programa de Desarrollo de Carrera',
      description: `Las oportunidades de crecimiento son limitadas (${factor.value}/10). Esto afecta la motivación a largo plazo.`,
      actions: [
        'Crear planes de carrera individualizados',
        'Implementar programa de mentoring',
        'Ofrecer capacitaciones y certificaciones',
        'Establecer rotación de roles y proyectos especiales'
      ],
      expectedImpact: 'Aumento del 60-80% en compromiso y retención',
      timeframe: '3-6 meses'
    },
    'Satisfacción General': {
      type: 'MOTIVATION_SATISFACTION',
      priority: 'MEDIUM',
      title: 'Programa de Reconocimiento y Logros',
      description: `La satisfacción general necesita impulso (${factor.value}/10). Falta sentido de logro y reconocimiento.`,
      actions: [
        'Implementar sistema de reconocimiento peer-to-peer',
        'Celebrar logros individuales y de equipo',
        'Crear programa de empleado del mes',
        'Establecer metas claras y alcanzables'
      ],
      expectedImpact: 'Mejora del 40-60% en motivación y compromiso',
      timeframe: '1-2 meses'
    }
  }

  return recommendations[factor.name] || {
    type: 'MOTIVATION_GENERAL',
    priority: 'MEDIUM',
    title: `Mejora en ${factor.name}`,
    description: `${factor.name} requiere atención (${factor.value}/10).`,
    actions: ['Evaluar oportunidades de mejora', 'Implementar iniciativas motivacionales'],
    expectedImpact: 'Mejora en motivación y compromiso',
    timeframe: '2-4 meses'
  }
}

function generateCorrelationRecommendation(correlation: any) {
  return {
    type: 'HIGH_IMPACT',
    priority: 'CRITICAL',
    title: `Factor de Alto Impacto: ${correlation.factor}`,
    description: `${correlation.factor} tiene una correlación muy fuerte (${correlation.correlation}) con la satisfacción general.`,
    actions: [
      'Priorizar mejoras en este factor específico',
      'Asignar recursos dedicados para su optimización',
      'Monitorear progreso semanalmente',
      'Medir impacto en satisfacción general'
    ],
    expectedImpact: 'Mejora significativa en satisfacción general',
    timeframe: 'Inmediato - 1 mes'
  }
}
