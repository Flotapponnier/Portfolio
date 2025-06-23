// /app/api/projects/route.ts

import { NextResponse } from "next/server";
import prisma from "@/app/backend/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { categories: true, tags: true },
    });
    return NextResponse.json(projects);
  } catch (e) {
    console.error("Error fetching projects:", e);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        categories: {
          connectOrCreate: data.categories.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
        tags: {
          connectOrCreate: data.tags.map((name: string) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { categories: true, tags: true },
    });

    return NextResponse.json(project);
  } catch (e) {
    console.error("Error creating project:", e);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
