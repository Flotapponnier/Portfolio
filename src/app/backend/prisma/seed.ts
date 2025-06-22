import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const projectsData = [
    {
      title: "Minishell",
      categories: ["c"],
      tags: ["C", "Bash"],
      description:
        "Minishell is a very complete project made with Peu77's (who made a very good job) who mostly work in the parsing part, i mostly work in the execution part. Reproducing bash behavior including : pipe / and / or / parenthesis / redirection",
      link: "https://github.com/Peu77/minishell",
    },
    {
      title: "Inception",
      categories: ["dorker"],
      tags: ["Dorker", "Virtual Machine", "bash"],
      description:
        "Inception project is a docker-compose project that will deploy and connect 3 docker container containing : Nginx / Wordpress / Mariadb, deploying on a reverse proxy a wordpress website connected to a database",
      link: "https://github.com/Flotapponnier/Inception-42",
    },
    {
      title: "Cub3d",
      categories: ["c"],
      tags: ["C", "Mlx", "Raycasting"],
      description:
        "made with ilindaniel Cub3d is a graphic game made with the MLX42 library that copying the famous first 3d game with Raycasting Wolfenstein made by John Carmack. I mostly focus on the DDA and Brensham's Line algorithm, where my partner focus on texture and parsing",
      link: "https://github.com/Flotapponnier/Cub3d",
    },
  ];

  for (const proj of projectsData) {
    // Créer les catégories liées en vérifiant si elles existent (upsert)
    const categories = await Promise.all(
      proj.categories.map(async (cat) => {
        return prisma.category.upsert({
          where: { name: cat },
          update: {},
          create: { name: cat },
        });
      }),
    );

    // Créer les tags liés en vérifiant si elles existent (upsert)
    const tags = await Promise.all(
      proj.tags.map(async (tag) => {
        return prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      }),
    );

    // Créer le projet en lien avec catégories et tags
    await prisma.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        link: proj.link,
        categories: {
          connect: categories.map((c) => ({ id: c.id })),
        },
        tags: {
          connect: tags.map((t) => ({ id: t.id })),
        },
      },
    });
  }

  console.log("Seed done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
