const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function createSimpleResponses() {
  try {
    // Obtener la organización demo y el usuario admin
    const organization = await prisma.organization.findFirst({
      where: { name: 'Organización Demo' }
    })

    const adminUser = await prisma.user.findFirst({
      where: { email: 'admin@demo.com' }
    })

    if (!organization || !adminUser) {
      console.error('No se encontró la organización demo o el usuario admin')
      return
    }

    console.log('Creando respuestas de muestra para:', organization.name)

    // Crear respuestas simples
    const responses = [
      // Tecnología
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Tecnología', position: 'Senior', satisfaction: 8 },
        department: 'Tecnología',
        position: 'Senior',
        ageRange: '26-35',
        yearsInCompany: 3,
        satisfactionScore: 8,
        workLifeBalance: 7,
        careerDevelopment: 8,
        managementQuality: 8,
        compensationSatisfaction: 7,
        workEnvironment: 8,
        recommendCompany: true,
        turnoverRisk: 'LOW'
      },
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Tecnología', position: 'Junior', satisfaction: 7 },
        department: 'Tecnología',
        position: 'Junior',
        ageRange: '18-25',
        yearsInCompany: 1,
        satisfactionScore: 7,
        workLifeBalance: 6,
        careerDevelopment: 7,
        managementQuality: 7,
        compensationSatisfaction: 6,
        workEnvironment: 7,
        recommendCompany: true,
        turnoverRisk: 'LOW'
      },
      // Ventas
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Ventas', position: 'Senior', satisfaction: 6 },
        department: 'Ventas',
        position: 'Senior',
        ageRange: '26-35',
        yearsInCompany: 2,
        satisfactionScore: 6,
        workLifeBalance: 5,
        careerDevelopment: 6,
        managementQuality: 6,
        compensationSatisfaction: 5,
        workEnvironment: 6,
        recommendCompany: false,
        turnoverRisk: 'MEDIUM'
      },
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Ventas', position: 'Junior', satisfaction: 5 },
        department: 'Ventas',
        position: 'Junior',
        ageRange: '18-25',
        yearsInCompany: 1,
        satisfactionScore: 5,
        workLifeBalance: 4,
        careerDevelopment: 5,
        managementQuality: 5,
        compensationSatisfaction: 4,
        workEnvironment: 5,
        recommendCompany: false,
        turnoverRisk: 'HIGH'
      },
      // Marketing
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Marketing', position: 'Senior', satisfaction: 7 },
        department: 'Marketing',
        position: 'Senior',
        ageRange: '26-35',
        yearsInCompany: 4,
        satisfactionScore: 7,
        workLifeBalance: 7,
        careerDevelopment: 6,
        managementQuality: 7,
        compensationSatisfaction: 6,
        workEnvironment: 7,
        recommendCompany: true,
        turnoverRisk: 'LOW'
      },
      // RRHH
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'RRHH', position: 'Lead/Manager', satisfaction: 9 },
        department: 'RRHH',
        position: 'Lead/Manager',
        ageRange: '36-45',
        yearsInCompany: 8,
        satisfactionScore: 9,
        workLifeBalance: 8,
        careerDevelopment: 8,
        managementQuality: 9,
        compensationSatisfaction: 8,
        workEnvironment: 9,
        recommendCompany: true,
        turnoverRisk: 'LOW'
      },
      // Finanzas
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Finanzas', position: 'Senior', satisfaction: 7 },
        department: 'Finanzas',
        position: 'Senior',
        ageRange: '36-45',
        yearsInCompany: 6,
        satisfactionScore: 7,
        workLifeBalance: 6,
        careerDevelopment: 6,
        managementQuality: 7,
        compensationSatisfaction: 8,
        workEnvironment: 7,
        recommendCompany: true,
        turnoverRisk: 'LOW'
      },
      // Operaciones
      {
        organizationId: organization.id,
        userId: adminUser.id,
        responses: { department: 'Operaciones', position: 'Junior', satisfaction: 6 },
        department: 'Operaciones',
        position: 'Junior',
        ageRange: '18-25',
        yearsInCompany: 1,
        satisfactionScore: 6,
        workLifeBalance: 5,
        careerDevelopment: 5,
        managementQuality: 6,
        compensationSatisfaction: 6,
        workEnvironment: 6,
        recommendCompany: true,
        turnoverRisk: 'MEDIUM'
      }
    ]

    console.log(`Creando ${responses.length} respuestas de muestra...`)
    
    for (const response of responses) {
      await prisma.surveyResponse.create({
        data: response
      })
    }

    console.log('✅ Respuestas de muestra creadas exitosamente!')
    console.log(`Total de respuestas: ${responses.length}`)

  } catch (error) {
    console.error('Error creando respuestas de muestra:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createSimpleResponses()
