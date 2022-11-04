import { hashSync } from 'bcryptjs';

export const fakeUsersLogin = [
    {
      id: '7f82fe18-737e-44bb-9bba-067e3583337l',
      username: 'math',
      avatar_url: 'https://avatars.githubusercontent.com/u/100591242?v=4',
      email: 'matheus@email.com',
      password: hashSync('Teste@123', 10),
      steam_user: 'mathsudre',
      gamepass: true,
    },
    {
      id: '4c9c9f63-5374-4e9d-bec9-990fd49405da',
      username: 'luw',
      avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
      email: 'adao@email.com',
      password: hashSync('Teste@123', 10),
      steam_user: 'luwny',
      gamepass: true,
    },
  ];

export const invalidCredentials = {
    email: "juca@mail.com",
    password: "123456"
}

export const loginUser = {
    email: "matheus@email.com",
    password: "Teste@123"
}

export const loginUser2 = {
    email: "adam@email.com",
    password: "Teste@123"
}

export const loginUser3 = {
    email: "adam",
    password: "Teste@123"
}

export const loginShape = expect.objectContaining({
    token: expect.any(String)
});