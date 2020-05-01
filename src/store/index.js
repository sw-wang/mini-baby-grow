import { createStore } from '@mpxjs/core'

const store = createStore({
    state: {
        babyId: ''
    },
    getters: {
        getbBbyId: state => state.babyId
    },
    mutations: {
        setbBbyId(state, value) {
            state.babyId = value
        }
    }
})

export default store