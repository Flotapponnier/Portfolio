import { NextResponse } from "next/server";
import prisma from "@/app/backend/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: { categories: true, tags: true },
    });
    return NextResponse.json(projects);
  } catch {
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
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const project = await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        link: data.link,
        categories: {
          // Ici tu peux gérer la relation (disconnect/connect) selon ta logique
          // Pour simplifier, supprime et recrée les catégories ?
        },
        tags: {
          // pareil pour les tags
        },
      },
      include: { categories: true, tags: true },
    });
    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ message: "Project deleted" });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}
