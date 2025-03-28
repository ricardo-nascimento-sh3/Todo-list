<template>
  <div>
    
    <h1>Tarefas Concluídas</h1>

    <table>
      <thead>
        <tr>
          <th>Tarefa</th>
          <th>Descrição</th>
          <th>Data de Criação</th>
          <th>Data de Conclusão</th>
          <th>Ações</th>
        </tr>
      </thead>

      <tbody>

        <tr v-for="(task, index) in completedTasks" :key="index">
          <td>{{ task.task }}</td>
          <td>{{ task.description }}</td>
          <td>{{ formatDate(task.date) }}</td> 
          <td>{{ formatDate(task.completedAt) }}</td>
          <td>
            <button @click="deleteCompletedTask(index)">🗑️ Excluir</button>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      completedTasks: JSON.parse(localStorage.getItem('completedTasks')) || []
    }
  },
  methods: {
    deleteCompletedTask(index) {
      Swal.fire({
      title: 'Você tem certeza que deseja excluir essa tarefa?',
      text: 'Essa ação não pode ser desfeita.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      background: '#fff',
      customClass: {
        confirmButton: 'confirm-btn',
        cancelButton: 'cancel-btn',
      }
      }).then((result) => {
        if (result.isConfirmed) {
          this.completedTasks.splice(index, 1);
          localStorage.setItem('completedTasks', JSON.stringify(this.completedTasks));
          this.showSuccessToast('Tarefa excluída com sucesso!');
        }
      });
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    },
    showSuccessToast(message) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: '#28a745',
        color: '#fff',
        customClass: {
          container: 'toast-container',
        }
      });
    }
  }
}
</script>

<style scoped>
.confirm-btn {
  background-color: #28a745;
  color: #fff;
}

.cancel-btn {
  background-color: #dc3545;
  color: #fff;
}

div {
  margin-top: 12%;
  margin-left: 235px;
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

td:nth-child(3),
td:nth-child(4),
td:last-child {
  text-align: center;
}

td{
  width: 500px;
  word-wrap: break-word;
  word-break: break-all;
}

</style>
