import developConfig from './develop.config'
import productionConfig from './production.config'

const isDevelop = process.env.NODE_ENV !== 'production'

const config = isDevelop ? developConfig : productionConfig

export default config
