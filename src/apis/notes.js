import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'

const URL = {
    GET: '/notes/from/:notebookId',
    ADD: '/notes/to/:notebookId',
    UPDATE: '/notes/:noteId',
    DELETE: '/notes/:noteId'
}

export default {
    getAll({notebookId}) {
        return new Promise((resolve, reject) => {
            request(URL.GET.replace(':notebookId',notebookId))
                .then(res => {
                    res.data = res.data.map(note=>{
                        note.createdAtFriendly = friendlyDate(note.createdAt)
                        note.updatedAtFriendly = friendlyDate(note.updatedAt)
                        return note
                    }).sort((note1, note2)=>{
                        return note1.updateAt < note2.updateAt
                    })
                    // // 对笔记本按创建时间进行排序
                    // res.data = res.data.sort((notebook1, notebook2) => notebook1.createAt < notebook2.createAt ? 1 : -1)
                    // // 在每组笔记本列表数据中添加距离现在的时间差
                    // res.data.forEach(notebook => {
                    //     notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
                    // });
                    console.log(notebookId)
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    updateNote({noteId}, { title = '' ,content = ''} = { title: '' ,content : ''}) {
        return request(URL.UPDATE.replace(':noteId', noteId), 'PATCH', { title,content })
    },
    deleteNotebook(noteId) {
        return request(URL.DELETE.replace(':noteId', noteId), 'DELETE')
    },
    addNotebook({notebookId},{ title = '' ,content = ''} = { title: '' ,content : ''}) {
        return request(URL.ADD.replace(':notebookId', notebookId), 'POST', { title, content})
    }
}