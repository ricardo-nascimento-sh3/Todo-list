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
  
  <style scoped>
  li {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }
  </style>
  