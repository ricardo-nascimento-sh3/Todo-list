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
    
      const confirmed = window.confirm('Você tem certeza de que deseja excluir esta tarefa concluída?');
      if (confirmed) {
        this.completedTasks.splice(index, 1)
        localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks))
      }
    }
  }
}
</script>

<style scoped>
div {
  margin-top: 16%;
  margin-left: 310px;
  display: block;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  background-color: #fff;
  color: #000000;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  text-align: ce;
  border-bottom: 1px solid #e1e1e1;
}

th {
  text-align: center;
  background-color: #f8f8f8;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

td {
  font-size: 14px;
  color: #000000;
  line-height: 1.5;
}

tr:hover {
  background-color: #f1f1f1;
}

button {
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: 0.3s ease;
  font-weight: 600;
}

button:nth-child(1) {
  background-color: #DC3545;
  color: #fff;
}

button:hover {
  opacity: 0.8;
}

button svg {
  margin-right: 5px;
}

h1{
  color: rgb(182, 161, 161);
  text-align: center;
}

td:last-child {
  text-align: center;
}

td{
  width: 500px;
  word-wrap: break-word;
  word-break: break-all;
}

</style>
