import { NextResponse } from "next/server";
import prisma from "@/app/backend/db";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const data = await request.json();

    // Update project with new relations
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

    // Clean up orphaned categories and tags (delete those no longer linked to any project)
    await Promise.all([
      prisma.category.deleteMany({ where: { projectId: null } }),
      prisma.tag.deleteMany({ where: { projectId: null } }),
    ]);

    return NextResponse.json(updatedProject);
  } catch (e) {
    console.error("Error updating project:", e);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    // Delete project
    await prisma.project.delete({
      where: { id }
    });

    // Clean up orphaned categories and tags (delete those no longer linked to any project)
    await Promise.all([
      prisma.category.deleteMany({ where: { projectId: null } }),
      prisma.tag.deleteMany({ where: { projectId: null } }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (e) {
    console.error("Error deleting project:", e);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}