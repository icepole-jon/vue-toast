# vue-toast
a vue-toast plugin base on vue2.x

## use
download vue-toast.js into project somewhere like ./lib/vue-toast.js

    import vue-toast form @/lib/vue-toast
    Vue.use(vue-toast)
    
in vue file

    this.$toast('some text')
    this.$toast.center('some text')
    this.$toast.center('some text', 3000)
    this.$toast.top('some text')
    this.$toast.bottom('some text')
