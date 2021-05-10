const NodeRSA = require('node-rsa');
const key = new NodeRSA({ b: 512});

let keyPair = {
    private: key.exportKey(),
    public: key.exportKey("public")
}

console.log(keyPair);