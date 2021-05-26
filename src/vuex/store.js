import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
let store = new Vuex.Store({
    state: {
        currencys: [],
        result: '',
        definingTheUsedInputValue: '',
        valueOfQuantity: '',
        firstSelectedCurrensy: '',
        secondSelectedCurrency: ''
    },
    mutations:{
        SET_CURRENCYS_TO_STATE: (state, currencys) => {
            for(let i in currencys){
                state.currencys.push({text: currencys[i]['ccy'], value: currencys[i]['sale']})
            }
        },
        GET_RESULT: (state, newResult) => {
            state.result = newResult
        },
        GET_DEFINING_THE_USED_INPUT_VALUE: (state, definingTheUsedInputValue) => {
            state.definingTheUsedInputValue = definingTheUsedInputValue
        },
        GET_VALUE_OF_QUANTITY: (state, valueOfQuantity) => {
            state.valueOfQuantity = valueOfQuantity
        },
        GET_FIRST_SELECTED_CURRENCY: (state, firstSelectedCurrensy) => {
            state.firstSelectedCurrensy = firstSelectedCurrensy
        },
        GET_SECOND_SELECTED_CURRENCY: (state, secondSelectedCurrency) => {
            state.secondSelectedCurrency = secondSelectedCurrency
        }
    },
    actions: {
        GET_CURRENCYS_FROM_API({commit}){
            return axios.get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
            .then((currencys) => {
                commit('SET_CURRENCYS_TO_STATE', currencys.data);
                return currencys;
            })
        }
    },
    getters: {
        CURRENCYS(state){
            return state.currencys;
        },
        RESULT_OF_CHANGE(state){
            return state.result
        },
        DEFINING_THE_USED_INPUT_VALUE(state){
            return state.definingTheUsedInputValue
        },
        VALUE_OF_QUANTITY(state){
            return state.valueOfQuantity
        },
        FIRST_SELECTED_CURRENCY(state){
            return state.firstSelectedCurrensy
        },
        SECOND_SELECTED_CURRENCY(state){
            return state.secondSelectedCurrency
        }
    }
    });

    export default store