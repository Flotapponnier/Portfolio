import { NextResponse } from "next/server";
import prisma from "@/app/backend/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        categories: true,
        tags: true,
      },
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
