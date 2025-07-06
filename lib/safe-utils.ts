
// Utilidades para manejo seguro de datos y prevención de errores JavaScript

export function safeNumber(value: any, defaultValue: number = 0): number {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return defaultValue;
  }
  return Number(value);
}

export function safeString(value: any, defaultValue: string = ''): string {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  return String(value);
}

export function safeArray<T>(value: any, defaultValue: T[] = []): T[] {
  if (!Array.isArray(value)) {
    return defaultValue;
  }
  return value;
}

export function safeObject(value: any, defaultValue: any = {}): any {
  if (value === null || value === undefined || typeof value !== 'object') {
    return defaultValue;
  }
  return value;
}

export function safeToFixed(value: any, decimals: number = 1): string {
  const num = safeNumber(value, 0);
  return num.toFixed(decimals);
}

export function safePercentage(value: any, total: any): number {
  const numValue = safeNumber(value, 0);
  const numTotal = safeNumber(total, 1);
  if (numTotal === 0) return 0;
  return Math.round((numValue / numTotal) * 100);
}

export function getDefaultAnalytics() {
  return {
    organization: {
      id: "demo",
      name: "Organización Demo"
    },
    totalResponses: 150,
    averageScores: {
      satisfaction: 7.2,
      workLifeBalance: 6.8,
      careerDevelopment: 6.5,
      managementQuality: 7.0,
      compensationSatisfaction: 6.3,
      workEnvironment: 7.5
    },
    departmentBreakdown: [
      { name: "Tecnología", count: 45, percentage: 30 },
      { name: "Ventas", count: 30, percentage: 20 },
      { name: "Marketing", count: 25, percentage: 17 },
      { name: "RRHH", count: 20, percentage: 13 },
      { name: "Finanzas", count: 15, percentage: 10 },
      { name: "Operaciones", count: 15, percentage: 10 }
    ],
    riskDistribution: [
      { name: "LOW", count: 90, percentage: 60 },
      { name: "MEDIUM", count: 45, percentage: 30 },
      { name: "HIGH", count: 15, percentage: 10 }
    ],
    recommendationRate: 75,
    trends: [
      { date: "2024-01", satisfaction: 6.8 },
      { date: "2024-02", satisfaction: 7.0 },
      { date: "2024-03", satisfaction: 7.2 }
    ],
    herzbergAnalysis: {
      hygieneFactors: {
        compensation: 6.3,
        workEnvironment: 7.5,
        managementQuality: 7.0,
        workLifeBalance: 6.8
      },
      motivationFactors: {
        careerDevelopment: 6.5,
        satisfaction: 7.2
      },
      hygieneAverage: 6.9,
      motivationAverage: 6.85,
      motivationHygieneRatio: 0.99,
      departmentAnalysis: [
        { department: "Tecnología", hygieneScore: 7.1, motivationScore: 7.3, employeeCount: 45, riskLevel: "LOW" },
        { department: "Ventas", hygieneScore: 6.5, motivationScore: 6.8, employeeCount: 30, riskLevel: "MEDIUM" },
        { department: "Marketing", hygieneScore: 7.0, motivationScore: 6.9, employeeCount: 25, riskLevel: "LOW" }
      ],
      criticalFactors: [
        { name: "Compensación", value: 6.3, type: "hygiene" },
        { name: "Desarrollo Profesional", value: 6.5, type: "motivation" }
      ]
    },
    advancedMetrics: {
      demographicAnalysis: {
        ageAnalysis: [
          { name: "18-25", count: 30, averageScore: 6.8, percentage: 20 },
          { name: "26-35", count: 60, averageScore: 7.1, percentage: 40 },
          { name: "36-45", count: 45, averageScore: 7.3, percentage: 30 },
          { name: "46+", count: 15, averageScore: 7.0, percentage: 10 }
        ],
        experienceAnalysis: [
          { name: "0-1 años", count: 25, averageScore: 6.5, percentage: 17 },
          { name: "2-5 años", count: 50, averageScore: 7.0, percentage: 33 },
          { name: "6-10 años", count: 45, averageScore: 7.4, percentage: 30 },
          { name: "10+ años", count: 30, averageScore: 7.2, percentage: 20 }
        ],
        positionAnalysis: [
          { name: "Junior", count: 60, averageScore: 6.8, percentage: 40 },
          { name: "Senior", count: 60, averageScore: 7.2, percentage: 40 },
          { name: "Lead/Manager", count: 30, averageScore: 7.5, percentage: 20 }
        ]
      },
      riskIndicators: {
        highRiskEmployees: 15,
        highRiskPercentage: 10,
        avgExpectedTenure: 4.2,
        engagementIndex: 75,
        departmentRisks: [
          { department: "Ventas", totalEmployees: 30, highRiskCount: 6, riskPercentage: 20, avgSatisfaction: 6.5 },
          { department: "Tecnología", totalEmployees: 45, highRiskCount: 5, riskPercentage: 11, avgSatisfaction: 7.1 }
        ]
      },
      impactAnalysis: {
        estimatedTurnoverCost: 562500,
        highRiskEmployees: 15,
        costPerEmployee: 37500,
        factorCorrelations: [
          { factor: "managementQuality", correlation: 0.85, impact: "HIGH" },
          { factor: "careerDevelopment", correlation: 0.78, impact: "HIGH" },
          { factor: "compensationSatisfaction", correlation: 0.65, impact: "MEDIUM" }
        ]
      },
      retentionMetrics: {
        retentionRate: 85,
        promoterRate: 75,
        satisfiedEmployees: 128,
        totalResponses: 150
      }
    },
    recommendations: [
      {
        type: "HYGIENE_COMPENSATION",
        priority: "HIGH",
        title: "Revisión de Estructura Salarial",
        description: "La satisfacción con compensación es crítica (6.3/10). Esto puede generar insatisfacción activa.",
        actions: [
          "Realizar estudio de mercado salarial",
          "Revisar bandas salariales por posición",
          "Implementar programa de beneficios adicionales",
          "Establecer criterios transparentes para aumentos"
        ],
        expectedImpact: "Reducción del 50-70% en insatisfacción salarial",
        timeframe: "2-3 meses"
      },
      {
        type: "MOTIVATION_DEVELOPMENT",
        priority: "HIGH",
        title: "Programa de Desarrollo de Carrera",
        description: "Las oportunidades de crecimiento son limitadas (6.5/10). Esto afecta la motivación a largo plazo.",
        actions: [
          "Crear planes de carrera individualizados",
          "Implementar programa de mentoring",
          "Ofrecer capacitaciones y certificaciones",
          "Establecer rotación de roles y proyectos especiales"
        ],
        expectedImpact: "Aumento del 60-80% en compromiso y retención",
        timeframe: "3-6 meses"
      }
    ]
  };
}
