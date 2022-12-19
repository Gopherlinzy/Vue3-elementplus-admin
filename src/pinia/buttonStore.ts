import { defineStore } from 'pinia'

interface buttonRequest {
    id: number,
    path: string,
    description: string,
    api_group: string,
    method: string,
    created_at: string,
    updated_at: string,
}

export interface ButtonState {
    buttonList: string[],
}


// 定义容器
export const buttonStore = defineStore('buttons', {
    state: (): ButtonState => ({
        buttonList: []
    }),
    getters: {
        getButtons: state => state.buttonList
    },
    actions: {
        generateButtons(buttons: buttonRequest[]) {
            let bList: string[] = []
            buttons.forEach(button => {
                bList.push(button.path + ':' + button.method)
            })

            this.buttonList = bList
        }
    }
})