import { NextResponse } from "next/server";
import prisma from "@/app/backend/db";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
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

    // Transform the data to match your frontend expectations
    const transformedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      link: project.link,
      categories: project.categories.map((pc) => ({
        id: pc.category.id,
        name: pc.category.name,
      })),
      tags: project.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
      })),
    }));

    return NextResponse.json(transformedProjects);
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

    // Create the project
    const project = await prisma.project.create({
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
      id: project.id,
      title: project.title,
      description: project.description,
      link: project.link,
      categories: project.categories.map((pc) => ({
        id: pc.category.id,
        name: pc.category.name,
      })),
      tags: project.tags.map((pt) => ({
        id: pt.tag.id,
        name: pt.tag.name,
      })),
    };

    return NextResponse.json(transformedProject);
  } catch (e) {
    console.error("Error creating project:", e);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
