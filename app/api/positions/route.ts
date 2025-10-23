import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/.generated/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const positions = await prisma.position.findMany();
        return NextResponse.json(positions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch positions: ' + error }, { status: 500 });
    }
}