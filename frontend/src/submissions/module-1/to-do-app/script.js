const todoInput = document.querySelector('.todo-input')
const addBtn = document.querySelector('.add-btn');
const todoList = document.querySelector('.todo-list')



addBtn.addEventListener('click', ()=>{
    //const target = event.target;
    const input = todoInput.value;
    if(input == ""){
        return;
    }
    const list = document.createElement('li')
    const deleteBtn = document.createElement('button')
    deleteBtn.value = "X"
    deleteBtn.textContent = "X"
    deleteBtn.className = "deleteBtn"
    deleteBtn.style.backgroundColor = '#e15555'; // Give it a quick red styling
    deleteBtn.style.color = '#fff';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.style.cursor = 'pointer';
    deleteBtn.style.padding = '4px 8px';
    list.textContent = input;
    list.appendChild(deleteBtn)

    todoList.appendChild(list)
    todoInput.value = "";
})

todoList.addEventListener('click', ()=>{
    const target = event.target;
    if(target.value ==="X"){
        const li = target.parentElement;
        li.remove();
    }
})