export function friendlyDate(datStr) {
    let dateObj = typeof datStr === 'object' ? datStr : new Date(datStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let space = now - time
    let str = ''

    switch (true) {
        case space < 60000:
            str = '刚刚'
            break
        case space < 60000 * 60:
            str = Math.floor(space / 60000) + '分钟前'
            break
        case space < 60000 * 60 * 24:
            str = Math.floor(space / (60000 * 60)) + '小时前'
            break
        default:
            str = Math.floor(space / (60000 * 60 * 24)) + '天前'
    }
    return str
}