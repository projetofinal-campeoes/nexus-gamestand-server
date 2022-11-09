import { hashSync } from "bcryptjs";

export const bugReportCreateData = {
    page: 'Login',
    description: 'Não consegui efetuar o login com o google'
}

export const bugReportCreateDataVariant = {
    page: 'Cadastro',
    description: 'Não consegui efetuar o cadastro com o google'
}

export const bugReportFakeUsers = [
    {
        id: '7f82fe18-737e-44bb-9bba-067e3583337ad',
        username: 'mathsudrews',
        avatar_url: 'https://avatars.githubusercontent.com/u/100591242?v=4',
        email: 'mathws@email.com',    
        password: hashSync('Teste@123', 10),
        steam_user: 'mathsudre',
        gamepass: true,
    },
    {
        id: '4c9c9f63-5374-4e9d-bec9-990fd49405das',
        username: 'luwnyws',
        avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
        email: 'adamws@email.com',
        password: hashSync('Teste@123', 10),
        steam_user: 'luwny',
        gamepass: true,
    },
];

export const mockedUserLogin0 = {
    email: 'mathws@email.com',    
    password: 'Teste@123'
}

export const mockedUserLogin1 = {
    email: 'adamws@email.com',
    password: 'Teste@123'
}