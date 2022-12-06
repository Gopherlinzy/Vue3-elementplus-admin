export function formatData(time: string | number) {
    if (time === null) {
        return ''
    } else {
        const date = new Date(time)
        const y = date.getFullYear()
        let m: string | number = date.getMonth() + 1
        m = m < 10 ? `0${String(m)}` : m
        let d: string | number = date.getDate()
        d = d < 10 ? `0${String(d)}` : d
        let h: string | number = date.getHours()
        h = h < 10 ? `0${String(h)}` : h
        let minute: string | number = date.getMinutes()
        minute = minute < 10 ? `0${String(minute)}` : minute
        let second: string | number = date.getSeconds()
        second = second < 10 ? `0${String(second)}` : second
        return `${String(y)}-${String(m)}-${String(d)}   ${String(h)}:${String(
            minute
        )}:${String(second)}`
    }
}