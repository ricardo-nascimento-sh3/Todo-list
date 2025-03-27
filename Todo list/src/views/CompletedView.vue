<template>
  <div>
    <h1>Tarefas Concluídas</h1>
    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in completedTasks" :key="index">
          <td>{{ task.task }}</td>
          <td>{{ task.description }}</td>
          <td>
            <button @click="deleteCompletedTask(index)">🗑️ Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || []
    }
  },
  methods: {
    deleteCompletedTask(index) {
      this.completedTasks.splice(index, 1) // Remove do array
      localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks)) // Atualiza o armazenamento
    }
  }
}
</script>

<style scoped>
div {
  margin-top: 13%;
  margin-left: 310px;
  display: block;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

/* Tabela */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  background-color: #fff;
  color: #000000;
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e1e1e1; /* Linha de separação suave */
}

th {
  text-align: center;
  background-color: #f8f8f8; /* Cor suave para o cabeçalho */
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Títulos de coluna e células */
td {
  font-size: 14px;
  color: #000000;
  line-height: 1.5;
}

/* Hover para as linhas da tabela */
tr:hover {
  background-color: #f1f1f1; /* Cor de destaque ao passar o mouse */
}

/* Botões */
button {
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  transition: 0.3s ease;
  font-weight: 600;
}

button:nth-child(1) {
  background-color: #DC3545;
  color: #fff;
}

button:nth-child(2) {
  background-color: #ffc107;
  color: #333;
}

button:nth-child(3) {
  background-color: #28a745;
  color: #fff;
}

button:hover {
  opacity: 0.8;
}

/* Estilo para ícones dos botões */
button svg {
  margin-right: 5px;
}

h1{
  color: rgb(182, 161, 161);
  text-align: center;
}

</style>
