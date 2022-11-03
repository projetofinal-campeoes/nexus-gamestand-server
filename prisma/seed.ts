import { hashSync } from 'bcryptjs';
// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { username: 'mathsudre' },
    update: {},
    create: {
      username: 'mathsudre',
      avatar_url: '',
      email: 'math@email.com',
      password: hashSync('Teste@654', 10),
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
      password: hashSync('Teste@321', 10),
      steam_user: 'luwny',
      gamepass: true,
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

 //yarn prisma db seed 