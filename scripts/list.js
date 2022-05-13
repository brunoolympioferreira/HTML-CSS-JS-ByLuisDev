let list = [];

window.onload = function () {
    //get no nome e role do usuario
    document.querySelector("#name").innerText = localStorage.getItem("userName");
    document.querySelector("#role").innerText = localStorage.getItem("role");

    getProjects();

    function getProjects() {
        fetch("https://627ab4e24a5ef80e2c1fcc76.mockapi.io/api/projects")
            .then(response => response.json())
            .then(response => {
                list = response;
                buildTable();
            })
    }

}

function goToEdit(id) {
    window.location.href = `project-create-edit.html?id=${id}`;
}

function deleteProject(id) {
    fetch(`https://627ab4e24a5ef80e2c1fcc76.mockapi.io/api/projects/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(response => {
            list = list.filter(project => project.id != id);

            buildTable();
        })
}

function buildTable() {
    document.querySelector("#table-body").innerHTML = '';
    const idClient = localStorage.getItem('idClient');

    list = list.filter(el => el.idClient === idClient);

    list.forEach(el => {

        let template = `
        <div class="row">
            <div class="title-description">
                <h6 class="title">${el.title}</h6>
                <p class="description">${el.description}</p>
            </div>
            <div class="price">R$ ${el.totalCost}</div>
            <div class="actions">
                <span class="edit material-icons" onClick="goToEdit(${el.id})">edit</span>
                <span class="delete material-icons" onClick="deleteProject(${el.id})">delete</span>
            </div>
        </div>
            `
        document.querySelector("#table-body").insertAdjacentHTML("beforeend", template)
    });
}