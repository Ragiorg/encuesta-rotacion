const { PrismaClient } = require("./.generated/client");
const prisma = new PrismaClient();

async function main() {
  // ======================
  // Departamentos
  // ======================
  await prisma.department.createMany({
    data: [
      { name: "Recursos Humanos" },
      { name: "Desarrollo de Software" },
      { name: "Ventas" },
      { name: "Marketing" },
      { name: "Finanzas" },
      { name: "Contabilidad" },
      { name: "Atención al Cliente" },
      { name: "Operaciones" },
      { name: "Logística" },
      { name: "Producción" },
      { name: "Calidad" },
      { name: "Soporte Técnico" },
      { name: "Diseño UX/UI" },
      { name: "Investigación y Desarrollo" },
      { name: "Compras" },
      { name: "Legal" },
      { name: "Seguridad Informática" },
      { name: "Comunicación Interna" },
      { name: "Relaciones Públicas" },
      { name: "Gestión de Proyectos" },
      { name: "Administración" },
      { name: "Data Science" },
      { name: "Business Intelligence" },
      { name: "Ingeniería de Producto" },
      { name: "Infraestructura" },
      { name: "Recursos Materiales" },
      { name: "Capacitación y Desarrollo" },
      { name: "Sistemas" },
      { name: "Servicio Postventa" },
      { name: "Planeación Estratégica" },
    ],
    skipDuplicates: true,
  });

  // ======================
  // Posiciones
  // ======================
  await prisma.position.createMany({
    data: [
      // Desarrollo de software
      { title: "Software Engineer Junior" },
      { title: "Software Engineer Mid" },
      { title: "Software Engineer Senior" },
      { title: "Frontend Developer Junior" },
      { title: "Frontend Developer Mid" },
      { title: "Frontend Developer Senior" },
      { title: "Backend Developer Junior" },
      { title: "Backend Developer Mid" },
      { title: "Backend Developer Senior" },
      { title: "Fullstack Developer Junior" },
      { title: "Fullstack Developer Mid" },
      { title: "Fullstack Developer Senior" },
      { title: "Tech Lead" },
      { title: "Engineering Manager" },

      // QA y Testing
      { title: "QA Tester Junior" },
      { title: "QA Tester Mid" },
      { title: "QA Tester Senior" },
      { title: "QA Automation Engineer" },
      { title: "QA Lead" },

      // Data
      { title: "Data Analyst Junior" },
      { title: "Data Analyst Mid" },
      { title: "Data Analyst Senior" },
      { title: "Data Scientist Junior" },
      { title: "Data Scientist Mid" },
      { title: "Data Scientist Senior" },
      { title: "Machine Learning Engineer" },
      { title: "Data Engineer" },

      // Infraestructura / IT
      { title: "SysAdmin Junior" },
      { title: "SysAdmin Senior" },
      { title: "DevOps Engineer Junior" },
      { title: "DevOps Engineer Senior" },
      { title: "Cloud Architect" },
      { title: "Security Analyst" },
      { title: "IT Support Specialist" },

      // Ventas
      { title: "Ejecutivo de Ventas Junior" },
      { title: "Ejecutivo de Ventas Senior" },
      { title: "Key Account Manager" },
      { title: "Sales Manager" },
      { title: "Sales Director" },

      // Marketing
      { title: "Community Manager" },
      { title: "Content Creator" },
      { title: "SEO Specialist" },
      { title: "Digital Marketing Analyst" },
      { title: "Digital Marketing Manager" },

      // Diseño
      { title: "UX Designer Junior" },
      { title: "UX Designer Senior" },
      { title: "UI Designer Junior" },
      { title: "UI Designer Senior" },
      { title: "Product Designer" },
      { title: "Design Lead" },

      // Recursos Humanos
      { title: "Recruiter Junior" },
      { title: "Recruiter Senior" },
      { title: "HR Business Partner" },
      { title: "HR Manager" },
      { title: "Training Specialist" },

      // Finanzas / Contabilidad
      { title: "Financial Analyst Junior" },
      { title: "Financial Analyst Senior" },
      { title: "Accounting Assistant" },
      { title: "Accountant Senior" },
      { title: "Finance Manager" },

      // Legal
      { title: "Legal Assistant" },
      { title: "Corporate Lawyer" },
      { title: "Compliance Officer" },

      // Operaciones
      { title: "Operations Analyst" },
      { title: "Operations Manager" },
      { title: "Supply Chain Specialist" },
      { title: "Logistics Coordinator" },
      { title: "Production Supervisor" },
      { title: "Quality Assurance Analyst" },
      { title: "Quality Assurance Manager" },

      // Dirección
      { title: "Project Manager Junior" },
      { title: "Project Manager Senior" },
      { title: "Program Manager" },
      { title: "Product Owner" },
      { title: "Scrum Master" },
      { title: "Chief Technology Officer (CTO)" },
      { title: "Chief Marketing Officer (CMO)" },
      { title: "Chief Financial Officer (CFO)" },
      { title: "Chief Executive Officer (CEO)" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Seed ejecutado con éxito");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
