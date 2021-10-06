const router = require('express').Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.post('/', function(req, res) {
  const payload = {
    sub: '5',
    name: 'Diktus', 
    exp: Math.floor(Date.now() / 1000) + (60 * 10) // 10 minutes expiration  
  }

const privateKey = `
-----BEGIN PRIVATE KEY-----
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
9jn7PADZuVH/PXxNANVjWs+pEfs/PQ==
-----END PRIVATE KEY-----
`;

  try {
    const token = jwt.sign(payload, privateKey, {algorithm:'RS256'})
    res.set('content-type', 'application/json');
    res.status(200)
    res.send(JSON.stringify({
      token:token
    }))
  } catch(e) {
    res.status(500)
    res.send(e.message)
  }
})

module.exports = router