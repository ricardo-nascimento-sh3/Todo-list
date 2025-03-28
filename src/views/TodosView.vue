<template>
  <div>
    <h1>Tarefas Pendentes</h1>
    <TodoForm @add-task="addTask" />
    <TodoList 
      :tasks="tasks" 
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
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  methods: {
    addTask(taskData) {

      this.tasks.push({ task: taskData.task, description: taskData.description })
      this.saveTasks()
    },
    completeTask(index) {
      const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []
      completedTasks.push(this.tasks[index])
      this.tasks.splice(index, 1)
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
      this.saveTasks()
    },
    editTask(index, newTask) {
      this.tasks[index] = newTask
      this.saveTasks()
    },
    deleteTask(index) {
      this.tasks.splice(index, 1)
      this.saveTasks()
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

h1{
  color: rgb(182, 161, 161);
  text-align: center;
}

</style>

