/*
 * @Author: Wu
 * @Date:   2017-03-28 16:14:04
 * @Ver:    0.1
 * @Last Modified by:   Wu
 * @Last Modified time: 2017-03-30 17:06:12
 */

'use strict'
let Toast = {}
Toast.install = (Vue, options = {}) => {
  let {
    defaultType = 'center', defaultDuration = 2500
  } = options

  insertCss()

  let Vm = Vue.extend({
    template: '<transition name="vue-toast"><div class="vue-toast" :class="{ [`vue-toast-` + type]: true }" v-if="show">{{ msg }}</div></transition>',
    data () {
      return {
        type: defaultType,
        msg: '',
        show: false
      }
    }
  })

  Toast.vm = new Vm()
  Toast.el = Toast.vm.$mount().$el
  document.body.appendChild(Toast.el)

  Vue.prototype.$toast = (msg = ' ', type = defaultType, duration = defaultDuration) => {
    clearTimeout(Toast.clock)
    Vue.prototype.$toast.hide()

    Toast.vm.msg = msg
    Toast.vm.type = type
    Toast.vm.show = true
    Toast.clock = setTimeout(() => {
      Vue.prototype.$toast.hide()
    }, duration)
  }

  Vue.prototype.$toast.hide = () => {
    Toast.vm.show = false
  }

  ['bottom', 'center', 'top'].forEach(type => {
    Vue.prototype.$toast[type] = (msg, duration) => {
      return Vue.prototype.$toast(msg, type, duration)
    }
  })
}

function insertCss () {
  let css = '.vue-toast{font-size:14px;line-height:1.4em;position:fixed;z-index:1069;left:50%;width:100px;margin-top:-45px;margin-left:-70px;padding:10px 20px;text-align:center;color:#FFF;border-radius:5px;background:rgba(34,34,34,0.69)}.vue-toast.vue-toast-top{top:20%}.vue-toast.vue-toast-center{top:50%}.vue-toast.vue-toast-bottom{bottom:20%}.vue-toast-enter-active,.vue-toast-leave-active{transition:opacity 0.2s,-webkit-transform 0.2s;transition:transform 0.2s,opacity 0.2s;transition:transform 0.2s,opacity 0.2s,-webkit-transform 0.2s;-webkit-transform:scale(1);-ms-transform:scale(1);transform:scale(1);opacity:1}.vue-toast-enter,.vue-toast-leave-active{-webkit-transform:scale(0.7);-ms-transform:scale(0.7);transform:scale(0.7);opacity:0}'

  let style = document.createElement('style')
  style.setAttribute('type', 'text/css')
  style.innerHTML = css
  document.querySelector('head').append(style)
}

export default Toast
