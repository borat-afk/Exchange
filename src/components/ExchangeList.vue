<template>
  <div id="ExchangeList">
    <h1>Обменник</h1>
    <span class="h8">Сумма в {{firstSelectedCurrency}}</span>
    <span class="h9">Сумма в {{secondSelectedCurrenc}}</span>
    <p>
      <select v-model="firstSelectedCurrency">
        <option
          v-bind:key="index"
          v-for="(firstCurrency, index) in CURRENCYS"
          v-bind:value="firstCurrency.text"
        >
          {{ firstCurrency.text }}
        </option>
      </select>
      <input v-if="definingTheUsedInputValue === true" v-model="calculator" @focus="definingTheUsedInputValue = true"/>
      <input v-else v-model="resultOfChange" @focus="definingTheUsedInputValue = true"/>
      <button class="buttonSwap" v-on:click="swap">swap</button>
      <select v-model="secondSelectedCurrenc">
        <option
          v-bind:key="index"
          v-for="(secondCurrency, index) in CURRENCYS"
          v-bind:value="secondCurrency.text"
        >
          {{ secondCurrency.text }}
        </option>
      </select>
      <input v-if="definingTheUsedInputValue === false" v-model="calculator" @focus="definingTheUsedInputValue = false"/>
      <input v-else v-model="resultOfChange" @focus="definingTheUsedInputValue = false"/>
    </p>
    <button class="buttonChange" v-if="validationCheck === true" @click="change">
      <router-link to="/receipt">ОБМЕНЯТЬ</router-link>
    </button>
    <span v-else>
    <span v-bind:class="{'firstInput': definingTheUsedInputValue === true, 'secondInput': definingTheUsedInputValue === false}">{{validationError}}</span>
    <h3>УКАЖИТЕ СУММУ</h3></span>
    <br><h4>Курс Резерв</h4>
    <br><h5 v-if="definingTheUsedInputValue === true">1 {{firstSelectedCurrency}} = {{factor}} {{secondSelectedCurrenc}}</h5>
    <h5 v-else>1 {{secondSelectedCurrenc}} = {{factor}} {{firstSelectedCurrency}}</h5>
    <h6 v-if="definingTheUsedInputValue === true">{{reserv[secondSelectedCurrenc]}} {{secondSelectedCurrenc}}</h6>
    <h6 v-else>{{reserv[firstSelectedCurrency]}} {{firstSelectedCurrency}}</h6>

    
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  data() {
    return {
      firstSelectedCurrency: "RUR",
      secondSelectedCurrenc: "USD",
      swapfirstSelectedCurrency: "",
      swapsecondSelectedCurrenc: "",
      valueOfQuantity: 0,
      swapFirstQuantity: "0",
      swapSecondQuantity: "0",
      reserv: { 'USD': 30000, 'BTC': 4, 'EUR': 25000, 'RUR': 560000 },
      resultOfChange: 0,
      course: "",
      factor: 0,
      definingTheUsedInputValue: true,
      validationCheck: false,
      validationError: ''
    };
  },
  mounted() {
      this.GET_CURRENCYS_FROM_API();
  },
  beforeUpdate(){
      this.multiplierCalculation();
      this.validation()
  },
  methods: {
    ...mapMutations([
      'GET_RESULT'
    ]),
      submit(){
        this.resultOfChange
      },
    ...mapActions([
        'GET_CURRENCYS_FROM_API'
    ]),
    validation: function(){
      if(this.definingTheUsedInputValue === true){
        if(Number(this.valueOfQuantity) > 0){
          if(Number(this.resultOfChange) <= this.reserv[this.secondSelectedCurrenc]){
            this.validationCheck = true
          }else{
            this.validationCheck = false;
            this.validationError = 'Вы привысили резерв валюты'
          }
        }else{
          this.validationCheck = false;
          this.validationError = 'Вы ввели некоректную сумму'
        }
      }else{
        if(Number(this.valueOfQuantity) > 0){
          if(Number(this.resultOfChange) <= this.reserv[this.firstSelectedCurrency]){
            this.validationCheck = true
          }else{
            this.validationCheck = false;
            this.validationError = 'Вы привысили резерв валюты'
          }
        }else{
          this.validationCheck = false;
          this.validationError = 'Вы ввели некоректную сумму'
        }
      }
    },
    multiplierCalculation: function() {
        if(this.definingTheUsedInputValue === true){
        for(let i in this.CURRENCYS){
                if(this.CURRENCYS[i].text == this.firstSelectedCurrency){
                    for(let k in this.CURRENCYS){
                        if(this.CURRENCYS[k].text == this.secondSelectedCurrenc){
                            this.factor = (Number(this.CURRENCYS[i].value)/Number(this.CURRENCYS[k].value)).toFixed(5)
                        }
                    }
                }
            }
        }else{
          for(let i in this.CURRENCYS){
                if(this.CURRENCYS[i].text == this.secondSelectedCurrenc){
                    for(let k in this.CURRENCYS){
                        if(this.CURRENCYS[k].text == this.firstSelectedCurrency){
                            this.factor = (Number(this.CURRENCYS[i].value)/Number(this.CURRENCYS[k].value)).toFixed(5)
                        }
                    }
                }
            }
        }
    },
    swap: function () {
        (this.swapfirstSelectedCurrency = this.secondSelectedCurrenc),
        (this.swapsecondSelectedCurrenc = this.firstSelectedCurrency),
        (this.firstSelectedCurrency = this.swapfirstSelectedCurrency),
        (this.secondSelectedCurrenc = this.swapsecondSelectedCurrenc)
    },
    change: function () {
      if(this.definingTheUsedInputValue === true){
      if (
        this.reserv[this.secondSelectedCurrenc] >= Number(this.resultOfChange) &&
        this.valueOfQuantity >= 0
      ) {
        this.reserv[this.firstSelectedCurrency] += Number(this.valueOfQuantity);
        this.reserv[this.secondSelectedCurrenc] -= Number(this.resultOfChange);
        this.$store.commit('GET_RESULT', this.resultOfChange);
        this.$store.commit('GET_DEFINING_THE_USED_INPUT_VALUE', this.definingTheUsedInputValue);
        this.$store.commit('GET_VALUE_OF_QUANTITY', this.valueOfQuantity);
      }
      }else{
        if (
        this.reserv[this.firstSelectedCurrency] >= Number(this.resultOfChange) &&
        this.valueOfQuantity >= 0
      ) {
        this.reserv[this.secondSelectedCurrenc] += Number(this.valueOfQuantity);
        this.reserv[this.firstSelectedCurrency] -= Number(this.resultOfChange);
        this.$store.commit('GET_RESULT', this.resultOfChange);
        this.$store.commit('GET_DEFINING_THE_USED_INPUT_VALUE', this.definingTheUsedInputValue);
        this.$store.commit('GET_VALUE_OF_QUANTITY', this.valueOfQuantity);
        this.$store.commit('GET_FIRST_SELECTED_CURRENCY', this.firstSelectedCurrency);
        this.$store.commit('GET_SECOND_SELECTED_CURRENCY', this.secondSelectedCurrenc)
      }
      }
    }
  },
  computed: {
    ...mapGetters([
      'CURRENCYS'
    ]),
    calculator: {
      get() {
        return this.valueOfQuantity;
      },
      set(newValue) {
        this.valueOfQuantity = newValue;
        if (this.valueOfQuantity) {
            this.resultOfChange = (Number(newValue)*this.factor).toFixed(5);
        } else {
          this.resultOfChange = 0;
        }
      },
    }
  },
};
</script>

<style scoped>
h1 {
  background: white;
  color: blue;
  border: unset;
  text-align: center;
  margin-top: 80px;
}
.h8 {
  font-family: 'Times New Roman';
    font-weight: 100;
    margin-left: 475px;
    font-size: 80%;
    display: inline-block;
    text-align: center;
}
.firstInput {
  font-family: 'Times New Roman';
    font-weight: 100;
    margin-left: 469px;
    font-size: 80%;
    display: inline-block;
    text-align: center;
    color: red;
    margin-top: -15px;
}
.secondInput {
  font-family: 'Times New Roman';
    font-weight: 100;
    margin-left: 759px;
    font-size: 80%;
    display: inline-block;
    text-align: center;
    color: red;
    margin-top: -15px;
}
.h9 {
  font-family: 'Times New Roman';
    font-weight: 100;
    margin-left: 217px;
    font-size: 80%;
    display: inline-block;
    text-align: center;
}
h4 {
    font-family: 'Times New Roman';
    font-size: 120%;
    font-weight: 100;
    margin-top: 100px;
    margin-left: 450px;
    word-spacing: 300px;
    margin-bottom: -3%;
}
h5 {
    font-family: 'Times New Roman';
    font-weight: 100;
    margin-left: 380px;
    font-size: 120%;    
    display: inline-block;
}
h6 {
    font-family: 'Times New Roman';
    font-weight: 100;
    margin-left: 220px;
    font-size: 120%;
    display: inline-block;
    text-align: center;
}
h3 {
  text-align: center;
  margin-left: 550px;
  margin-right: 550px;
  margin-top: 50px;
  border: solid red;
  background-color: red;
  border-radius: 20px;
  padding: 5px;
}
.buttonChange {
  text-align: center;
  margin-top: 50px;
  margin-left: 630px;
  margin-right: 550px;
  border: solid green;
  background-color: green;
  border-radius: 20px;
  padding: 5px;
}
.buttonSwap {
  text-align: center;
  border: solid blue;
  background-color: white;
  border-radius: 20px;
  padding: 5px;
}
p {
  text-align: center;
}
h2 {
  text-align: center;
}
input {
  margin-right: 5px;
  margin-bottom: -15px;
  border: 0;
  border-bottom: 1px solid blue;
  background-color: rgba(0, 0, 0, 0);
  outline: 0;
}
select {
  margin: 5px;
  border: 0;
  border-bottom: 1px solid blue;
  background-color: rgba(0, 0, 0, 0);
  outline: 0;
}
</style>
