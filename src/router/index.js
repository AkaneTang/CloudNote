import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import NoteBooks from '@/components/NoteBookList.vue'
import Note from '@/components/NoteDetail.vue'
import Trash from '@/components/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/notebooks',
      name: '',
      component: NoteBooks
    },
    {
      path: '/note/:noteId',
      name: '',
      component: Note
    },
    {
      path: '/trash/:noteId',
      name: '',
      component: Trash
    }
  ]
})
