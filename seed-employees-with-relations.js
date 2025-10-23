const { PrismaClient } = require("./.generated/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed de empleados...");

  // Obtener departamentos, posiciones y organizaciones existentes
  const departments = await prisma.department.findMany();
  const positions = await prisma.position.findMany();
  const organizations = await prisma.organization.findMany();

  if (departments.length === 0 || positions.length === 0 || organizations.length === 0) {
    throw new Error("❌ Debes tener departamentos, posiciones y organizaciones en la BD antes de correr este seed.");
  }

  // Generar empleados de prueba
  const employeesData = Array.from({ length: 70 }).map((_, i) => {
    const randomDepartment = departments[Math.floor(Math.random() * departments.length)];
    const randomPosition = positions[Math.floor(Math.random() * positions.length)];
    const randomOrg = organizations[Math.floor(Math.random() * organizations.length)];

    return {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      employeeNumber: Math.floor(1000 + Math.random() * 9000),
      address: faker.location.streetAddress(),
      email: faker.internet.email({provider: randomOrg.name.toLowerCase().replace(/\s+/g, '')+'.com'}),
      hiredAt: new Date(2021 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
      updatedAt: new Date(),
      createdBy: "seed",
      departmentId: randomDepartment.id,
      positionId: randomPosition.id,
      organizationId: randomOrg.id,
    };
  });

  await prisma.employee.createMany({
    data: employeesData,
    skipDuplicates: true,
  });

  console.log(`✅ Seed completado: ${employeesData.length} empleados creados.`);
}

main()
  .catch((e) => {
    console.error("❌ Error ejecutando seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
