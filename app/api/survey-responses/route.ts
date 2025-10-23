
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      workerId,
      surveyId,
      isCompleted,
      organizationId,
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

    let isUser = true;
    if (workerId) {
      const userFound = await prisma.user.findUnique({
        where: { id: workerId }
      })
      if (!userFound) {
        const employeeFound = await prisma.employee.findUnique({
          where: { id: workerId }
        })
        if (employeeFound) {
          isUser = false;
        }
      }
    }

    let surveyResponse;
    if(surveyId) {
      surveyResponse = await prisma.surveyResponse.update({
        where: {
          id: surveyId
        },
        data: {
          isCompleted: isCompleted,
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
          User: isUser ? {
            connect: workerId ? { id: workerId } : undefined
          } : undefined,
          Employee: !isUser ? {
            connect: workerId ? { id: workerId } : undefined
          } : undefined
        }
      })
    } else {
        surveyResponse = await prisma.surveyResponse.create({
          data: {
            id: crypto.randomUUID(), // Generate a unique ID for the response
            isCompleted: isCompleted,
            organizationId: organizationId,
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
            User: isUser ? {
              connect: workerId ? { id: workerId } : undefined
            } : undefined,
            Employee: !isUser ? {
              connect: workerId ? { id: workerId } : undefined
            } : undefined
          }
      })
    }

    // add survey to worker
    if (workerId && isUser && surveyResponse.id) {
      await prisma.user.update({
        where: { id: workerId },
        data: {
          SurveyResponse: {
            connect: { id: surveyResponse.id }
          }
        }
      })
    } else if (workerId && !isUser && surveyResponse.id) {
      await prisma.employee.update({
        where: { id: workerId },
        data: {
          SurveyResponse: {
            connect: { id: surveyResponse.id }
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Encuesta guardada exitosamente',
      responseId: surveyResponse.id,
      data: surveyResponse
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
