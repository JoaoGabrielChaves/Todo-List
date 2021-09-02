'use strict';

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {

    const item = document.createElement('label');/* criar label */
    item.classList.add('todo_item');/* dar a label class="todo_item" */
    item.innerHTML = `
        <input class="checkbox" type="checkbox" ${status} data-indice=${indice}>
        <div class="text_into">${tarefa}</div>
        <button class="bt-list" type="button"  data-indice=${indice}>✖</button>
    `;
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    };
}

const atualizarTela = () => {
    limparTarefas();
    const banco = getBanco();
    banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {

        if (texto == '') {
            alert('Type something!');
        } else {
            const banco = getBanco();
            banco.push({ 'tarefa': texto, 'status': '' });
            setBanco(banco);
            atualizarTela();
            evento.target.value = '' && focus;

        }
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    atualizarTela();
}

const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

function setFocus() {
    document.getElementById("add_list").focus();
}//Para o foco continuar no input text após a página ser atualizada


document.getElementById('add_list').addEventListener('keypress', inserirItem);
document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela()

