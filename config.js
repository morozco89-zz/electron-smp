const params = {
    dev: {
        ecgURL: 'http://localhost:3000/ecg'
    },
    prod: {
        ecgURL: 'https://dsbp-smap-gateway.web.app/ecg'
    }
}

module.exports = params.prod
