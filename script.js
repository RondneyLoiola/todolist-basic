const list = document.querySelector('.list')
const button = document.querySelector('button')
const inputAdd = document.querySelector('input')
const contentEdit = document.querySelector('.content.contentEdit')
const contentAdd = document.querySelector('.content.contentAdd')
const inputEdit = document.querySelector('.inputEdit')
const buttonSave = document.querySelector('.buttonSave')

let currentEditingTask = null;

function add() {
    if (!inputAdd.value.trim()) return

    const newTask = document.createElement('div')
    newTask.className = 'tarefa'

    const divBotoes = document.createElement('div')
    divBotoes.className = 'botoes'

    const check = document.createElement('div')
    check.className = 'check'

    const edit = document.createElement('div')
    edit.className = 'edit'

    const p = document.createElement('p')
    p.textContent = `${inputAdd.value}`

    const remove = document.createElement('div')
    remove.className = 'remove'

    const btnCheck = document.createElement('i')
    btnCheck.className = 'fa-solid fa-check'

    const btnRemove = document.createElement('i')
    btnRemove.className = 'fa-solid fa-x'

    const btnEdit = document.createElement('i')
    btnEdit.className = 'fa-solid fa-pen'


    check.appendChild(btnCheck)
    edit.appendChild(btnEdit)
    remove.appendChild(btnRemove)
    divBotoes.append(check, edit, remove);
    newTask.append(p, divBotoes)
    list.appendChild(newTask)

    inputAdd.focus()
    inputAdd.value = ''

    function checkTask() {
        newTask.classList.toggle('completed')
    }

    btnCheck.addEventListener('click', checkTask)

    btnRemove.addEventListener('click', () => {
        // se a tarefa estiver sendo editada, cancela a edição
        if (currentEditingTask === newTask) {
            cancelEdit()
        }
        newTask.remove()
    })

    btnEdit.addEventListener('click', () => {
        // Se já existe uma tarefa sendo editada, cancela a edição anterior
        if (currentEditingTask && currentEditingTask !== newTask) {
            cancelEdit()
        }

        // Define esta tarefa como a que está sendo editada
        currentEditingTask = newTask

        contentAdd.style.display = 'none'
        contentEdit.style.display = 'flex'
        inputEdit.value = p.textContent
        newTask.style.display = 'none'
        inputEdit.focus()
    })
}


// função para cancelar edição
function cancelEdit() {
    if (currentEditingTask) {
        contentAdd.style.display = 'flex'
        contentEdit.style.display = 'none'
        currentEditingTask.style.display = 'flex'
        currentEditingTask = null
    }
}

buttonSave.addEventListener('click', () => {
    if (currentEditingTask && inputEdit.value.trim()) {
        const p = currentEditingTask.querySelector('p')


        contentAdd.style.display = 'flex'
        contentEdit.style.display = 'none'
        p.textContent = inputEdit.value
        currentEditingTask.style.display = 'flex'

        currentEditingTask = null
    }
})

// Event listener para cancelar edição com ESC
inputEdit.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        cancelEdit()
    }
    if (e.key === 'Enter') {
        buttonSave.click()
    }
})

button.addEventListener('click', add)


// Permite adicionar tarefa com Enter
inputAdd.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        add()
    }
})


