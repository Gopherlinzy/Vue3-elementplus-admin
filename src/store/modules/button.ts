import { Module } from "vuex";
import { RootState } from "../index";


export interface ButtonState {
    buttonList: string[],
}

export const buttonStore: Module<ButtonState, RootState> = {
    namespaced: true,
    state: (): ButtonState => ({
        buttonList: []
    }),
    mutations: {
        addButton(state: ButtonState, buttons) {
            state.buttonList = buttons
        }
    },
    getters: {
        getButtons: state => state.buttonList
    },
    actions: {
        generateButtons({ commit, state }, buttons: object[]) {
            let bList: string[] = []
            buttons.forEach(button => {
                bList.push(button.path + ':' + button.method)
            })

            commit('addButton', bList)
        }
    }
}