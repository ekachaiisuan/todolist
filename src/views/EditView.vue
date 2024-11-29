<script setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useRoute, useRouter } from 'vue-router'
import Loading from '../components/Loading.vue';

const todoStore = useTodoStore()
const route = useRoute()
const router = useRouter()
const todoId = ref(-1)
const isLoad = ref(false)
const isUpdate = ref(false)
const isLoading = ref(false)

const editTodo = async () => {

    const data = {
        name: todoStore.selectedTodo.name,
        status: todoStore.selectedTodo.status
    }


    await todoStore.editDataTodo(data, todoId.value)
    isUpdate.value = true
    isLoading.value = true
    setTimeout(() => {
        isUpdate.value = false
        router.push({
        name: 'home'
    })
    }, 2000)
    
}

const backToHome = () => {
    router.push({
        name: 'home'
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
    <div class="w-1/2 mx-auto mt-4">
        <div v-if="isUpdate" class="toast toast-top toast-start">
            <div class="alert alert-success">
                <span>update successfully</span>
            </div>
        </div>
        <Loading v-if="isLoading">
        </Loading>
        <div v-if="isLoad">
            <!-- <div class="flex justify-center">
                Edit Id {{ todoId }}
            </div> -->
            <div class="divider divider-primary">Edit Id {{ todoId }}</div>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Name</span>
                </div>
                <input type="text" placeholder="Type here" class="input input-bordered w-full"
                    v-model="todoStore.selectedTodo.name" />
            </label>
            <label class="form-control w-full">
                <div class="label">
                    <span class="label-text">Status</span>
                </div>
                <select class="select select-bordered w-full" v-model="todoStore.selectedTodo.status">
                    <option v-for="statuses in todoStore.statuses" :value="statuses">{{ statuses }}</option>
                </select>
            </label>

            <div class="flex justify-between mt-4">
                <button class="btn btn-primary" @click="editTodo">edit</button>
                <button class="btn" @click="backToHome">back</button>
            </div>



        </div>
        <div v-else>
            <h1>Loading....</h1>
        </div>
    </div>


</template>
