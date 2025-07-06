
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      organizations
    })
  } catch (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener las organizaciones' 
      },
      { status: 500 }
    )
  }
}
