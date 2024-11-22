<script setup>
import {onMounted,ref} from 'vue'
import {useTodoStore} from '../stores/todo'
const todoStore = useTodoStore()
const todoText = ref('')
const addTodo = async(todoText)=>{
    await todoStore.addTodo(todoText)
}

onMounted(async()=>{
 await todoStore.loadTodos()
 console.log(todoStore.list)
})

</script>
<template>
    <div>
        Todo List
        <div>
            <input type="text" v-model="todoText">
            <button @click="addTodo(todoText)">add</button>
        </div>
        <div>
            {{ todoStore.msg }}
        </div>
        <ul>
            <li v-for="todo in todoStore.list">
               {{ todo.id }}  {{ todo.name }} {{ todo.status }}
               <button>edit</button>
               <button>delete</button>
            </li>
        </ul>
    </div>
</template>