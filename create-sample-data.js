const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createSampleData() {
  try {
    // Get the organization
    const organization = await prisma.organization.findFirst({
      where: { name: 'Demo Organization' }
    });

    if (!organization) {
      console.log('Organization not found');
      return;
    }

    // Create sample employees
    const employees = [
      {
        name: 'Juan Pérez',
        email: 'juan.perez@demo.com',
        department: 'Tecnología',
        position: 'Desarrollador Senior',
        yearsInCompany: 3
      },
      {
        name: 'María García',
        email: 'maria.garcia@demo.com',
        department: 'Recursos Humanos',
        position: 'Especialista RRHH',
        yearsInCompany: 2
      },
      {
        name: 'Carlos López',
        email: 'carlos.lopez@demo.com',
        department: 'Ventas',
        position: 'Ejecutivo de Ventas',
        yearsInCompany: 1
      },
      {
        name: 'Ana Martínez',
        email: 'ana.martinez@demo.com',
        department: 'Marketing',
        position: 'Coordinadora Marketing',
        yearsInCompany: 4
      },
      {
        name: 'Luis Rodríguez',
        email: 'luis.rodriguez@demo.com',
        department: 'Tecnología',
        position: 'Analista de Sistemas',
        yearsInCompany: 2
      }
    ];

    // Create users and survey responses
    for (let i = 0; i < employees.length; i++) {
      const emp = employees[i];
      
      // Create user
      const user = await prisma.user.upsert({
        where: { email: emp.email },
        update: {},
        create: {
          name: emp.name,
          email: emp.email,
          role: 'EMPLOYEE',
          organizationId: organization.id
        }
      });

      // Generate random but realistic survey responses
      const satisfactionScore = Math.floor(Math.random() * 4) + 6; // 6-10
      const workLifeBalance = Math.floor(Math.random() * 5) + 5; // 5-9
      const careerDevelopment = Math.floor(Math.random() * 4) + 6; // 6-9
      const managementQuality = Math.floor(Math.random() * 3) + 7; // 7-9
      const compensationSatisfaction = Math.floor(Math.random() * 4) + 5; // 5-8
      const workEnvironment = Math.floor(Math.random() * 3) + 7; // 7-9
      
      const turnoverRisk = satisfactionScore < 7 ? 'HIGH' : satisfactionScore < 8 ? 'MEDIUM' : 'LOW';
      const recommendCompany = satisfactionScore >= 7;

      // Create survey response
      await prisma.surveyResponse.create({
        data: {
          userId: user.id,
          organizationId: organization.id,
          responses: {
            satisfactionScore,
            workLifeBalance,
            careerDevelopment,
            managementQuality,
            compensationSatisfaction,
            workEnvironment,
            department: emp.department,
            position: emp.position,
            yearsInCompany: emp.yearsInCompany,
            ageRange: '25-35',
            turnoverRisk,
            recommendCompany,
            comments: `Comentarios de ejemplo para ${emp.name}`
          },
          satisfactionScore,
          workLifeBalance,
          careerDevelopment,
          managementQuality,
          compensationSatisfaction,
          workEnvironment,
          department: emp.department,
          yearsInCompany: emp.yearsInCompany,
          ageRange: '25-35',
          position: emp.position,
          turnoverRisk,
          recommendCompany
        }
      });
    }

    console.log('Sample data created successfully!');
    console.log(`Created ${employees.length} employees with survey responses`);
    
  } catch (error) {
    console.error('Error creating sample data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleData();
