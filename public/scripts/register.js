document.querySelector('#register').addEventListener('click', async () =>{
    const data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
        photo: documento.querySelector('#photo').value,
    }
    const opts = {
        method: 'POST',
        headers: {'Context-Type' : 'application/json'},
        body: JSON.stringify(data)
    }
    let response = await fetch('/api/session/register', opts)
    response = await response.json();
    if (response.statusCode === 201) {
        location.replace('/')
    }
    return alert(response.message)
})
