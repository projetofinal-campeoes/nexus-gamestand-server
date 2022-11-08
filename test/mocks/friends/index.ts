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
  email: 'juca@mail.com',
  password: '123456',
};

export const loginUser = {
  email: 'matheus@email.com',
  password: 'Teste@123',
};

export const addFriend = {
  username: 'luw',
};

export const userShape = expect.objectContaining({
  id: expect.any(String),
  username: expect.any(String),
  avatar_url: expect.any(String),
  email: expect.any(String),
  password: expect.any(String),
  status: expect.any(Boolean),
  steam_user: expect.any(String),
  gamepass: expect.any(Boolean),
  created_at: expect.any(String),
  updated_at: expect.any(String),
});

export const userWithFriendsShape = expect.objectContaining({
  id: expect.any(String),
  username: expect.any(String),
  avatar_url: expect.any(String),
  email: expect.any(String),
  password: expect.any(String),
  status: expect.any(Boolean),
  steam_user: expect.any(String),
  gamepass: expect.any(Boolean),
  created_at: expect.any(String),
  updated_at: expect.any(String),
  friends: expect.any(Object),
});

export const friendsShape = expect.objectContaining({
  id: expect.any(String),
  userId: expect.any(String),
  friendId: expect.any(String),
  friendName: expect.any(String),
});
