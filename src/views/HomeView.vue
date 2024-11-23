<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import { RouterLink } from 'vue-router'
const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)
const addTodo = async (todoText) => {
    try {
        isLoading.value = true
        await todoStore.addTodo(todoText) //test git 
        console.log(todoStore.msg)
        isLoading.value = false
    } catch (error) {
        console.log('error :', error)
    }

}

const editStatus = async (todo) => {
    try {
        isLoading.value = true
        await todoStore.editTodo(todo.status, todo.id)
        console.log(todoStore.msg)
        isLoading.value = false
    } catch (error) {
        console.log('error :', error)
    }

}

const removeTodo = async (todo) => {
    try {
        isLoading.value = true
        await todoStore.delTodo(todo)
        await todoStore.loadTodos()
        isLoading.value = false
    } catch (error) {
        console.log('error :', error)
    }

}

onMounted(async () => {
    try {
        isLoading.value = true
        await todoStore.loadTodos()
        console.log(todoStore.list) //test git
        isLoading.value = false
    } catch (error) {
        console.log('error :', error)
    }

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
        <div v-if="isLoading">
            <h1>Loading...</h1>
        </div>
        <ul>
            <li v-for="todo in todoStore.list">
                {{ todo.id }}
                {{ todo.name }}
                <select v-model="todo.status" @change="editStatus(todo)">
                    <option v-for="statuses in todoStore.statuses" :value="statuses">{{ statuses }}</option>
                </select>
                <RouterLink :to="{ name: 'edit', params: { id: todo.id } }">
                    <button>edit</button>
                </RouterLink>

                <button @click="removeTodo(todo.id)">delete</button>
            </li>
        </ul>
    </div>
</template>