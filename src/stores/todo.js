import { defineStore } from 'pinia';
import axios from 'axios';

const url = 'https://673e98d9a9bc276ec4b4f312.mockapi.io/todos/';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    list: [],
    selectedTodo: {},
    msg: '',
    statuses: ['Pending', 'Doing', 'Fin'],
  }),
  actions: {
    async loadTodos() {
      try {
        const response = await axios.get(`${url}`);
        this.list = response.data;
      } catch (error) {
        console.log('error :', error);
      }
    },
    async loadTodo(id) {
      try {
        const response = await axios.get(`${url}${id}`);
        this.selectedTodo = response.data;
      } catch (error) {
        console.log('error :', error);
      }
    },
    async addTodo(todoText) {
        const bodyData = {
            name: todoText,
            status: 'Pending'
        }
        try {
          const response = await axios.post(`${url}`,bodyData);
          console.log(response.data)
          this.list.push(response.data)
          this.msg = 'insert complete'
        } catch (error) {
          console.log('error :', error);
        }
      },
      async editTodo(status,id) {
        const bodyData = {
            status: status
        }
        try {
          const response = await axios.put(`${url}${id}`,bodyData);
          console.log(response.data)
          this.msg = 'edit status complete'
        } catch (error) {
          console.log('error :', error);
        }
      },
      async delTodo(id) {
        
        try {
          const response = await axios.delete(`${url}${id}`);
          console.log(response.data)
          this.msg = 'delete complete'
          console.log(this.msg)
          
        } catch (error) {
          console.log('error :', error);
        }
      },

  },
});
