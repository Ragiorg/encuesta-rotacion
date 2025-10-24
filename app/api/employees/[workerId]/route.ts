import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/.generated/client";

const prisma = new PrismaClient();

/**
 * PUT /api/employees/[workerId]
 * Update an employee
 */
export async function PUT(request: NextRequest, context: any) {
    const { workerId } = await context.params;
    if (!workerId) return NextResponse.json({ error: "Missing workerId" }, { status: 400 });

    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    if (Object.keys(body).length === 0) {
        return NextResponse.json({ error: "No updatable fields provided" }, { status: 400 });
    }

    try {
        const updated = await prisma.employee.update({
            where: { id: workerId },
            data: body,
        });
        return NextResponse.json(updated);
    } catch (err: any) {
        if (err.code === "P2025") {
            // Prisma: record to update not found
            return NextResponse.json({ error: "Employee not found" }, { status: 404 });
        }
        console.error("PUT /employees/[workerId] error:", err);
        return NextResponse.json({ error: "Failed to update employee" }, { status: 500 });
    }
}

/**
 * DELETE /api/employees/[workerId]
 * Delete an employee and all related SurveyResponses and related records.
 *
 * NOTE: Adjust model names (surveyResponse, surveyAnswer, surveyAttachment, ...)
 * to match your Prisma schema. This example deletes:
 *  - all SurveyAnswer rows linked to the employee's SurveyResponses
 *  - all SurveyAttachment rows linked to the responses
 *  - all SurveyResponse rows for the employee
 *  - the Employee row
 *
 * If your DB has cascading deletes set up, you can simplify by only deleting the employee.
 */
export async function DELETE(req: NextRequest, context: any) {
    const { workerId } = await context.params;
    if (!workerId) return NextResponse.json({ error: "Missing workerId" }, { status: 400 });

    try {
        // Ensure employee exists
        const employee = await prisma.employee.findUnique({ where: { id: workerId }, select: { id: true } });
        if (!employee) return NextResponse.json({ error: "Employee not found" }, { status: 404 });

        // Find all survey response IDs for this employee
        const responses = await prisma.surveyResponse.findMany({
            where: { Employee: { id: workerId } },
            select: { id: true },
        });

        const responseIds = responses.map((r) => r.id);

        // Build transaction steps. Adjust model names to your schema.
        const steps: any[] = [];

        if (responseIds.length > 0) {

            // finally delete the responses themselves
            steps.push(
                prisma.surveyResponse.deleteMany({
                    where: { id: { in: responseIds } },
                })
            );
        }

        // delete the employee
        steps.push(prisma.employee.delete({ where: { id: workerId } }));

        await prisma.$transaction(steps);

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("DELETE /employees/[workerId] error:", err);
        return NextResponse.json({ error: "Failed to delete employee and related data" }, { status: 500 });
    }
}