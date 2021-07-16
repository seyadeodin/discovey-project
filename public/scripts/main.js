const Modal = {
    open(){
        document.querySelector('.modal-wrapper').classList.add('active')  
    },
    close(){
        document.querySelector('.modal-wrapper').classList.remove('active')
    }
}

const modalTitle = document.querySelector('.modal h2')
const modalDescription = document.querySelector('.modal p')
const modalButton = document.querySelector('.modal button.red')

const readButton = document.querySelectorAll('.actions a.check')
readButton.forEach(button => {

    button.addEventListener('click', event => handleClick(event))
})

const deleteButton = document.querySelectorAll('.actions a.delete')
deleteButton.forEach(button => {

    button.addEventListener('click', event => handleClick(event, false))
})

function  handleClick(event, check = true){

    event.preventDefault()
    //prevent links from behavior like links not addin the # at the end
    const slug = check ? "check" : "delete"
    const roomId = document.querySelector("#room-id").dataset.id
    const questionId = event.target.dataset.id

    const form = document.querySelector('.modal form')
    form.setAttribute("action", `/question/${roomId}/${questionId}/${slug}`)

    modalTitle.innerHTML = check ? 'Marcar como lida' :'Excluir Pergunta'
    modalDescription.innerHTML = check ? 'Tem certeza que deseja marcar esta pergunta como lida?' 
    : 'Tem certeza que deseja excluir esta pergunta?'
    modalButton.innerHTML = check ? 'Sim, marcar' : 'Sim, excluir'
    // maybe a simple if statement would be easier?
    
    check ? modalButton.classList.remove('red') :  modalButton.classList.add('red')

    // conditional or ternary: condition ? exprIfTrue : exprIfFalse
    //${text.toLowerCase()} to alter text in a template string
    Modal.open()
}

const cancelButton = document.querySelector('div.button.grey')
cancelButton.addEventListener('click', event => Modal.close())


