import { hashSync } from "bcryptjs";

export const promotionCreateData = {
    name: 'Left 4 Dead - Steam',
    promo_url: 'www.steam.com',
    price: '9.90',
    description: 'Esta rolando promoção do Left 4 Dead na Steam, corre lá pegar!'
}

export const promotionCreateDataVariant = {
    name: 'Cyberpunk 2077 - GOG',
    promo_url: 'www.gog.com',
    price: '100.00',
    description: 'Esta rolando promoção do Cyberpunk na GOG, só precisa se registrar e usar o cupom TOPZERA2077!'
}

export const promotionUpdatedData = {
    name: 'Left 4 Dead - Xbox',
    price: '14.90'
}

export const promotionFakeUsers = [
    {
        id: '7f82fe18-737e-44bb-9bba-067e3583337z',
        username: 'mathsudres',
        avatar_url: 'https://avatars.githubusercontent.com/u/100591242?v=4',
        email: 'maths@email.com',    
        password: hashSync('Teste@123', 10),
        steam_user: 'mathsudre',
        gamepass: true,
    },
    {
        id: '4c9c9f63-5374-4e9d-bec9-990fd49405dd',
        username: 'luwnys',
        avatar_url: 'https://avatars.githubusercontent.com/u/93692439?v=4',
        email: 'adams@email.com',
        password: hashSync('Teste@123', 10),
        steam_user: 'luwny',
        gamepass: true,
    },
];

export const mockedUserLogin0 = {
    email: 'maths@email.com',    
    password: 'Teste@123'
}

export const mockedUserLogin1 = {
    email: 'adams@email.com',
    password: 'Teste@123'
}