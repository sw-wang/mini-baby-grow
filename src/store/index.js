import { createStore } from '@mpxjs/core'

const store = createStore({
    state: {
        child: {}
    },
    getters: {
        getChild: state => state.child
    },
    mutations: {
        setChild(state, value) {
            state.child = value
        }
    }
})

export default store
