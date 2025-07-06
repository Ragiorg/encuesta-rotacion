
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creando datos de encuesta de prueba...')

  // Obtener organizaciones
  const organizations = await prisma.organization.findMany()
  
  if (organizations.length === 0) {
    console.log('❌ No hay organizaciones. Ejecuta seed-new-organizations.js primero.')
    return
  }

  // Obtener usuario anónimo del sistema
  let anonymousUser = await prisma.user.findFirst({
    where: { email: 'anonymous@system.local' }
  })

  if (!anonymousUser) {
    anonymousUser = await prisma.user.create({
      data: {
        id: 'anonymous-user-id',
        name: 'Usuario Anónimo',
        email: 'anonymous@system.local',
        role: 'EMPLOYEE'
      }
    })
  }

  // Datos de ejemplo para diferentes departamentos y perfiles
  const sampleData = [
    // TechCorp Solutions - Datos variados
    { org: 'TechCorp Solutions', dept: 'Desarrollo', position: 'Senior Developer', age: '26-35', years: 3, satisfaction: 8, workLife: 7, career: 6, management: 7, compensation: 5, environment: 8, recommend: true },
    { org: 'TechCorp Solutions', dept: 'Desarrollo', position: 'Junior Developer', age: '22-25', years: 1, satisfaction: 7, workLife: 8, career: 8, management: 6, compensation: 6, environment: 7, recommend: true },
    { org: 'TechCorp Solutions', dept: 'Desarrollo', position: 'Tech Lead', age: '36-45', years: 5, satisfaction: 6, workLife: 5, career: 5, management: 6, compensation: 7, environment: 6, recommend: false },
    { org: 'TechCorp Solutions', dept: 'Marketing', position: 'Marketing Manager', age: '26-35', years: 2, satisfaction: 9, workLife: 8, career: 9, management: 8, compensation: 8, environment: 9, recommend: true },
    { org: 'TechCorp Solutions', dept: 'Marketing', position: 'Content Creator', age: '22-25', years: 1, satisfaction: 8, workLife: 9, career: 7, management: 8, compensation: 6, environment: 8, recommend: true },
    { org: 'TechCorp Solutions', dept: 'Ventas', position: 'Sales Representative', age: '26-35', years: 2, satisfaction: 5, workLife: 4, career: 4, management: 5, compensation: 4, environment: 5, recommend: false },
    { org: 'TechCorp Solutions', dept: 'Ventas', position: 'Sales Manager', age: '36-45', years: 4, satisfaction: 7, workLife: 6, career: 6, management: 7, compensation: 8, environment: 7, recommend: true },
    { org: 'TechCorp Solutions', dept: 'RRHH', position: 'HR Specialist', age: '26-35', years: 3, satisfaction: 6, workLife: 7, career: 5, management: 6, compensation: 6, environment: 6, recommend: false },
    { org: 'TechCorp Solutions', dept: 'Operaciones', position: 'Operations Manager', age: '36-45', years: 6, satisfaction: 4, workLife: 3, career: 3, management: 4, compensation: 5, environment: 4, recommend: false },
    { org: 'TechCorp Solutions', dept: 'Operaciones', position: 'Analyst', age: '22-25', years: 1, satisfaction: 5, workLife: 6, career: 6, management: 5, compensation: 5, environment: 5, recommend: false },

    // InnovateLab - Datos con problemas de higiene
    { org: 'InnovateLab', dept: 'Investigación', position: 'Research Scientist', age: '26-35', years: 2, satisfaction: 5, workLife: 4, career: 7, management: 4, compensation: 3, environment: 4, recommend: false },
    { org: 'InnovateLab', dept: 'Investigación', position: 'Lab Technician', age: '22-25', years: 1, satisfaction: 4, workLife: 3, career: 5, management: 3, compensation: 3, environment: 3, recommend: false },
    { org: 'InnovateLab', dept: 'Desarrollo', position: 'Product Developer', age: '26-35', years: 3, satisfaction: 6, workLife: 5, career: 6, management: 5, compensation: 4, environment: 5, recommend: false },
    { org: 'InnovateLab', dept: 'Calidad', position: 'QA Engineer', age: '26-35', years: 2, satisfaction: 5, workLife: 4, career: 4, management: 4, compensation: 4, environment: 4, recommend: false },
    { org: 'InnovateLab', dept: 'Administración', position: 'Admin Assistant', age: '22-25', years: 1, satisfaction: 3, workLife: 3, career: 2, management: 3, compensation: 3, environment: 3, recommend: false },

    // DataDriven Analytics - Datos con problemas de motivación
    { org: 'DataDriven Analytics', dept: 'Analytics', position: 'Data Analyst', age: '26-35', years: 2, satisfaction: 6, workLife: 7, career: 4, management: 7, compensation: 7, environment: 7, recommend: false },
    { org: 'DataDriven Analytics', dept: 'Analytics', position: 'Senior Analyst', age: '36-45', years: 4, satisfaction: 5, workLife: 6, career: 3, management: 6, compensation: 7, environment: 6, recommend: false },
    { org: 'DataDriven Analytics', dept: 'Consultoría', position: 'Consultant', age: '26-35', years: 3, satisfaction: 6, workLife: 6, career: 4, management: 7, compensation: 8, environment: 7, recommend: false },
    { org: 'DataDriven Analytics', dept: 'Consultoría', position: 'Senior Consultant', age: '36-45', years: 5, satisfaction: 7, workLife: 7, career: 5, management: 7, compensation: 8, environment: 7, recommend: true },
    { org: 'DataDriven Analytics', dept: 'Soporte', position: 'Support Specialist', age: '22-25', years: 1, satisfaction: 5, workLife: 6, career: 3, management: 6, compensation: 6, environment: 6, recommend: false }
  ]

  let createdCount = 0

  for (const data of sampleData) {
    const org = organizations.find(o => o.name === data.org)
    if (!org) continue

    // Calcular riesgo de rotación basado en satisfacción
    let turnoverRisk = 'LOW'
    if (data.satisfaction < 5) turnoverRisk = 'HIGH'
    else if (data.satisfaction < 7) turnoverRisk = 'MEDIUM'

    const surveyResponse = await prisma.surveyResponse.create({
      data: {
        userId: anonymousUser.id,
        organizationId: org.id,
        responses: {
          department: data.dept,
          position: data.position,
          ageRange: data.age,
          yearsInCompany: data.years,
          satisfactionScore: data.satisfaction,
          workLifeBalance: data.workLife,
          careerDevelopment: data.career,
          managementQuality: data.management,
          compensationSatisfaction: data.compensation,
          workEnvironment: data.environment,
          recommendCompany: data.recommend
        },
        satisfactionScore: data.satisfaction,
        workLifeBalance: data.workLife,
        careerDevelopment: data.career,
        managementQuality: data.management,
        compensationSatisfaction: data.compensation,
        workEnvironment: data.environment,
        department: data.dept,
        yearsInCompany: data.years,
        ageRange: data.age,
        position: data.position,
        turnoverRisk: turnoverRisk,
        recommendCompany: data.recommend,
        completedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000) // Últimos 30 días
      }
    })

    createdCount++
    console.log(`✅ Respuesta creada para ${data.org} - ${data.dept} (${data.position})`)
  }

  console.log(`\n🎉 ¡${createdCount} respuestas de encuesta creadas exitosamente!`)
  console.log('\n📊 Resumen de datos:')
  console.log('• TechCorp Solutions: 10 respuestas (datos variados)')
  console.log('• InnovateLab: 5 respuestas (problemas de higiene)')
  console.log('• DataDriven Analytics: 5 respuestas (problemas de motivación)')
  console.log('\n🔍 Ahora puedes ver el dashboard con análisis completo de Herzberg!')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
