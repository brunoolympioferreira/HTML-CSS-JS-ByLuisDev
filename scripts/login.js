function checkIfAnyRoleIsChecked(){
    let list = document.getElementsByName("role");
    let counter = 0;

    for (let radioButton of list) {
        if (radioButton.checked === false) {
            counter++;
        }
    }

    return counter !== list.length;
}

function cadastrar(){
    //Se ele entrou aqui, é porque o form está válido!

    // Checa se alguma role foi selecionada.
    if(checkIfAnyRoleIsChecked() === false) {
        alert('Marque alguma role');
        return;
    }

    //Inicia a massa de dados (payload)
    let payload = {
        role: document.getElementsByName("role")[0].checked === true ? 'dev' : 'cliente',
        fullName: document.querySelector("#fullName").value,
        birthdate: document.querySelector("#birthdate").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    };
 
    //Enviar para a API
    fetch("https://627ab4e24a5ef80e2c1fcc76.mockapi.io/api/users", {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log('Cadastrado com sucesso');
    })
}