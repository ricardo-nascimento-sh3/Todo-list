<template>
  <div>
    <h1>Tarefas Pendentes</h1>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar por tarefa ou descrição..."
      class="search-input"
    />

    <TodoForm @add-task="addTask" />

    <TodoList 
      :tasks="filteredTasks" 
      @complete-task="completeTask" 
      @edit-task="editTask" 
      @delete-task="deleteTask" 
    />
  </div>
</template>

<script>
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'

export default {
  components: { TodoForm, TodoList },
  data() {
    return {
      tasks: JSON.parse(localStorage.getItem('tasks')) || [],
      searchQuery: '',
    }
  },
  
  computed: {
    filteredTasks() {
      return this.tasks.filter(task => {
        const searchLower = this.searchQuery.toLowerCase()
        return (
          task.task.toLowerCase().includes(searchLower) || 
          task.description.toLowerCase().includes(searchLower)
        )
      })
    }
  },
  methods: {
    addTask(taskData) {
      this.tasks.push({ task: taskData.task, description: taskData.description })
      this.saveTasks()
    },
    completeTask(filteredIndex) {
      const taskToComplete = this.filteredTasks[filteredIndex]
      const index = this.tasks.indexOf(taskToComplete)
      
      if (index !== -1) {
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []
        completedTasks.push(this.tasks[index])
        this.tasks.splice(index, 1)
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
        this.saveTasks()
      }
    },
    editTask(filteredIndex, newTask) {
      const taskToEdit = this.filteredTasks[filteredIndex]
      const index = this.tasks.indexOf(taskToEdit)
      
      if (index !== -1) {
        this.tasks[index] = newTask
        this.saveTasks()
      }
    },
    deleteTask(filteredIndex) {
      const taskToDelete = this.filteredTasks[filteredIndex]
      const index = this.tasks.indexOf(taskToDelete)
      
      if (index !== -1) {
        this.tasks.splice(index, 1)
        this.saveTasks()
      }
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    }
  }
}
</script>

<style scoped>
div {
  margin-top: 12%;
  margin-left: 220px;
  display: block;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

h1 {
  color: rgb(182, 161, 161);
  text-align: center;
}

.search-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #f8f8f8;
}

</style>
