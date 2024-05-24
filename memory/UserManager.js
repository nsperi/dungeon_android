class UserManager {
  static #users = [];
  create(data) {
    try {
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
      if(!data.name, !data.email, !data.password){
        throw new Error('Ingrese todos los datos')
      } else {
          UserManager.#users.push(user);
          console.log("Usuario creado");
      }
    } catch (error) { 
      console.log(error)
    }
  }
  read() {
    try {
      if(UserManager.#users.length > 0) {
        console.log('Todos los usuarios: ', UserManager.#users)
      } else {
          const error = new Error('No hay usuarios que mostrar')
          throw error
      }
    } catch (error) {
      console.log(`An error has ocurred while calling read method: ${error}`)
    }
  }
  readOne(id){
    try {
      if(!id){
        const error = new Error('The ID argument is required while calling de readOne method.')
        throw error
      } else {
        if(UserManager.#users.length>0){
          const one = UserManager.#users.find(user => user.id === id)
          one ? console.log('Usuario encontrado: ', one) : console.log('No se ha encontrado el usuario')
        }else{
          console.log('No hay usuarios guardados')
        }
      }
    } catch (error) {
        console.log(`An error has ocurred while calling readOne method: ${error}`)
    }
  }

  destroyOne(id){
    try {

      if(!id) {
          const error = new Error('The ID argument is required while calling de destroyOne method.')
          throw error
      } else {

          if(UserManager.#users.length > 0) {
              const one = UserManager.#users.find ( user => user.id === id)
              if(one){

                  UserManager.#users = UserManager.#users.filter(user => user.id !== id)
                  console.log('se ha eliminado el usuario: ', one)

              } else {
                  console.log('No se ha encontrado el usuario')
              }
              
          } else {
              console.log('No hay usuarios guardados.')
          }
      }
      
  } catch (error) {
      console.log(`An error has ocurred while calling destroyOne method: ${error}`)            
  }
  }
  update (id, data) {

    try {

        if(!id) {
            const error = new Error('The ID argument is required while calling the update method.')
            throw error
        } else {

            if (UserManager.#users.length === 0) {
                const error = new Error('Not user registered.')
                error.statusCode = 404
                throw error
            } else {

                let userFound = UserManager.#users.find( user => user.id === id)

                if(!userFound) {
                    const error = new Error(`User ID ${id} not found.`)
                    error.statusCode = 404
                    throw error
                } else {
                    userFound = Object.assign(userFound, data)
                    return userFound
                }
            }
        }
        
    } catch (error) {
        console.log(`An error has ocurred while calling update method: ${error}`)            
    }
}
}

const usersManager = new UserManager();

usersManager.create({
  name: "Naty",
  photo: "photo.png",
  email: "nsperipolli@gmail.com",
  password: "abc123",
});

usersManager.create({
  name: "Pepi",
  photo: "photo.png",
  email: "pepi@gmail.com",
  password: "abc123",
});

console.log(usersManager.read())

console.log(usersManager.readOne(2))

console.log(usersManager.readOne(7))

console.log(usersManager.destroyOne(6))

console.log(usersManager.destroyOne(2))

setTimeout(()=>{
    usersManager.read()
}, 2000)