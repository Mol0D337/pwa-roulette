<template>
  <div class="bcg">

    <div class="d-flex justify-content-center align-items-lg-end">

      <div style="width: 300px;color: #ccc!important; margin-right: 150px">
        <div style="text-align: center; margin-bottom: 20px">{{money}} негров</div>
        <input class="input-value" type="text" @input="formatterRate" :value="currentRate" placeholder="0.00">
      </div>

      <div id="content-wheel-canvas-wrapper">
        <div id="content-wheel-canvas" class="no-select" style="transform: rotate(0deg);">
          <div id="wheel" style="opacity: 1;"></div>
        </div>
      </div>

    </div>

    <b-icon icon="cursor-fill" rotate="135" variant="danger"></b-icon>

    <div class="d-flex justify-content-center align-items-lg-center">
      <div v-for="(item, index) in chosen">
        <b-button :disabled="!currentRate" @click="rate(index)" class="btn" :variant="item.variant">{{item.rate}}x</b-button>
        <div style="color: #cccccc; text-align: center; margin-top: 10px">{{item.value}} негров</div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 50px">
      <b-button @click="roulette" class="btn" variant="outline-success">roulette</b-button>
    </div>


    <div v-for="el in colorWin" style="color: #cccccc;">{{el}}</div>

  </div>
</template>

<script>
import formatted from '../filter/formatted'
export default {
  name: 'Home',
  filters: { formatted },
  data() {
    return {
        money: 1000000,
        chosen: [
            {rate: 2, value: 0, variant: "outline-secondary"},
            {rate: 3, value: 0, variant: "outline-danger"},
            {rate: 4, value: 0, variant: "outline-success"},
            {rate: 50, value: 0, variant: "outline-light"},
        ],
        currentRate: 100,
        colorWin: [],
    }
  },
  methods: {
    rate(data) {
        if (+this.currentRate <= this.money) {
            this.chosen[data].value = this.chosen[data].value ? this.chosen[data].value + +this.currentRate : +this.currentRate
            this.money = this.money - +this.currentRate
        } else {
            this.currentRate = this.money
        }
    },
    formatterRate(e) {
        const { value } = e.target
        this.currentRate = value.replace(/[^\d.]|\.(?=.*\.)/g, '')
        this.$forceUpdate()
    },
    roulette() {
        function randomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        }
        const random = randomInteger(1, 54)

        if (random <= 25) {
            this.colorWin.push('gray')
            this.money = this.money + (this.chosen[0].value * 2)
            this.resetChosen()
        } else if (26 < random && random <= 42) {
            this.colorWin.push('red')
            this.money = this.money + (this.chosen[1].value * 3)
            this.resetChosen()
        } else if (43 < random && random <= 53) {
            this.colorWin.push('green')
            this.money = this.money + (this.chosen[2].value * 4)
            this.resetChosen()
        } else if (random === 54) {
            this.colorWin.push('white')
            this.money = this.money + (this.chosen[3].value * 50)
            this.resetChosen()
        }
    },
    resetChosen() {
        this.chosen = [
            {rate: 2, value: 0, variant: "outline-secondary"},
            {rate: 3, value: 0, variant: "outline-danger"},
            {rate: 4, value: 0, variant: "outline-success"},
            {rate: 50, value: 0, variant: "outline-light"},
        ]
    }
  }
}
</script>

<style lang="scss">
  .btn {
    width: 300px;
    margin-right: 15px;
  }
  .input-value {
    background-color: #2c2c32!important;
    color: #ccc!important;
    border: none;
    border-radius: 10px;
    outline: none;
    width: 300px;
    font-size: 16px;
    padding: 5px 10px;
  }
  body {
    overflow: hidden;
  }
  .bcg {
    background-color: #26262c; width: 100vw; min-height: 100vh; padding-top: 50px
  }
  #content-wheel-canvas-wrapper {
    height: 400px;
    width: 400px;
    transform: rotate(
            180deg
    );
    pointer-events: none;
    overflow: hidden;
  }
  #content-wheel-canvas {
    height: 100%;
    width: 100%;
  }
  #wheel {
    display: block;
    margin: auto;
    margin-top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: url(../assets/wheel_400.png) no-repeat center;
    background-size: 100%;
  }

  .no-select {
    user-select: none;
  }
</style>
