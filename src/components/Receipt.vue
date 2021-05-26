<template>
    <div><h2 class="background">
        <p>Вы успешно обменяли</p>
        <p v-if="DEFINING_THE_USED_INPUT_VALUE === 'true'" class="result">
            {{VALUE_OF_QUANTITY}} {{FIRST_SELECTED_CURRENCY}} на {{RESULT_OF_CHANGE}} {{SECOND_SELECTED_CURRENCY}}
        </p>
        <p v-else class="result">
            {{VALUE_OF_QUANTITY}} {{SECOND_SELECTED_CURRENCY}} на {{RESULT_OF_CHANGE}} {{FIRST_SELECTED_CURRENCY}}
        </p></h2>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters([
            'RESULT_OF_CHANGE'
        ]),
        ...mapGetters([
            'DEFINING_THE_USED_INPUT_VALUE'
        ]),
        ...mapGetters([
            'VALUE_OF_QUANTITY'
        ]),
        ...mapGetters([
            'FIRST_SELECTED_CURRENCY'
        ]),
        ...mapGetters([
            'SECOND_SELECTED_CURRENCY'
        ])
    },
    
}

</script>

<style scoped>
.result {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 100px;
}
p {
    text-align: center;
    margin-top: 20px;
}
.background {
    margin-top: 100px;
    margin-left: 500px;
    margin-right: 500px;
    background-color: ivory;
    border: solid;
    border-color: blue;
}
</style>
