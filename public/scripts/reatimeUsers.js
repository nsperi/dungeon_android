const socket = io()
socket.on('users', (data) => {


    let list = document.querySelector('#usersList')

    let template = ``
        template = data.map(each=>`
        <div class="card m-2" style="width: 18rem; height: 30rem; ">
            <div class="card-body">
                <h5 class="card-title text-center">${each.name}</h5>
            </div>
            <img style='height:10rem w-50' src="${each.photo}" class="card-img-top; object-fit-cover" alt="${each.id}">
            <div class="card-body">
                <h5 class="card-title text-center">${each.email}</h5>
            </div>
        </div>
        `).toReversed().splice( 0, 6 ).join("") 
    list.innerHTML = template
})

document.querySelector('#register').addEventListener("click", (event)=>{
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const photo = document.querySelector("#photo").value
    socket.emit("register", {email, password, photo})
})