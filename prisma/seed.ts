// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const user1 = await prisma.user.upsert({
    where: { username: 'mathsudre' },
    update: {},
    create: {
      username: 'mathsudre',
      avatar_url: '',
      email: 'math@email.com',
      password: '123456',
      steam_user: 'mathsudre',
      gamepass: true,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { username: 'luwny' },
    update: {},
    create: {
      username: 'luwny',
      avatar_url: '',
      email: 'adam@email.com',
      password: '123456',
      steam_user: 'luwny',
      gamepass: true,
    },
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
