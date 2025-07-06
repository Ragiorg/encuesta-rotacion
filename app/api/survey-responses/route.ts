
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      organizationName, 
      responses, 
      satisfactionScore,
      workLifeBalance,
      careerDevelopment,
      managementQuality,
      compensationSatisfaction,
      workEnvironment,
      department,
      yearsInCompany,
      ageRange,
      position,
      turnoverRisk,
      recommendCompany
    } = body

    // Validate required fields
    if (!organizationName || !responses) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Nombre de organización y respuestas son requeridos' 
        },
        { status: 400 }
      )
    }

    // Find organization by name
    const organization = await prisma.organization.findUnique({
      where: { name: organizationName }
    })

    if (!organization) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Organización no encontrada. Por favor contacte a su administrador.' 
        },
        { status: 404 }
      )
    }

    // Get or create anonymous user
    const anonymousUser = await prisma.user.upsert({
      where: { email: 'anonymous@system.local' },
      update: {},
      create: {
        id: 'anonymous-user-id',
        name: 'Anonymous User',
        email: 'anonymous@system.local',
        role: 'EMPLOYEE',
        updatedAt: new Date()
      }
    })

    // Create survey response
    const surveyResponse = await prisma.surveyResponse.create({
      data: {
        id: crypto.randomUUID(), // Generate a unique ID for the response
        userId: anonymousUser.id,
        organizationId: organization.id,
        responses,
        satisfactionScore: satisfactionScore ? parseInt(satisfactionScore) : null,
        workLifeBalance: workLifeBalance ? parseInt(workLifeBalance) : null,
        careerDevelopment: careerDevelopment ? parseInt(careerDevelopment) : null,
        managementQuality: managementQuality ? parseInt(managementQuality) : null,
        compensationSatisfaction: compensationSatisfaction ? parseInt(compensationSatisfaction) : null,
        workEnvironment: workEnvironment ? parseInt(workEnvironment) : null,
        department,
        yearsInCompany: yearsInCompany ? parseInt(yearsInCompany) : null,
        ageRange,
        position,
        turnoverRisk,
        recommendCompany: recommendCompany !== undefined ? Boolean(recommendCompany) : null,
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Encuesta guardada exitosamente',
      responseId: surveyResponse.id
    })

  } catch (error) {
    console.error('Error saving survey response:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const organizationId = searchParams.get('organizationId')

    if (!organizationId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'ID de organización requerido' 
        },
        { status: 400 }
      )
    }

    const responses = await prisma.surveyResponse.findMany({
      where: {
        organizationId
      },
      include: {
        Organization: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      responses
    })

  } catch (error) {
    console.error('Error fetching survey responses:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener las respuestas' 
      },
      { status: 500 }
    )
  }
}
