<template>
    <div class="note-sidebar">
        <span class="btn add-note">添加笔记</span>
        <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
            <span class="el-dropdown-link">
                {{ this.curBook.title }}<i class="iconfont icon-down"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="notebook in notebooks" :key="notebook.value" :command="notebook.id">{{
                    notebook.title
                }}</el-dropdown-item>
                <el-dropdown-item command="trash">回收站</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div class="menu">
            <div>更新时间</div>
            <div>标题</div>
        </div>
        <ul class="notes">
            <li v-for="note in notes">
                <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
                    <span class="date">{{ note.updatedAtFriendly }}</span>
                    <span class="title">{{ note.title }}</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Notebooks from '@/apis/notebooks'
import Notes from '@/apis/notes'
import Bus from '@/helpers/bus'

export default {
    created() {
        Notebooks.getAll()
            .then(res => {
                this.notebooks = res.data
                // 因为notebook.id是数字，而query取下来的是字符串，两者类型不同所以用==判断 
                this.curBook = this.notebooks.find(notebook => notebook.id == this.$route.query.notebookId)
                    || this.notebooks[0] || {}
                console.log(this.curBook)
                return Notes.getAll({ notebookId: this.curBook.id })
            }).then(res => {
                // 通过不同方式到达笔记页面都需要传递详细数据
                this.notes = res.data
            })
    },
    data() {
        return {
            notebooks: [],
            notes: [],
            curBook: {}
        }
    },
    methods: {
        handleCommand(notebookId) {
            if (notebookId === 'trash') {
                // 点击回收站时直接跳出并转到目标路由
                return this.$router.push({ path: '/trash' })
            }
            // 点击切换笔记本时当前笔记也要跟着改变
            this.curBook = this.notebooks.find(notebook => notebook.id == notebookId)
            Notes.getAll({ notebookId })
                .then(res => {
                    this.notes = res.data

                })
            // Notes.getAll({ notebookId })
            //     .then(res => {
            //         this.notes = res.data
            //         this.$emit('update:notes', this.notes)
            //     })
        }
    }
}
</script>


<style lang="less" >
@import url(../assets/css/note-sidebar.less);
</style>