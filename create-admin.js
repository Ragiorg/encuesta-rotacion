const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Create organization first
    const organization = await prisma.organization.upsert({
      where: { name: 'Demo Organization' },
      update: {},
      create: {
        name: 'Demo Organization',
        description: 'Organización de demostración para el dashboard'
      }
    });

    // Create admin user
    const admin = await prisma.user.upsert({
      where: { email: 'admin@demo.com' },
      update: {
        role: 'ADMIN',
        organizationId: organization.id
      },
      create: {
        name: 'Administrador Demo',
        email: 'admin@demo.com',
        password: '$2b$12$xrqroMo3gaRc43SP5Ei4zeKshpIolU9u2j5VkIt/jPhzwzX.drc1y', // admin123
        role: 'ADMIN',
        organizationId: organization.id
      }
    });

    console.log('Admin user created successfully:');
    console.log('Email: admin@demo.com');
    console.log('Password: admin123');
    console.log('Role:', admin.role);
    
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
