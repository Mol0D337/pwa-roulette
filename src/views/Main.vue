<template>
  <div class="d-flex">
    <div class="wrapper">

      <div @click="rate(0)" class="ziro">
        <div>0</div>
      </div>
      <div class="grid">
        <div @click="rate(item)" v-for="item in 36" class="grid__item">
          <div :class="item % 2 === 0 ? 'black' : 'red'">{{item}}</div>
        </div>
      </div>
      <div class="grid-2">
        <div class="grid__item" @click="rate(38)">2 to 1</div>
        <div class="grid__item" @click="rate(39)">2 to 1</div>
        <div class="grid__item" @click="rate(40)">2 to 1</div>
      </div>

      <div class="grid-2">
        <div class="grid__item" @click="rate(41)">1st 12</div>
        <div class="grid__item" @click="rate(42)">2nd 12</div>
        <div class="grid__item" @click="rate(43)">2nd 12</div>
      </div>

      <div class="grid-3">
        <div class="grid__item" @click="rate(44)">1-18</div>
        <div class="grid__item" @click="rate(45)">EVEN</div>
        <div class="grid__item red" @click="rate(46)"></div>
        <div class="grid__item black" @click="rate(47)"></div>
        <div class="grid__item" @click="rate(48)">ODD</div>
        <div class="grid__item" @click="rate(49)">19-36</div>
      </div>

    </div>

    <div style="width: 300px; margin-left: 50px">
      <div style="text-align: center; margin-bottom: 20px">{{money}} негров</div>
      <input class="input-value" type="text" @input="formatterRate" :value="currentRate" placeholder="0.00">


      <div style="text-align: center; margin-top: 50px">
        <b-button @click="roulette" class="btn" variant="outline-success">roulette</b-button>
      </div>

      <div v-for="el in colorWin" style="color: #cccccc;">{{el}}</div>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
            return {
                money: 1000000,
                currentRate: 100,
                colorWin: [],
                chosen: [
                    {rate: 37, value: 0},

                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},
                    {rate: 37, value: 0},

                    {rate: 3, value: 0},
                    {rate: 3, value: 0},
                    {rate: 3, value: 0},

                    {rate: 3, value: 0},
                    {rate: 3, value: 0},
                    {rate: 3, value: 0},

                    {rate: 2, value: 0},
                    {rate: 2, value: 0},

                    {rate: 2, value: 0},
                    {rate: 2, value: 0},

                    {rate: 2, value: 0},
                    {rate: 2, value: 0},

                    {rate: 2, value: 0},
                ],
            }
        },
        methods: {
            formatterRate(e) {
                const { value } = e.target
                this.currentRate = value.replace(/[^\d.]|\.(?=.*\.)/g, '')
                this.$forceUpdate()
            },
            rate(data) {
                if (+this.currentRate <= this.money) {
                    this.chosen[data].value = this.chosen[data].value ? this.chosen[data].value + +this.currentRate : +this.currentRate
                    this.money = this.money - +this.currentRate
                } else {
                    this.currentRate = this.money
                }
            },
            roulette() {
                function randomInteger(min, max) {
                    let rand = min + Math.random() * (max + 1 - min);
                    return Math.floor(rand);
                }
                const random = randomInteger(0, 36)

                this.colorWin.push(random)

                this.money = this.money + (this.chosen[random].value * this.chosen[random].rate)

                if (random % 2 === 0) {
                    this.money = this.money + ((this.chosen[47].value * this.chosen[47].rate) + (this.chosen[48].value * this.chosen[48].rate))
                }
                if (random % 2 !== 0) {
                    this.money = this.money + ((this.chosen[45].value * this.chosen[45].rate) + (this.chosen[46].value * this.chosen[46].rate))
                }

                if (1 <= random && random <= 18) {
                    this.money = this.money + (this.chosen[44].value * this.chosen[44].rate)
                }
                if (19 <= random && random <= 36) {
                    this.money = this.money + (this.chosen[49].value * this.chosen[49].rate)
                }

                if (1 <= random && random <= 12) {
                    this.money = this.money + (this.chosen[41].value * this.chosen[41].rate)
                }
                if (13 <= random && random <= 24) {
                    this.money = this.money + (this.chosen[42].value * this.chosen[42].rate)
                }
                if (25 <= random && random <= 36) {
                    this.money = this.money + (this.chosen[43].value * this.chosen[43].rate)
                }

                if (random === 1 || random === 4 || random === 7 || random === 10 || random === 13 || random === 16 || random === 19 || random === 22 || random === 25 || random === 28 || random === 31 || random === 34) {
                    this.money = this.money + (this.chosen[38].value * this.chosen[38].rate)
                }
                if (random === 2 || random === 5 || random === 8 || random === 11 || random === 14 || random === 17 || random === 20 || random === 23 || random === 26 || random === 29 || random === 32 || random === 35) {
                    this.money = this.money + (this.chosen[39].value * this.chosen[39].rate)
                }
                if (random === 3 || random === 6 || random === 9 || random === 12 || random === 15 || random === 18 || random === 21 || random === 24 || random === 27 || random === 30 || random === 33 || random === 36) {
                    this.money = this.money + (this.chosen[40].value * this.chosen[40].rate)
                }

                if (random) {
                    this.chosen = [
                        {rate: 37, value: 0},

                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},
                        {rate: 37, value: 0},

                        {rate: 3, value: 0},
                        {rate: 3, value: 0},
                        {rate: 3, value: 0},

                        {rate: 3, value: 0},
                        {rate: 3, value: 0},
                        {rate: 3, value: 0},

                        {rate: 2, value: 0},
                        {rate: 2, value: 0},

                        {rate: 2, value: 0},
                        {rate: 2, value: 0},

                        {rate: 2, value: 0},
                        {rate: 2, value: 0},

                        {rate: 2, value: 0},
                    ]
                }

            }
        },
    }
</script>

<style lang="sass">
.input-value
  background-color: gray
  border: none
  border-radius: 10px
  outline: none
  width: 300px
  font-size: 16px
  padding: 5px 10px
  cursor: pointer

.ziro
  border: 1px solid #fff
  color: green
  font-size: 20px
  display: flex
  justify-content: center
  padding: 8px
  cursor: pointer
.ziro div
  background: #fff
  width: 120px
  border-radius: 99%
  text-align: center

.ziro:hover
  background: #198754

.wrapper
  border: 10px solid gray
  border-radius: 10px
  background: green
  width: 500px
  height: 900px
  padding: 20px 10px

.grid
  display: grid
  grid-template: repeat(12,1fr) / repeat(3,1fr)

.grid-2
  display: grid
  grid-template: repeat(1,1fr) / repeat(3,1fr)

.grid-3
  display: grid
  grid-template: repeat(1,1fr) / repeat(6,1fr)

.grid__item
  border: 1px solid #fff
  padding: 10px
  color: #fff
  font-size: 20px
  font-weight: 700
  text-align: center
  cursor: pointer

.grid__item:hover
  background: #198754

.red
  background: red
  border-radius: 99%

.black
  background: black
  border-radius: 99%

</style>
