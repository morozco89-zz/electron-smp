const axios = require('axios')
const {ecgURL} = require('../config')

const axiosInstance = axios.create({
    baseURL: ecgURL
})

module.exports = axiosInstance
