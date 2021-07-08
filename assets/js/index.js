const form = document.querySelector("#form");
const adicionarTarefaBtn = document.querySelector("#btn-addTarefa");
const listaTarefas = document.querySelector("#listaTarefas");
const nomeTarefa = document.querySelector("#nomeTarefa");

adicionaTarefasSalvas();

adicionarTarefaBtn.addEventListener("click", adicionarTarefaFunc);
nomeTarefa.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) adicionarTarefaFunc;
});

document.addEventListener("click", function (e) {
  const elemento = e.target;
  if (elemento.getAttribute("class") == "btnApagar") {
    removerTarefa(elemento);
    salvarTarefa();
  }
});

function adicionarTarefaFunc(event) {
  event.preventDefault();
  if (!nomeTarefa.value) return;
  let novaTarefa = criarNovaTarefa(nomeTarefa.value);
  listaTarefas.appendChild(novaTarefa);
  nomeTarefa.value = null;
  nomeTarefa.focus();
  salvarTarefa();
}

function salvarTarefa() {
  const liTarefas = listaTarefas.querySelectorAll("li");
  const listaDeTarefas = [];
  for (let tarefa of liTarefas) {
    let tarefaTexto = tarefa.innerText;
    tarefaTexto = tarefaTexto.replace("Apagar", "");
    listaDeTarefas.push(tarefaTexto);
  }
  const tarefasJSON = JSON.stringify(listaDeTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

function adicionaTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaDeTarefas = JSON.parse(tarefas);
  listaDeTarefas.forEach((x) => {
    let novaTarefa = criarNovaTarefa(x);
    listaTarefas.appendChild(novaTarefa);
    nomeTarefa.value = null;
    nomeTarefa.focus();
  });
}

function removerTarefa(elemento) {
  const paterno = elemento.parentElement;
  listaTarefas.removeChild(paterno);
}

function criarNovaTarefa(nomeDaTarefa) {
  let novaTarefa = document.createElement("li");
  let btnApagar = document.createElement("button");
  novaTarefa.appendChild(document.createTextNode(nomeDaTarefa));
  btnApagar.setAttribute("class", "btnApagar");
  btnApagar.appendChild(document.createTextNode("Apagar"));
  btnApagar.style.marginLeft = "10px";
  novaTarefa.appendChild(btnApagar);
  return novaTarefa;
}
