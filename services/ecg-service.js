const fs = require('fs')

const service = {
    init: async (id) => {
        //TODO implement data reader
    },
    read: () => {
        return Math.floor(Math.random() * (+1000 + 1 - +0)) + +0;
    }
}

module.exports = service
