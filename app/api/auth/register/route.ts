
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/db"
import { id } from "date-fns/locale"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, companyName } = await request.json()

    // Validate required fields
    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Ya existe un usuario con este email" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create or find organization by company name
    const organization = await prisma.organization.upsert({
      where: { name: companyName },
      update: {},
      create: {
        name: companyName,
        description: `Organización ${companyName}`,
        id: crypto.randomUUID(), // Generate a unique ID for the organization
        updatedAt: new Date(),
      }
    })

    // Create admin user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN", // All registered users are admins
        organizationId: organization.id,
        id: crypto.randomUUID(), // Generate a unique ID for the user
        updatedAt: new Date(),
      }
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      { 
        success: true,
        user: userWithoutPassword,
        organization: {
          id: organization.id,
          name: organization.name
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Error interno del servidor", details: error },
      { status: 500 }
    )
  }
}
