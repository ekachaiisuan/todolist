<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useRoute } from 'vue-router'

const todoStore = useTodoStore()
const route = useRoute()
const todoId = ref(-1)
const isLoad = ref(false)
onMounted(async()=>{
    await todoStore.loadTodo(route.params.id)
    todoId.value = parseInt(route.params.id) 
    isLoad.value = true
    console.log(todoStore.selectedTodo)
})
</script>
<template>
    <div v-if="isLoad">
        Edit Id {{ todoId }}
        <div>
            name
            <input type="text" v-model="todoStore.selectedTodo.name">
        </div>
        <div>
            status
            <select v-model="todoStore.selectedTodo.status">
                <option v-for="statuses in todoStore.statuses" :value="statuses">{{ statuses }}</option>
            </select>
        </div>
    </div>
    <div v-else>
        <h1>Loading....</h1>
    </div>
    
</template>