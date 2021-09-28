import Vue from 'vue'
Vue.mixin({
  methods: {
    hyperlinkString(text) {
      var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi
      text = text.replace(
        exp,
        "<a href='$1' class='text-purple-500' target='_blank'>$1</a>"
      )
      exp = /#(.+?)(?=[\s.,:,]|$)/g
      text = text.replace(
        exp,
        "<a href='/h/$1' class='text-purple-500'>#$1</a>"
      )
      exp = /(^|\s)@(\w+)/g
      text = text.replace(
        exp,
        "$1<a href='/u/$2' class='text-purple-500'>@$2</a>"
      )
      return text
    },
  },
})
