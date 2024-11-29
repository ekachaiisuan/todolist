<script setup>
import { onMounted, ref,computed } from 'vue'
import { useTodoStore } from '../stores/todo'
import { RouterLink } from 'vue-router'
import Loading from '../components/Loading.vue';
const todoStore = useTodoStore()
const todoText = ref('')
const isLoading = ref(false)
const selectedStatus = ref('Pending')
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

const changeStatus = async (event, todoid) => {
    isLoading.value = true
    try {
        if (event.target.checked) {
            await todoStore.editTodo('Fin', todoid)
            await todoStore.loadTodos()

        } else {
            await todoStore.editTodo('Doing', todoid)
            await todoStore.loadTodos()
        }
    } catch (error) {
        console.log('error :', error)
    }
    isLoading.value = false

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

const changeSelStat = (status)=>{
    selectedStatus.value = status
}

const filterTodoList = computed(()=>{
    return todoStore.list.filter(todo => todo.status === selectedStatus.value)
})


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
        
        <div class="flex">
            <input class="input input-bordered w-full max-w-xs" type="text" v-model="todoText" placeholder="in here">
            <button @click="addTodo(todoText)">add</button>
        </div>
        <div>
            {{ todoStore.msg }}
        </div>
        <!-- <div v-if="isLoading" class="flex items-center fixed inset-0 justify-center bg-black bg-opacity-30">
            <span class="loading loading-spinner loading-lg"></span>
            Loading
        </div> -->
        <Loading v-if="isLoading">
        </Loading>
        <div role="tablist" class="tabs tabs-boxed mt-4">
            <a role="tab" :class="status === selectedStatus ? 'tab tab-active' : 'tab'" v-for = "status in todoStore.statuses" @click="changeSelStat(status)">{{ status }}</a>
        </div>
        <div class="flex justify-between items-center" v-for="todo in filterTodoList"> <!--todoStore.list-->
            <div>
                <input type="checkbox" :checked="todo.status === 'Fin'" class="checkbox checkbox-primary"
                    @change="changeStatus($event, todo.id)" />
            </div>
            <div :class="todo.status === 'Fin' ? 'line-through text-rose-600' : ''">
                {{ todo.name }}
            </div>
            <div>
                <select v-model="todo.status" @change="editStatus(todo)">
                    <option v-for="statuses in todoStore.statuses" :value="statuses">{{ statuses }}</option>
                </select>
            </div>
            <div>
                <RouterLink :to="{ name: 'edit', params: { id: todo.id } }">
                    <button class="btn btn-primary">edit</button>
                </RouterLink>
                <button @click="removeTodo(todo.id)" class="btn btn-secondary">delete</button>
            </div>

        </div>

        <!-- <ul>
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
        </ul> -->
    </div>
</template>
