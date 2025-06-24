import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/backend/db";

export async function PUT(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idParam = url.pathname.split("/").pop(); // get last segment (the id)

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400 },
      );
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const data = await request.json();

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        categories: {
          connectOrCreate: data.categories.map((name: string) => ({
            where: { name },
            create: { name },
          })),
          set: [], // Clear existing connections first
        },
        tags: {
          connectOrCreate: data.tags.map((name: string) => ({
            where: { name },
            create: { name },
          })),
          set: [], // Clear existing connections first
        },
      },
      include: { categories: true, tags: true },
    });

    // Clean orphan cleanup
    await Promise.all([
      prisma.category.deleteMany({ where: { projectId: null } }),
      prisma.tag.deleteMany({ where: { projectId: null } }),
    ]);

    return NextResponse.json(updatedProject);
  } catch (e) {
    console.error("Error updating project:", e);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const idParam = url.pathname.split("/").pop();

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing project ID" },
        { status: 400 },
      );
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    await prisma.project.delete({ where: { id } });

    await Promise.all([
      prisma.category.deleteMany({ where: { projectId: null } }),
      prisma.tag.deleteMany({ where: { projectId: null } }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("Error deleting project:", e);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}

