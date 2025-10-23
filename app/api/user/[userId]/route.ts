import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/.generated/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(
    req: NextRequest,
    { params }: { params: { userId: string } }
) {
    const userId = params.userId;
    const data = await req.json();

    const session = await getServerSession(authOptions);

    if (!session || session.user.id !== userId) {
        return NextResponse.json(
            { error: 'Unauthorized access.' },
            { status: 403 }
        );
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data,
        });
        return NextResponse.json({ user: updatedUser }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: 'User not found or update failed.' },
            { status: 400 }
        );
    }
}