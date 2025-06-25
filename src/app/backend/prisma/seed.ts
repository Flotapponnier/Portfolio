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
      categories: ["docker"],
      tags: ["Docker", "Virtual Machine", "bash"],
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
    {
      title: "Ft_irc",
      categories: ["c", "cpp"],
      tags: ["websocket", "irssi"],
      description:
        "Ft_irc is an irc server made with the irc client irssi in c++, lead me to increase my knowledge about websocket and be confident with c++, team project made with RaminSanei and MMansurii",
      link: "https://github.com/MMansurii/ft_irc",
    },
  ];

  for (const proj of projectsData) {
    // Create or find categories
    const categories = await Promise.all(
      proj.categories.map(async (cat) => {
        return prisma.category.upsert({
          where: { name: cat },
          update: {},
          create: { name: cat },
        });
      }),
    );

    // Create or find tags
    const tags = await Promise.all(
      proj.tags.map(async (tag) => {
        return prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      }),
    );

    // Create the project with many-to-many relationships
    await prisma.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        link: proj.link,
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
