const params = {
    dev: {
        ecgURL: 'http://localhost:3000/ecg'
    },
    prod: {
        ecgURL: 'http://localhost:3000/ecg'
    }
}

module.exports = params.dev
