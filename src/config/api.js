const host = process.env.NODE_ENV == 'development' ? 'https://development.com/' : 'https://production.com/'
export default {
    login: host + 'login'
}