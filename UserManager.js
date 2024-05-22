class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("Usuario creado");
  }
  read(){
    return UserManager.#users
  }
}

const usersManager = new UserManager()

usersManager.create({
    name: 'Naty',
    photo: 'photo.png',
    email: 'nsperipolli@gmail.com',
    password: 'abc123',
}) 

usersManager.create({
    name: 'Pepi',
    photo: 'photo.png',
    email: 'pepi@gmail.com',
    password: 'abc123',
}) 

console.log(usersManager.read())