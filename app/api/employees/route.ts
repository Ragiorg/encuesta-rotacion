import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@/.generated/client';
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
    const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
    const organizationId = searchParams.get('organizationId');
    const searchFilter = searchParams.get('searchFilter') || '';

    if (!organizationId) {
        return NextResponse.json({ error: 'organizationId is required' }, { status: 400 });
    }
    let filterQueryObject: { OR?: any[] } = {};
    if (searchFilter) {
        let employeeNumberFilter = {};
        filterQueryObject = {
            OR: [
                { firstName: { contains: searchFilter, mode: 'insensitive' }},
                { lastName: { contains: searchFilter, mode: 'insensitive' }}
            ]
        };
        if(!isNaN(Number(searchFilter))) {
            employeeNumberFilter = { employeeNumber: Number(searchFilter) };
            (filterQueryObject.OR as any[]).push(employeeNumberFilter);
        }
    }

    const skip = (currentPage - 1) * pageSize;

    try {
        const employees = await prisma.employee.findMany({
            where: { organizationId, ...filterQueryObject },
            orderBy: [{ createdAt: 'desc'}, { updatedAt: 'desc' }],
            skip,
            take: pageSize,
            include: {
                department: true,
                position: true,
                SurveyResponse: true,
            },
        });

        const total = await prisma.employee.count({
            where: { organizationId, ...filterQueryObject },
        });

        return NextResponse.json({
            data: employees,
            total,
            currentPage,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch employees: '+JSON.stringify(error) }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            organizationId,
            firstName,
            middleName,
            lastName,
            employeeNumber,
            departmentId,
            positionId,
            email,
            ...rest
        } = body;

        if (!organizationId || !firstName || !lastName) {
            return NextResponse.json(
                { error: 'organizationId, firstName and lastName are required' },
                { status: 400 }
            );
        }

        const data: Prisma.EmployeeUncheckedCreateInput = {
            organizationId,
            firstName,
            middleName,
            lastName,
            ...rest,
        };

        if (employeeNumber !== undefined && employeeNumber !== null && employeeNumber !== '') {
            const num = Number(employeeNumber);
            if (Number.isNaN(num)) {
                return NextResponse.json({ error: 'employeeNumber must be a number' }, { status: 400 });
            }
            data.employeeNumber = num;
        }

        if (departmentId) data.departmentId = departmentId;
        if (positionId) data.positionId = positionId;
        if (email) data.email = email;

        const created = await prisma.employee.create({
            data: {
                ...data,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                department: true,
                position: true,
                SurveyResponse: true,
            },
        });

        return NextResponse.json(created, { status: 201 });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to create employee: ' + (error?.message ?? String(error)) },
            { status: 500 }
        );
    }
}