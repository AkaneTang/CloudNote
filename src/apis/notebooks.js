import request from '@/helpers/request'
import {friendlyDate} from '@/helpers/util'

const URL = {
    GET: '/notebooks',
    ADD: '/notebooks',
    UPDATE: '/notebooks/:id',
    DELETE: '/notebooks/:id'
}

export default {
    getAll() {
        return new Promise((resolve, reject) => {
            request(URL.GET)
                .then(res => {
                    // 对笔记本按创建时间进行排序
                    res.data = res.data.sort((notebook1, notebook2) => notebook1.createAt < notebook2.createAt ? 1 : -1)
                    // 在每组笔记本列表数据中添加距离现在的时间差
                    res.data.forEach(notebook => {
                        notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt)
                    });
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
        })
    },
    updateNotebook(notebookId, { title = '' } = { title: '' }) {
        return request(URL.UPDATE.replace(':id', notebookId), 'PATCH', { title })
    },
    deleteNotebook(notebookId) {
        return request(URL.DELETE.replace(':id', notebookId), 'DELETE')
    },
    addNotebook({ title = '' } = { title: '' }) {
        return request(URL.ADD, 'POST', { title })
    }
}