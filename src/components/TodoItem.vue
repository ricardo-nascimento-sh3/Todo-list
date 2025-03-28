<template>
    <li>
      <span>{{ task }}</span>
      <button @click="$emit('complete-task')">✔️</button>
    </li>
  </template>
  
  <script>
  export default {
    props: ['task']
  }
  </script>