import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/.generated/client";
import { sendReminderEmail } from "@/lib/email_service";
const prisma = new PrismaClient();


export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const {
        organizationId,
        employeeId,
        ...rest
    } = body;

    // Validate request
    if (!employeeId) {
        return NextResponse.json({ error: 'Employee ID is required' }, { status: 400 });
    }
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) {
        return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
    }
    const organization = await prisma.organization.findUnique({ where: { id: organizationId } });
    if (!organization) {
        return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
    }

    // Construct base URL from headers
    const host = req.headers.get('host');
    const protocol = req.headers.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    // Send survey reminder
    try {
        if(await sendReminderEmail(employee, baseUrl, organization)) {
            console.log(`Survey reminder sent to ${employee.email}`);
            return NextResponse.json({ message: 'Survey reminder sent' }, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Failed to send survey reminder' }, { status: 500 });
        }
    } catch (error) {
        console.error('Error sending survey reminder:', error);
        return NextResponse.json({ error: 'Failed to send survey reminder' }, { status: 500 });
    }
};
