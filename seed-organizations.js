
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando siembra de datos...')

  // Limpiar datos existentes
  console.log('🧹 Limpiando datos existentes...')
  await prisma.surveyResponse.deleteMany()
  await prisma.user.deleteMany()
  await prisma.organization.deleteMany()

  // Crear organizaciones
  console.log('🏢 Creando organizaciones...')
  const organizations = await Promise.all([
    prisma.organization.create({
      data: {
        name: 'TechCorp Solutions',
        description: 'Empresa de desarrollo de software y consultoría tecnológica'
      }
    }),
    prisma.organization.create({
      data: {
        name: 'InnovateLab',
        description: 'Laboratorio de innovación y desarrollo de productos digitales'
      }
    }),
    prisma.organization.create({
      data: {
        name: 'DataDriven Analytics',
        description: 'Empresa especializada en análisis de datos y business intelligence'
      }
    })
  ])

  console.log(`✅ Creadas ${organizations.length} organizaciones`)

  // Crear administradores
  console.log('👥 Creando administradores...')
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admins = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Carlos Rodríguez',
        email: 'admin-a@empresa-a.com',
        password: hashedPassword,
        role: 'ADMIN',
        organizationId: organizations[0].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'María González',
        email: 'admin-b@empresa-b.com',
        password: hashedPassword,
        role: 'ADMIN',
        organizationId: organizations[1].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Luis Martínez',
        email: 'admin-c@empresa-c.com',
        password: hashedPassword,
        role: 'ADMIN',
        organizationId: organizations[2].id
      }
    })
  ])

  console.log(`✅ Creados ${admins.length} administradores`)

  // Crear empleados para cada organización
  console.log('👨‍💼 Creando empleados...')
  const employeePassword = await bcrypt.hash('empleado123', 12)
  
  const employees = []
  
  // Empleados para TechCorp Solutions
  const techCorpEmployees = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Ana López',
        email: 'ana.lopez@techcorp.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[0].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Pedro Sánchez',
        email: 'pedro.sanchez@techcorp.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[0].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Laura Fernández',
        email: 'laura.fernandez@techcorp.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[0].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Miguel Torres',
        email: 'miguel.torres@techcorp.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[0].id
      }
    })
  ])

  // Empleados para InnovateLab
  const innovateLabEmployees = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Carmen Ruiz',
        email: 'carmen.ruiz@innovatelab.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[1].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Roberto Díaz',
        email: 'roberto.diaz@innovatelab.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[1].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Elena Morales',
        email: 'elena.morales@innovatelab.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[1].id
      }
    })
  ])

  // Empleados para DataDriven Analytics
  const dataDrivenEmployees = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Javier Herrera',
        email: 'javier.herrera@datadriven.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[2].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Sofía Castro',
        email: 'sofia.castro@datadriven.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[2].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Daniel Vargas',
        email: 'daniel.vargas@datadriven.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[2].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Patricia Jiménez',
        email: 'patricia.jimenez@datadriven.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[2].id
      }
    }),
    prisma.user.create({
      data: {
        name: 'Andrés Mendoza',
        email: 'andres.mendoza@datadriven.com',
        password: employeePassword,
        role: 'EMPLOYEE',
        organizationId: organizations[2].id
      }
    })
  ])

  employees.push(...techCorpEmployees, ...innovateLabEmployees, ...dataDrivenEmployees)
  console.log(`✅ Creados ${employees.length} empleados`)

  // Crear respuestas de encuesta
  console.log('📊 Creando respuestas de encuesta...')
  
  const departments = ['Desarrollo', 'Marketing', 'Ventas', 'RRHH', 'Finanzas', 'Operaciones']
  const positions = ['Junior', 'Semi-Senior', 'Senior', 'Lead', 'Manager']
  const ageRanges = ['18-25', '26-35', '36-45', '46-55', '55+']
  const riskLevels = ['LOW', 'MEDIUM', 'HIGH']

  const responses = []

  // Función para generar respuestas realistas
  function generateRealisticScores(orgIndex) {
    // TechCorp: Puntuaciones altas (empresa exitosa)
    if (orgIndex === 0) {
      return {
        satisfaction: Math.floor(Math.random() * 3) + 7, // 7-9
        workLifeBalance: Math.floor(Math.random() * 3) + 6, // 6-8
        careerDevelopment: Math.floor(Math.random() * 3) + 7, // 7-9
        managementQuality: Math.floor(Math.random() * 3) + 6, // 6-8
        compensationSatisfaction: Math.floor(Math.random() * 3) + 7, // 7-9
        workEnvironment: Math.floor(Math.random() * 3) + 8, // 8-10
        recommendCompany: Math.random() > 0.2, // 80% recomiendan
        turnoverRisk: Math.random() > 0.7 ? 'MEDIUM' : 'LOW' // Mayoría bajo riesgo
      }
    }
    // InnovateLab: Puntuaciones medias (empresa en crecimiento)
    else if (orgIndex === 1) {
      return {
        satisfaction: Math.floor(Math.random() * 4) + 5, // 5-8
        workLifeBalance: Math.floor(Math.random() * 3) + 4, // 4-6
        careerDevelopment: Math.floor(Math.random() * 4) + 6, // 6-9
        managementQuality: Math.floor(Math.random() * 3) + 5, // 5-7
        compensationSatisfaction: Math.floor(Math.random() * 3) + 5, // 5-7
        workEnvironment: Math.floor(Math.random() * 3) + 6, // 6-8
        recommendCompany: Math.random() > 0.4, // 60% recomiendan
        turnoverRisk: Math.random() > 0.5 ? (Math.random() > 0.7 ? 'HIGH' : 'MEDIUM') : 'LOW'
      }
    }
    // DataDriven: Puntuaciones mixtas (empresa con problemas)
    else {
      return {
        satisfaction: Math.floor(Math.random() * 5) + 3, // 3-7
        workLifeBalance: Math.floor(Math.random() * 4) + 3, // 3-6
        careerDevelopment: Math.floor(Math.random() * 3) + 4, // 4-6
        managementQuality: Math.floor(Math.random() * 4) + 3, // 3-6
        compensationSatisfaction: Math.floor(Math.random() * 4) + 4, // 4-7
        workEnvironment: Math.floor(Math.random() * 4) + 4, // 4-7
        recommendCompany: Math.random() > 0.6, // 40% recomiendan
        turnoverRisk: Math.random() > 0.3 ? (Math.random() > 0.6 ? 'HIGH' : 'MEDIUM') : 'LOW'
      }
    }
  }

  // Crear respuestas para cada empleado
  for (let i = 0; i < employees.length; i++) {
    const employee = employees[i]
    const orgIndex = organizations.findIndex(org => org.id === employee.organizationId)
    const scores = generateRealisticScores(orgIndex)
    
    const response = await prisma.surveyResponse.create({
      data: {
        userId: employee.id,
        organizationId: employee.organizationId,
        responses: {
          // Respuestas completas del chatbot (simuladas)
          generalSatisfaction: scores.satisfaction,
          workLifeBalance: scores.workLifeBalance,
          careerDevelopment: scores.careerDevelopment,
          managementQuality: scores.managementQuality,
          compensation: scores.compensationSatisfaction,
          workEnvironment: scores.workEnvironment,
          wouldRecommend: scores.recommendCompany,
          additionalComments: "Respuesta generada automáticamente para pruebas"
        },
        satisfactionScore: scores.satisfaction,
        workLifeBalance: scores.workLifeBalance,
        careerDevelopment: scores.careerDevelopment,
        managementQuality: scores.managementQuality,
        compensationSatisfaction: scores.compensationSatisfaction,
        workEnvironment: scores.workEnvironment,
        department: departments[Math.floor(Math.random() * departments.length)],
        yearsInCompany: Math.floor(Math.random() * 10) + 1,
        ageRange: ageRanges[Math.floor(Math.random() * ageRanges.length)],
        position: positions[Math.floor(Math.random() * positions.length)],
        turnoverRisk: scores.turnoverRisk,
        recommendCompany: scores.recommendCompany,
        completedAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Últimos 30 días
      }
    })
    responses.push(response)
  }

  console.log(`✅ Creadas ${responses.length} respuestas de encuesta`)

  // Mostrar resumen
  console.log('\n📋 RESUMEN DE DATOS CREADOS:')
  console.log('================================')
  
  for (let i = 0; i < organizations.length; i++) {
    const org = organizations[i]
    const orgEmployees = employees.filter(emp => emp.organizationId === org.id)
    const orgResponses = responses.filter(resp => resp.organizationId === org.id)
    const avgSatisfaction = orgResponses.reduce((sum, resp) => sum + resp.satisfactionScore, 0) / orgResponses.length
    
    console.log(`\n🏢 ${org.name}:`)
    console.log(`   📧 Admin: ${admins[i].email} (contraseña: admin123)`)
    console.log(`   👥 Empleados: ${orgEmployees.length}`)
    console.log(`   📊 Respuestas: ${orgResponses.length}`)
    console.log(`   ⭐ Satisfacción promedio: ${avgSatisfaction.toFixed(1)}/10`)
  }

  console.log('\n🎉 ¡Siembra de datos completada exitosamente!')
  console.log('\n🔑 CREDENCIALES DE PRUEBA:')
  console.log('==========================')
  console.log('Admin TechCorp: admin-a@empresa-a.com / admin123')
  console.log('Admin InnovateLab: admin-b@empresa-b.com / admin123')
  console.log('Admin DataDriven: admin-c@empresa-c.com / admin123')
  console.log('\nTodos los empleados tienen contraseña: empleado123')
}

main()
  .catch((e) => {
    console.error('❌ Error durante la siembra:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
