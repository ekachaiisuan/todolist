<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useRoute,useRouter } from 'vue-router'

const todoStore = useTodoStore()
const route = useRoute()
const router = useRouter()
const todoId = ref(-1)
const isLoad = ref(false)

const editTodo = async()=>{

 const data = {
    name : todoStore.selectedTodo.name,
    status : todoStore.selectedTodo.status
 }

 
 await todoStore.editDataTodo(data,todoId.value)
 router.push({
    name : 'home'
 })
}

onMounted(async () => {
    await todoStore.loadTodo(route.params.id)
    todoId.value = parseInt(route.params.id)
    isLoad.value = true
    console.log(todoStore.selectedTodo)
    console.log('Start onMounted')
})
</script>
<template>
    <div class="container">
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
            <div>
                <button @click="editTodo">edit</button>
            </div>
        </div>
        <div v-else>
            <h1>Loading....</h1>
        </div>
    </div>


</template>

<style scoped>
.container {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    margin: 0 auto;
    width: 300px;
}
.container >div >div{
    margin: 5px auto;
}

button{
    margin-top: 10px;
    width: 80%;
}
</style>