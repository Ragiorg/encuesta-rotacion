import { NextResponse } from 'next/server';
import { PrismaClient } from '@/.generated/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const departments = await prisma.department.findMany();
        return NextResponse.json(departments);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch departments: ' + error }, { status: 500 });
    }
}