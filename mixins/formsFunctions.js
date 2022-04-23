import validation from './validation'

export default {
  mixins: [validation],
  data() {
    return {
      data: {},
      isLoading: false,
      serverError: '',
    }
  },
  methods: {
    async submit() {
      if (this.isLoading) {
        return
      }

      if (this.validationFails()) {
        return
      }

      this.serverError = ''
      this.isLoading = true

      try {
        await this.componentHandler()
      } catch (error) {
        if (error.message) {
          try {
            this.errorHandler(error)
          } catch (e) {
            console.log('base error catcher')
            this.serverError = e.message
          }
          return
        }

        this.serverError = error.toLocaleString()
      } finally {
        this.isLoading = false
      }
    },
    errorHandler(serverError) {
      console.log('try to detect error', serverError)

      if (['Возникли ошибки: Login уже существует'].includes(serverError.message)) {
        this.$vfm.show('error-login-exist', this.data.login)
        return
      }

      if (['user not found'].includes(serverError.message)) {
        this.$vfm.show('error-user-not-found', this.data.login)
        return
      }

      // если не удалось найти соответствующую модалку - выводим ошибку под формой по умолчанию
      throw new Error(serverError.message)
    },
    async componentHandler() {},
  },
}
