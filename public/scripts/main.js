import Modal from './modal.js'
const modal = Modal()

const modalH2 = document.querySelector(".modal h2")
const modalP = document.querySelector(".modal p")
const modalbtn = document.querySelector(".modal button")


const buttonsCheck = document.querySelectorAll(".actions a.check")

buttonsCheck.forEach(button =>{

    button.addEventListener("click", handleclick)

})

const deleteButton = document.querySelectorAll(".actions a.delete")

deleteButton.forEach(button => {
 button.addEventListener("click", event => handleclick(event, false))
})

function handleclick(event, check = true){
    event.preventDefault()

    let text = check ? "Marcar como lida" : "Excluir"
    const slug = check ? "check" : "delete"
    const roomid = document.querySelector('#room-id').dataset.id
    const form = document.querySelector('.modal form')
    const questionid = event.target.dataset.id
    
    form.setAttribute("action", `/question/${roomid}/${questionid}/${slug}`)

    modalH2.innerHTML = `${text} esta pergunta`

    modalP.innerHTML = `Tem certeza que deseja ${text.toLocaleLowerCase()} esta pergunta?`

    modalbtn.innerHTML = `Sim, ${text.toLocaleLowerCase()}` 

    check ? modalbtn.classList.remove("red") : modalbtn.classList.add("red")

    modal.open()

    
}

