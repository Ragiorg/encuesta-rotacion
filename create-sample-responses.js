const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createSampleResponses() {
  try {
    // Obtener la organización demo
    const organization = await prisma.organization.findFirst({
      where: { name: 'Organización Demo' }
    })

    if (!organization) {
      console.error('No se encontró la organización demo')
      return
    }

    console.log('Creando respuestas de muestra para:', organization.name)

    // Función para generar respuestas JSON
    const generateResponses = (scores) => ({
      satisfactionScore: scores.satisfactionScore,
      workLifeBalance: scores.workLifeBalance,
      careerDevelopment: scores.careerDevelopment,
      managementQuality: scores.managementQuality,
      compensationSatisfaction: scores.compensationSatisfaction,
      workEnvironment: scores.workEnvironment,
      recommendCompany: scores.recommendCompany,
      department: scores.department,
      position: scores.position,
      ageRange: scores.ageRange,
      yearsInCompany: scores.yearsInCompany
    })

    const createResponseData = (dept, position, ageRange, yearsInCompany, scoreRanges) => {
      const scores = {
        satisfactionScore: Math.floor(Math.random() * (scoreRanges.satisfaction[1] - scoreRanges.satisfaction[0] + 1)) + scoreRanges.satisfaction[0],
        workLifeBalance: Math.floor(Math.random() * (scoreRanges.workLife[1] - scoreRanges.workLife[0] + 1)) + scoreRanges.workLife[0],
        careerDevelopment: Math.floor(Math.random() * (scoreRanges.career[1] - scoreRanges.career[0] + 1)) + scoreRanges.career[0],
        managementQuality: Math.floor(Math.random() * (scoreRanges.management[1] - scoreRanges.management[0] + 1)) + scoreRanges.management[0],
        compensationSatisfaction: Math.floor(Math.random() * (scoreRanges.compensation[1] - scoreRanges.compensation[0] + 1)) + scoreRanges.compensation[0],
        workEnvironment: Math.floor(Math.random() * (scoreRanges.environment[1] - scoreRanges.environment[0] + 1)) + scoreRanges.environment[0],
        recommendCompany: Math.random() > scoreRanges.recommendThreshold,
        department: dept,
        position: position,
        ageRange: ageRange,
        yearsInCompany: yearsInCompany
      }
      
      return {
        organizationId: organization.id,
        responses: generateResponses(scores),
        department: scores.department,
        position: scores.position,
        ageRange: scores.ageRange,
        yearsInCompany: scores.yearsInCompany,
        satisfactionScore: scores.satisfactionScore,
        workLifeBalance: scores.workLifeBalance,
        careerDevelopment: scores.careerDevelopment,
        managementQuality: scores.managementQuality,
        compensationSatisfaction: scores.compensationSatisfaction,
        workEnvironment: scores.workEnvironment,
        recommendCompany: scores.recommendCompany,
        turnoverRisk: scores.satisfactionScore < 6 ? 'HIGH' : scores.satisfactionScore < 7 ? 'MEDIUM' : 'LOW',
        completedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      }
    }

    // Datos de muestra realistas
    const sampleResponses = []

    // Tecnología - 15 respuestas (alto rendimiento)
    const techScores = {
      satisfaction: [7, 9],
      workLife: [6, 8],
      career: [7, 9],
      management: [7, 9],
      compensation: [6, 8],
      environment: [7, 9],
      recommendThreshold: 0.2
    }
    
    for (let i = 0; i < 15; i++) {
      const position = i < 5 ? 'Junior' : i < 12 ? 'Senior' : 'Lead/Manager'
      const ageRange = i < 3 ? '18-25' : i < 10 ? '26-35' : i < 13 ? '36-45' : '46+'
      const yearsInCompany = i < 4 ? 1 : i < 8 ? 3 : i < 12 ? 6 : 10
      sampleResponses.push(createResponseData('Tecnología', position, ageRange, yearsInCompany, techScores))
    }

    // Ventas - 12 respuestas (más riesgo)
    const salesScores = {
      satisfaction: [5, 8],
      workLife: [5, 7],
      career: [5, 7],
      management: [6, 8],
      compensation: [5, 7],
      environment: [6, 8],
      recommendThreshold: 0.4
    }
    
    for (let i = 0; i < 12; i++) {
      const position = i < 6 ? 'Junior' : i < 10 ? 'Senior' : 'Lead/Manager'
      const ageRange = i < 4 ? '18-25' : i < 8 ? '26-35' : i < 10 ? '36-45' : '46+'
      const yearsInCompany = i < 5 ? 1 : i < 8 ? 2 : i < 10 ? 4 : 8
      sampleResponses.push(createResponseData('Ventas', position, ageRange, yearsInCompany, salesScores))
    }

    // Marketing - 10 respuestas
    const marketingScores = {
      satisfaction: [6, 8],
      workLife: [6, 8],
      career: [6, 8],
      management: [7, 9],
      compensation: [6, 8],
      environment: [7, 9],
      recommendThreshold: 0.3
    }
    
    for (let i = 0; i < 10; i++) {
      const position = i < 4 ? 'Junior' : i < 8 ? 'Senior' : 'Lead/Manager'
      const ageRange = i < 3 ? '18-25' : i < 7 ? '26-35' : i < 9 ? '36-45' : '46+'
      const yearsInCompany = i < 3 ? 1 : i < 6 ? 3 : i < 8 ? 5 : 9
      sampleResponses.push(createResponseData('Marketing', position, ageRange, yearsInCompany, marketingScores))
    }

    // RRHH - 8 respuestas (alto rendimiento)
    const hrScores = {
      satisfaction: [7, 9],
      workLife: [7, 9],
      career: [6, 8],
      management: [8, 10],
      compensation: [7, 9],
      environment: [8, 10],
      recommendThreshold: 0.15
    }
    
    for (let i = 0; i < 8; i++) {
      const position = i < 3 ? 'Junior' : i < 6 ? 'Senior' : 'Lead/Manager'
      const ageRange = i < 2 ? '26-35' : i < 5 ? '36-45' : i < 7 ? '46+' : '18-25'
      const yearsInCompany = i < 2 ? 2 : i < 5 ? 4 : i < 7 ? 7 : 12
      sampleResponses.push(createResponseData('RRHH', position, ageRange, yearsInCompany, hrScores))
    }

    // Finanzas - 8 respuestas
    const financeScores = {
      satisfaction: [6, 8],
      workLife: [6, 8],
      career: [6, 8],
      management: [7, 9],
      compensation: [7, 9],
      environment: [7, 9],
      recommendThreshold: 0.25
    }
    
    for (let i = 0; i < 8; i++) {
      const position = i < 3 ? 'Junior' : i < 6 ? 'Senior' : 'Lead/Manager'
      const ageRange = i < 2 ? '26-35' : i < 5 ? '36-45' : i < 7 ? '46+' : '18-25'
      const yearsInCompany = i < 3 ? 2 : i < 5 ? 5 : i < 7 ? 8 : 15
      sampleResponses.push(createResponseData('Finanzas', position, ageRange, yearsInCompany, financeScores))
    }

    // Operaciones - 7 respuestas (más desafíos)
    const opsScores = {
      satisfaction: [6, 8],
      workLife: [5, 7],
      career: [5, 7],
      management: [6, 8],
      compensation: [6, 8],
      environment: [6, 8],
      recommendThreshold: 0.35
    }
    
    for (let i = 0; i < 7; i++) {
      const position = i < 3 ? 'Junior' : i < 5 ? 'Senior' : 'Lead/Manager'
      const ageRange = i < 2 ? '18-25' : i < 4 ? '26-35' : i < 6 ? '36-45' : '46+'
      const yearsInCompany = i < 2 ? 1 : i < 4 ? 3 : i < 6 ? 6 : 11
      sampleResponses.push(createResponseData('Operaciones', position, ageRange, yearsInCompany, opsScores))
    }

    // Crear todas las respuestas
    console.log(`Creando ${sampleResponses.length} respuestas de muestra...`)
    
    for (const response of sampleResponses) {
      await prisma.surveyResponse.create({
        data: response
      })
    }

    console.log('✅ Respuestas de muestra creadas exitosamente!')
    console.log(`Total de respuestas: ${sampleResponses.length}`)
    
    // Mostrar resumen por departamento
    const summary = sampleResponses.reduce((acc, response) => {
      acc[response.department] = (acc[response.department] || 0) + 1
      return acc
    }, {})
    
    console.log('\n📊 Resumen por departamento:')
    Object.entries(summary).forEach(([dept, count]) => {
      console.log(`  ${dept}: ${count} respuestas`)
    })

  } catch (error) {
    console.error('Error creando respuestas de muestra:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSampleResponses()
