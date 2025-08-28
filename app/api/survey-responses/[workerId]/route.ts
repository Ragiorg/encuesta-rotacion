import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Employee, User } from '@/.generated/client';
import survey from '@/constants/survey.json';

export async function GET(request: Request, { params }: { params: { workerId: string } }) {
  const { workerId } = await params;

  // Fetch survey responses for the given workerId where the workerId matches the Employee ID or User ID
  if (!workerId) {
    return NextResponse.json(
      { success: false, error: 'ID de trabajador requerido' },
      { status: 400 }
    );
  }

  let workerType = 'Admin';

  let worker: User | Employee | null = await prisma.user.findUnique({
    where: { id: workerId },
    include: {
      Organization: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!worker) {
    workerType = 'Employee';
    worker = await prisma.employee.findUnique({
      where: { id: workerId },
    });
  }

  const responses = await prisma.surveyResponse.findFirst({
    where: { Employee: { id: workerId }, User: { id: workerId } },
  });

  if (!responses) {
    return NextResponse.json(
      { success: false, error: 'No se encontraron respuestas de encuesta para este trabajador', workerType, worker, surveyQuestions: survey },
      { status: 200 }
    );
  }

  return NextResponse.json({
    success: true,
    responses,
    workerType,
    worker,
    surveyQuestions: survey
  });
}