const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list')
const btnCancel = document.querySelector('.app__form-footer__button--cancel')
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description')

const btnRemoverConcluidas = document.querySelector('#btn-remover-concluidas')
const btnRemoverTodas = document.querySelector('#btn-remover-todas')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

let tarefaSeleccionada = null;
let liTarefaSeleccionada = null;

function atualizarTarefas () {
  localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa (tarefa) {
  const li = document.createElement('li');
  li.classList.add('app__section-task-list-item')

  const svg = document.createElement('svg');
  svg.innerHTML = `
        <svg class="app_section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
  `
  const paragrafo = document.createElement('p');
  paragrafo.textContent = tarefa.descricao;
  paragrafo.classList.add('app__section-task-list-item-description')

  const btn = document.createElement('button')
  btn.classList.add('app_button-edit')

  btn.addEventListener('click', ()=>{
    // debugger
    const novaDescricao = prompt('qual e o novo nome da tarefa????')
    if(novaDescricao){
    paragrafo.textContent = novaDescricao;
    tarefa.descricao = novaDescricao;
    atualizarTarefas();
    }

  })

  const imageBtn = document.createElement('img')
  imageBtn.setAttribute('src', './imagens/edit.png');
  btn.append(imageBtn);

  li.append(svg);
  li.append(paragrafo);
  li.append(btn);

    if( tarefa.complete ){
      li.classList.add('app__section-task-list-item-complete')
      btn.setAttribute('disabled', 'true')
    }else{
    li.onclick = () => {
      document.querySelectorAll('.app__section-task-list-item-active')
         .forEach(elemento =>{
            elemento.classList.remove('app__section-task-list-item-active')
         })    
      if(tarefaSeleccionada == tarefa){
        paragrafoDescricaoTarefa = '';
        tarefaSeleccionada = null;
        liTarefaSeleccionada = null;
        return
      }
      tarefaSeleccionada = tarefa
      liTarefaSeleccionada = li
      paragrafoDescricaoTarefa.textContent = tarefa.descricao
      
      // myLi.classList.toggle('active')
      li.classList.add('app__section-task-list-item-active')
    }
  }
  return li
};

btnAdicionarTarefa.addEventListener('click', () => {
  formAdicionarTarefa.classList.toggle('hidden')
})

formAdicionarTarefa.addEventListener('submit', (evento)=>{
  evento.preventDefault();
  const tarefa = {
    descricao: textArea.value
  }
  tarefas.push(tarefa);
  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)
  atualizarTarefas();
  textArea.value = '';
  formAdicionarTarefa.classList.add('hidden');
})

tarefas.forEach(tarefa => {
  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)
})

btnCancel.addEventListener('click', ()=>{
  textArea.value = '';
  formAdicionarTarefa.classList.add('hidden')
})

document.addEventListener('focoFinalizado', ()=>{
  if(tarefaSeleccionada && liTarefaSeleccionada){
    liTarefaSeleccionada.classList.remove('app__section-task-list-item-active')
    liTarefaSeleccionada.classList.add('app__section-task-list-item-complete')
    liTarefaSeleccionada.querySelector('button').setAttribute('disabled', 'true')
    tarefaSeleccionada.complete = true;
    atualizarTarefas();
  }
})

btnRemoverConcluidas.addEventListener('click', ()=>{
  const seletor = ".app__section-task-list-item-complete"
  document.querySelectorAll(seletor).forEach(elemento => {
    elemento.remove()
  })
  tarefas = tarefas.filter(tarefa => !tarefa.complete)
  atualizarTarefas();
})

btnRemoverTodas.addEventListener('click', ()=>{
  const seletor = '.app__section-task-list-item'
  document.querySelectorAll(seletor).forEach(elemento =>{
    elemento.remove()
  })
  console.log('remove')
  atualizarTarefas();
})
