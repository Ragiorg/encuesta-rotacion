
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Creando organizaciones y administradores de prueba...')

  // Crear organizaciones
  const organizations = [
    {
      name: 'TechCorp Solutions',
      description: 'Empresa de tecnología e innovación'
    },
    {
      name: 'InnovateLab',
      description: 'Laboratorio de investigación y desarrollo'
    },
    {
      name: 'DataDriven Analytics',
      description: 'Consultoría en análisis de datos'
    }
  ]

  const createdOrgs = []
  for (const org of organizations) {
    const organization = await prisma.organization.upsert({
      where: { name: org.name },
      update: {},
      create: org
    })
    createdOrgs.push(organization)
    console.log(`✅ Organización creada: ${organization.name}`)
  }

  // Crear administradores
  const admins = [
    {
      name: 'Admin TechCorp',
      email: 'admin@techcorp.com',
      password: 'admin123',
      organizationName: 'TechCorp Solutions'
    },
    {
      name: 'Admin InnovateLab',
      email: 'admin@innovatelab.com',
      password: 'admin123',
      organizationName: 'InnovateLab'
    },
    {
      name: 'Admin DataDriven',
      email: 'admin@datadriven.com',
      password: 'admin123',
      organizationName: 'DataDriven Analytics'
    }
  ]

  for (const admin of admins) {
    const hashedPassword = await bcrypt.hash(admin.password, 12)
    const organization = createdOrgs.find(org => org.name === admin.organizationName)
    
    const user = await prisma.user.upsert({
      where: { email: admin.email },
      update: {},
      create: {
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: 'ADMIN',
        organizationId: organization.id
      }
    })
    console.log(`✅ Administrador creado: ${user.email} para ${organization.name}`)
  }

  console.log('📊 Las respuestas de ejemplo se crearán cuando los empleados usen la encuesta pública')

  console.log('\n🎉 ¡Datos de prueba creados exitosamente!')
  console.log('\n📋 Credenciales de administradores:')
  console.log('👤 admin@techcorp.com / admin123 (TechCorp Solutions)')
  console.log('👤 admin@innovatelab.com / admin123 (InnovateLab)')
  console.log('👤 admin@datadriven.com / admin123 (DataDriven Analytics)')
  console.log('\n🌐 Organizaciones disponibles para empleados:')
  console.log('• TechCorp Solutions')
  console.log('• InnovateLab')
  console.log('• DataDriven Analytics')
}

main()
  .catch((e) => {
    console.error('❌ Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
