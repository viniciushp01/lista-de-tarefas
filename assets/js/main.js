const inputTarefa = document.querySelector(".tarefa");
const addTarefa = document.querySelector(".add-tarefa");
const listaTarefa = document.querySelector(".lista-tarefas");

//Criar a linha dentro da lista
function addLi() {
  const li = document.createElement("li");
  return li;
}

// Limpar o input
function limpaInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

//Botão de apagar item da lista
function criaBotaoApagar(li) {
  li.innerText += " ";
  const botaoApagar = document.createElement("button");
  botaoApagar.innerText = "Apagar";
  botaoApagar.setAttribute("class", "btn-apagar");
  botaoApagar.setAttribute("title", "Apague este item da lista");
  li.appendChild(botaoApagar);
}

//Criando um evento para o funcionamento do botão apagar
document.addEventListener("click", function (e) {
  const elemento = e.target;
  if (elemento.classList.contains("btn-apagar")) {
    elemento.parentElement.remove();
    salvaTarefa();
  }
});

//Adiciona a linha dentro de lista
function addListaTarefa(input) {
  const li = addLi();
  li.innerText = input;
  listaTarefa.appendChild(li);
  limpaInput();
  criaBotaoApagar(li);
  salvaTarefa();
}

//Evento para o funcionamento da tecla "Enter" que adiciona itens na lista
inputTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    addListaTarefa(inputTarefa.value);
  }
});

//Evento do botão adicionar tarefa
addTarefa.addEventListener("click", function () {
  if (!inputTarefa.value) return;
  addListaTarefa(inputTarefa.value);
});

//Salvar tarefas
function salvaTarefa() {
  const liTarefas = listaTarefa.querySelectorAll("li");
  const listaDeTarefas = [];
  for (let tarefas of liTarefas) {
    let tarefaTexto = tarefas.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

//Função para ler as tarefas e jogá-las de volta no navegador
function addTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);
  for (let tarefa of listaDeTarefas) {
    addListaTarefa(tarefa);
  }
}
addTarefasSalvas();
