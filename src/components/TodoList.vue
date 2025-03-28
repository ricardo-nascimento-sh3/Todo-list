<template>
  <table>
    <thead>
      <tr>
        <th>Tarefa</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(task, index) in tasks" :key="index">
        <td>
          <input
            v-if="editingIndex === index"
            v-model="editedTask"
            @keyup.enter="saveEdit(index)"
            class="edit-input"
            placeholder="Edite a tarefa..."
          />
          <span v-else>{{ task.task }}</span>
        </td>

        <td>
          <input
            v-if="editingIndex === index"
            v-model="editedDescription"
            @keyup.enter="saveEdit(index)"
            class="edit-input"
            placeholder="Edite a descrição..."
          />
          <span v-else>{{ task.description }}</span>
        </td>

        <td>
          <template v-if="editingIndex === index">
            <button @click="saveEdit(index)" class="save-btn">💾 Salvar</button>
            <button @click="cancelEdit" class="cancel-btn">❌ Cancelar</button>
          </template>
          <template v-else>
            <button @click="completeTask(index)" class="complete-btn">✅ Concluído</button>
            <button @click="startEdit(index, task)" class="edit-btn">✏️ Editar</button>
            <button @click="confirmDelete(index)" class="delete-btn">🗑️ Excluir</button>
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  props: ['tasks'],
  data() {
    return {
      editingIndex: null,
      editedTask: '',
      editedDescription: ''
    };
  },
  methods: {
    startEdit(index, task) {
      this.editingIndex = index;
      this.editedTask = task.task;
      this.editedDescription = task.description;
    },
    saveEdit(index) {
      if (this.editedTask.trim() !== '' && this.editedDescription.trim() !== '') {
        this.$emit('edit-task', index, {
          task: this.editedTask,
          description: this.editedDescription
        });
        this.editingIndex = null;
        this.showSuccessToast('Tarefa editada com sucesso!');
      }
    },
    cancelEdit() {
      this.editingIndex = null;
    },
    completeTask(index) {
      this.$emit('complete-task', index);
      this.showSuccessToast('Tarefa concluída com sucesso!');
    },
    confirmDelete(index) {
      Swal.fire({
        title: 'Tem certeza que deseja excluir essa tarefa?',
        text: 'Essa ação não poderá ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        customClass: {
          container: 'swal-container-center'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.$emit('delete-task', index);
          this.showSuccessToast('Tarefa excluída com sucesso!');
        }
      });
    },
    
    showSuccessToast(message) {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 2000,
        toast: true, // Deixa o balão de notificação como toast
        background: '#28a745', // Cor verde
        color: '#fff', // Texto branco
        customClass: {
          container: 'toast-container',
        }
      });
    }
  }
};
</script>

<style scoped>
/* Estilos gerais */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

/* Centralizando a caixa de confirmação */
.swal-container-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99999;
}

/* Melhorando os inputs de edição */
.edit-input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;
  background: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.edit-input:focus {
  border-color: #007bff;
  box-shadow: 0px 0px 8px rgba(0, 123, 255, 0.5);
}

/* Estilizando a tabela */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  color: #333;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e1e1e1;
}

th {
  text-align: center;
  background-color: #f8f8f8;
  font-size: 16px;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
}

td {
  font-size: 14px;
  color: #000;
  line-height: 1.5;
}

/* Melhorando os botões */
button {
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: 1px solid transparent;
  transition: 0.3s ease;
  font-weight: 600;
  margin-left: 5px;
}

.save-btn {
  background-color: #28a745;
  color: #fff;
}

.cancel-btn {
  background-color: #dc3545;
  color: #fff;
}

.complete-btn {
  background-color: #28a745;
  color: #fff;
}

.edit-btn {
  background-color: #ffc107;
  color: #fff;
}

.delete-btn {
  background-color: #dc3545;
  color: #fff;
}

button:hover {
  opacity: 0.8;
}

td:last-child {
  text-align: center;
  width: 350px;
}

td {
  word-wrap: break-word; /* Quebra palavras longas para evitar overflow */
  word-break: break-all;
}

</style>
