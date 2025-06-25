// /app/api/projects/[id]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/app/backend/db";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const projectId = parseInt(params.id);
    const data = await request.json();

    // First, delete existing relationships
    await prisma.projectCategory.deleteMany({
      where: { projectId },
    });

    await prisma.projectTag.deleteMany({
      where: { projectId },
    });

    // Create or find categories
    const categories = await Promise.all(
      data.categories.map(async (name: string) => {
        return prisma.category.upsert({
          where: { name },
          update: {},
          create: { name },
        });
      }),
    );

    // Create or find tags
    const tags = await Promise.all(
      data.tags.map(async (name: string) => {
        return prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
        });
      }),
    );

    // Update the project with new relationships
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        categories: {
          create: categories.map((category) => ({
            category: {
              connect: { id: category.id },
            },
          })),
        },
        tags: {
          create: tags.map((tag) => ({
            tag: {
              connect: { id: tag.id },
            },
          })),
        },
      },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    // Transform the response
    const transformedProject = {
      id: updatedProject.id,
      title: updatedProject.title,
      description: updatedProject.description,
      link: updatedProject.link,
      categories: updatedProject.categories.map((pc) => ({
        id: pc.category.id,
        name: pc.category.name,
      })),
      tags: updatedProject.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
      })),
    };

    return NextResponse.json(transformedProject);
  } catch (e) {
    console.error("Error updating project:", e);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const projectId = parseInt(params.id);

    // Delete the project (relationships will be deleted automatically due to CASCADE)
    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (e) {
    console.error("Error deleting project:", e);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
