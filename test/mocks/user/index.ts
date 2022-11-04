import { hashSync } from 'bcryptjs';
export const fakeUsers = [
  {
    id: '7f82fe18-737e-44bb-9bba-067e3583337b',
    username: 'mathsudre',
    avatar_url: 'https://avatars.githubusercontent.com/u/100591242?v=4',
    email: 'math@email.com',    
    password: hashSync('Teste@123', 10),
    steam_user: 'mathsudre',
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
];

export const userCreateTest = {
  id: '4c9c9f63-5374-4e9d-bec9-158fd40852ab',
  username: 'luwny teste',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'adamteste@email.com',
  password: 'Teste@123',
  steam_user: 'luwnySteam',
  gamepass: true,
};

export const userNameAlreadyUsed = {
  username: 'luwny teste',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'adamteste20@email.com',
  password: 'Teste@123',
  steam_user: 'luwnySteam',
  gamepass: true,
};

export const emailAlreadyUsed = {
  username: 'luwny teste50',
  avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
  email: 'adamteste@email.com',
  password: 'Teste@123',
  steam_user: 'luwnySteam',
  gamepass: true,
};

//login mocks

export const mockedUserLogin0 = {
  email: 'math@email.com',    
  password: 'Teste@123'
}

export const mockedUserLogin1 = {
  email: 'adam@email.com',
  password: 'Teste@123'
}



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
