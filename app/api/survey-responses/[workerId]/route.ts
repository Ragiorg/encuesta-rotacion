import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Employee, User } from '@/.generated/client';
import survey from '@/constants/survey.json';

export async function GET(request: Request, context: any ) {
  const { workerId } = await context.params;

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
      Organization: true,
      department: true,
      position: true,
    },
  });

  if (!worker) {
    workerType = 'Employee';
    worker = await prisma.employee.findUnique({
      where: { id: workerId },
      include: {
        Organization: true,
        department: true,
        position: true,
      },
    });
  }
  

  // only query if there's a non-null surveyId to satisfy Prisma types
  const surveyId = worker?.surveyId ?? undefined;

  const responses = surveyId
    ? await prisma.surveyResponse.findFirst({
        where: { id: surveyId },
      })
    : null;

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