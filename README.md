<h1 align="center"> NEXUS GAMES STAND - API</h1>

<p align="center">Este é o backend da aplicação Nexus Games Stand - um hub de plataformas de jogos para o usuário! O objetivo dessa aplicação é conseguir criar um frontend de qualidade, que mostrará ao usuário todos os jogos que ele possui em todas as plataformas, possibilitando busca por nome e outros filtros.</p>

<blockquote align="center">"Irineu, você não sabe nem eu! - Irineu?"</blockquote>

<p align="center">
<a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## **Endpoints**

A API tem um total de 4 endpoints, sendo em volta principalmente do usuário - podendo cadastrar seu perfil, e jogos custom de fora das plataformas que o site oferece suporte.

O url base da API é https://nexus-gamestand-server.herokuapp.com

## Rotas que precisam de autenticação


<h2 align="center"> Criação de usuário </h2>

`POST /register - FORMATO DA REQUISIÇÃO`
```json
{
"email": "exemplo@email.com",
"password": "123456"
"username": "user"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /register - FORMATO DA RESPOSTA - STATUS 201`
```json
{
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4ZW1wbG9AbWFpbC5jb20iLCJpYXQiOjE2NjE4NzUyODMsImV4cCI6MTY2MTg3ODg4Mywic3ViIjoiNiJ9.IZLD9IX961fQ_FSDH34z7bAyKWLQ1VrXbG5sOHTTRXQ",
	"user": {
		"email": "exemplo@email.com",
		"username": "user",
		"id": 1
	}
}
```

<h2 align="center"> Possíveis erros </h2>

Email já cadastrado:

`POST /register - FORMATO DA RESPOSTA - STATUS 400`
```json
{
  "status": "error",
  "message": "Email already exists"
}
```

<h2 align="center">Login</h2>

`POST /login - FORMATO DA REQUISIÇÂO`
```json
{
"email": "exemplo@email.com",
"password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`
```json
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV4ZW1wbG9AbWFpbC5jb20iLCJpYXQiOjE2NjE4NzUyODMsImV4cCI6MTY2MTg3ODg4Mywic3ViIjoiNiJ9.IZLD9IX961fQ_FSDH34z7bAyKWLQ1VrXbG5sOHTTRXQ",
	"user": {
		"email": "exemplo@email.com",
		"username": "user",
		"id": 1,
	}
}
```
Com essa resposta, vemos que temos duas informações, o user e o token respectivo, dessa forma você pode guardar o token e o usuário logado no localStorage para fazer a gestão do usuário no seu frontend.

<h2 align="center">Custom Games</h2>

`POST /custom_games - FORMATO DA REQUISIÇÃO`
```json
{
  "name": "Counter Strike Global Offensive",
  "platform": "steam",
  "image": "https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1641233427",
  "userId": 1
}
```

Caso dê tudo certo, a resposta será assim:

`POST /custom_games - FORMATO DA RESPOSTA - STATUS 201`
```json
{
	"name": "Counter Strike Global Offensive",
	"platform": "steam",
	"image": "https://cdn.akamai.steamstatic.com/steam/apps/730/capsule_616x353.jpg?t=1641233427",
	"userId": 1,
	"id": 1
}
```

Para alterar um custom game já cadastrado:

`PATCH /custom_games/gameId - FORMATO DA REQUISIÇÃO`
```json
{
	"name": "Battlefield 4",
	"platform": "Origin",
  "image": "https://cdn.mcr.ea.com/3/images/d9fd4861-517d-4941-a1b5-fc7d32ecd3ce/1587532055-0x0-0-0.jpg",
  "userId": 1
}
```

Caso dê tudo certo, a resposta será assim:
`PATCH /custom_games/gameId - FORMATO DA RESPOSTA - STATUS 200`
```json
{
	"name": "Battlefield 4",
	"platform": "Origin",
	"userId": 1,
	"id": 1,
	"image": "https://cdn.mcr.ea.com/3/images/d9fd4861-517d-4941-a1b5-fc7d32ecd3ce/1587532055-0x0-0-0.jpg"
}
```

Para deletar um custom game:

`DELETE /custom_games/gameId - FORMATO DA REQUISIÇÃO`
```
Não é necessário um corpo da requisição.
```

<h2 align="center"> Atualizando os dados do perfil </h2>

Assim como o endpoint de custom games, nesse precisamos estar logados, com o token no cabeçalho da requisição. Estes endpoints são para atualizar seus dados como, foto de perfil, username, ou qualquer outra informação em relação ao que foi utilizado na criação do usuário.

Para atualizar a foto de perfil:

`PATCH /users/userId - FORMATO DA REQUISIÇÃO`
```json
{
  "userImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJcerX6FFwOsAN-fVC24kFXpz0dZNvAjFUazzeEoqEag&s"
}
```

Caso dê tudo certo, a resposta será assim:
`PATCH /users/userId - FORMATO DA RESPOSTA`
```json
{
	"email": "exemplo@mail.com",
	"password": "$2a$10$ptiiSlOM59oroae89eBVBuiAzX19xYzAs6tyz69maAGc0GSbuZDye",
	"username": "user",
	"id": 1,
	"userImage": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJcerX6FFwOsAN-fVC24kFXpz0dZNvAjFUazzeEoqEag&s"
}
```
<h1 align="center">👥 Desenvolvedores responsáveis 👥</h1> 
<table align="center">
  <tr>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/93692439?v=4" width="100px;" alt="Foto do Adam"/><br>        
        <sub>
          <b>Adam Neves - Scrum Master</b> <br/>
            <a href="https://github.com/adamsnows" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
            <a href="https://www.linkedin.com/in/adam-neves/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/40778394?v=4" width="100px;" alt="Foto do Yan"/><br>        
        <sub>
            <b>Yan Carlo - Tech Lead</b> <br/>
            <a href="https://github.com/yancarlodev" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/yancarlodev/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
    <td align="center">
        <img src="https://avatars.githubusercontent.com/u/88001200?v=4" width="100px;" alt="Foto do Welton"/><br>        
        <sub>
          <b>Welton Santos - Product Owner</b> <br/>
            <a href="https://github.com/WeltonSantosFr" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
                <a href="https://www.linkedin.com/in/welton-santos-7a2b7b214/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"/>
        </sub>
    </td>
      <td align="center">
        <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" width="100px;" alt="Foto da Katya"/><br>          
        <sub>
          <b>Katya Keila - Quality Assurance</b>  <br/>
            <a href="https://github.com/katyakeila" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" target="_blank"/>
        </sub>
    </td>
    
  </tr>
</table>
