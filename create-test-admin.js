const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestAdmin() {
  try {
    // Crear organización de prueba
    const organization = await prisma.organization.upsert({
      where: { name: 'Organización Demo' },
      update: {},
      create: {
        name: 'Organización Demo',
        description: 'Organización de prueba para el dashboard'
      }
    })

    console.log('Organización creada:', organization)

    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@demo.com' },
      update: {
        role: 'ADMIN',
        organizationId: organization.id
      },
      create: {
        email: 'admin@demo.com',
        name: 'Administrador Demo',
        password: hashedPassword,
        role: 'ADMIN',
        organizationId: organization.id
      }
    })

    console.log('Usuario administrador creado:', {
      email: admin.email,
      name: admin.name,
      role: admin.role
    })

    console.log('\n=== CREDENCIALES DE ACCESO ===')
    console.log('Email: admin@demo.com')
    console.log('Password: admin123')
    console.log('==============================\n')

  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestAdmin()
