import { hashSync } from "bcryptjs";

export const customGameTest = [
  {
    name: 'Counter-Strike',
    image_url: 'test',
    platform: 'steam',
  },
  {
    name: 'Gr',
    image_url: '23',
    platform: 'levelupgames',
  },
  {
    name: 'Half Life 3 Confirmed',
    image_url: 'test',
    platform: 'st',
  },
];

export const accountTest = {
  username: 'testandoInfinito',
  avatar_url: 'https://avatars.githubusercontent.com/u/100591242?v=4',
  email: 'testandoInfinito@email.com',
  password: hashSync('Teste@123', 10),
  steam_user: 'teste123123',
  gamepass: true,
}


export const loginTest = {
  email: 'testandoInfinito@email.com',
  password: 'Teste@123'
}

export const loginTest2 = {
  email: 'testandoInfinito@email.com',
  password: 'Teste@1232'
}


export const invalidCustomGamesTest = [{}];

export const customGamesShape = expect.objectContaining({
  id: expect.any(String),
  name: expect.any(String),
  image_url: expect.any(String),
  platform: expect.any(String),
  userId: expect.any(String),
});