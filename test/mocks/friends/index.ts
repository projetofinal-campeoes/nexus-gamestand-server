import { hashSync } from 'bcryptjs';

export const fakeUsers = [
  {
    id: '8948a669-189a-411d-8d6f-3b8124bd12bb',
    username: 'sid',
    avatar_url: 'https://avatars.githubusercontent.com/u/100426215?v=4',
    email: 'sid@email.com',
    password: hashSync('Teste@123', 10),
    status: true,
    steam_user: 'poteito9',
    gamepass: true,
  },
  {
    id: '4c9c9f63-5374-4e9d-bec9-990fd49405dc',
    username: 'luwny',
    avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
    email: 'adam@email.com',
    password: hashSync('Teste@123', 10),
    steam_user: 'luwny',
    gamepass: true,
  },
  {
    id: '7f82fe18-737e-44bb-9bba-067e3583337b',
    username: 'mathsudre',
    avatar_url: 'https://avatars.githubusercontent.com/u/100591242?v=4',
    email: 'math@email.com',
    password: hashSync('Teste@123', 10),
    steam_user: 'mathsudre',
    gamepass: true,
  },
];

export const invalidCredentials = {
  email: 'juca@mail.com',
  password: '123456',
};

export const loginUser = {
  email: 'sid@email.com',
  password: 'Teste@123',
};

export const addFriend = {
  username: 'luwny',
};

export const invalidFriend = {
  username: 'Teste@123',
};

export const errorShape = expect.objectContaining({
  statusCode: expect.any(Number),
  message: expect.any(String),
  error: expect.any(String),
});

export const userShape = expect.objectContaining({
  id: expect.any(String),
  username: expect.any(String),
  avatar_url: expect.any(String),
  email: expect.any(String),
  status: expect.any(Boolean),
  steam_user: expect.any(String),
  gamepass: expect.any(Boolean),
  created_at: expect.any(String),
  updated_at: expect.any(String),
});

export const friendsShape = expect.objectContaining({
  id: expect.any(String),
  userId: expect.any(String),
  friendId: expect.any(String),
  friendName: expect.any(String),
});

export const userWithFriendsShape = expect.objectContaining({
  id: expect.any(String),
  username: expect.any(String),
  avatar_url: expect.any(String),
  email: expect.any(String),
  status: expect.any(Boolean),
  steam_user: expect.any(String),
  gamepass: expect.any(Boolean),
  created_at: expect.any(String),
  updated_at: expect.any(String),
  friends: expect.any(Array),
});
