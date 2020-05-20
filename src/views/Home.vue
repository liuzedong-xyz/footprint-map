<template>
  <div class="home">
    <div class="article-area">
      <p v-for="(line, lineIndex) in articleEachLines" :key="lineIndex">
        <span v-for="(char, charIndex) in line" :key="charIndex" :class="char.index == nowIndex && 'active'">{{ char.text }}</span>
      </p>
    </div>

    <div class="input-area">
      <input type="text" class="input" v-model="inputValue" @keyup.space="submitInputValue">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data() {
    return {
      inputValue: '',
      articleArrs: [
        'This', 'is', 'a', 'good', 'time', '!',
        'And', 'liuzedong', 'is', 'very', 'friendship', '!'
      ],
      articleEachLines: [
        [
          {
            text: 'This',
            index: 0
          },
          {
            text: 'is',
            index: 1
          },
          {
            text: 'a',
            index: 2
          },
          {
            text: 'good',
            index: 3
          },
          {
            text: 'time',
            index: 4
          },
          {
            text: '!',
            index: 5
          }
        ],
        [
          {
            text: 'And',
            index: 6
          },
          {
            text: 'liuzedong',
            index: 7
          },
          {
            text: 'is',
            index: 8
          },
          {
            text: 'very',
            index: 9
          },
          {
            text: 'friendship',
            index: 10
          },
          {
            text: '!',
            index: 11
          },
        ]
      ],
      nowCharacter: '',
      nowIndex: 0,
      isFinished: false
    }
  },

  mounted() {
    this.initStart();
  },

  methods: {
    initStart() {
      this.nowCharacter = this.articleArrs[this.nowIndex];
    },
    submitInputValue() {
      // console.log(e);

      if(this.isFinished) return;

      console.log(this.inputValue);

      const res = this.checkInputValid(this.inputValue);

      console.log('res', res);

      if(res == 'ok') {

        this.inputValue = '';
      }
      else if(res == 'error') {
        console.log('error!');
        this.inputValue = this.trim(this.inputValue);
      }
      else {
        this.isFinished = true;
        alert('完成啦！！！');
      }
    },
    checkInputValid(char) {
      char = this.trim(char);

      if(char === this.articleArrs[this.nowIndex]) {

        if(this.nowIndex >= this.articleArrs.length - 1) {
          // console.log('finished');
          return 'finished';
        }
        else {

          this.nowIndex++;
          // console.log('okok');
          return 'ok';
        }
      }
      else {
        return 'error';
      }
    },
    trim(str) {
      return str.replace(/^\s+|\s+$/g, '');
    }
  }
}
</script>

<style lang="scss" scoped>
.article-area {
  font-style: 20px;
  width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 10px;
  // height: 600px;
  background-color: antiquewhite;

  p {
    line-height: 1.5;

    span {
      display: inline-block;
      margin-left: 5px;

      &:first-child {
        margin-left: 0;
      }

      &.active {
      color: red;
      }
    }
  }
}

.input-area {
  margin-top: 20px;

  .input {
    width: 200px;
    height: 40px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 20px;
    border-radius: 5px;
    outline: none;
    border: 1px solid gray;
  }
}
</style>
