import Validator from 'validatorjs'

export default {
  data() {
    return {
      errors: {},
      data: {},
      isValidate: false,
    }
  },
  methods: {
    validationFails() {
      const validation = this._getValidation()
      this.errors = {}

      if (validation.fails()) {
        this.errors = Object.entries(validation.errors.errors).reduce((acc, [key, errors]) => {
          acc[key] = errors[0]
          return acc
        }, {})

        this.isValidate = true

        return true
      }

      return false
    },
    _getValidation() {
      Validator.useLang('ru')
      const validator = new Validator(this.data, this.rules)
      validator.setAttributeNames(this.attributeNames)
      return validator
    },
  },
  computed: {
    attributeNames() {
      return {}
    },
    rules() {
      return {}
    },
  },
  watch: {
    data: {
      handler() {
        if (this.isValidate) {
          this.validationFails()
        }
      },
      deep: true,
    },
  },
}
