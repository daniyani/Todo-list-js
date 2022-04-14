let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

let todoList = [];
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));
    displayMessages();
}


addButton.addEventListener('click', () => {
    if (addMessage.value == '') {
        return false;
    }
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false,
    };
    todoList.push(newTodo);
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});



function displayMessages() {
    let displayMessage = '';
    if (todoList.length === 0) {
        todo.innerHTML = '';
    }
    todoList.forEach((item, i) => {
        displayMessage +=
            `
        <li>
        <input type='checkbox' id=${item.todo} ${item.checked ? 'checked' : ''}>
        <label for=${item.todo} class='${item.important ? 'important' : ''}'>${item.todo}</label>
        </li>
        `
    })

    todo.innerHTML = displayMessage;

}


todo.addEventListener('click', event => {
    let idInput = event.target.getAttribute('id');
    todoList.forEach(item => {
        if (item.todo === idInput) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});


todo.addEventListener('contextmenu', event => {
    event.preventDefault();
    todoList.forEach((item, i) => {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(i, 1);
            } else {
                item.important = !item.important;
            }
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    })
})