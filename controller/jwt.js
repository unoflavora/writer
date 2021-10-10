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
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDoPhWK0bH3AVtF
wJW3vzt5xn1loZSRV9c+4TjsA1l5CV60Sfl46XxUwDuz9RarR3etWHlydw8Lv8AT
4cotsuZM10kqtaBXh2Mxwp1qi4phgT+KDDNURKe96YEOdxNNV2KKmI80fE5YH18Q
d9PTUrCJAvUaZXtWyNLg/T3aBSOABCD4Iwx4yN3RWiRcsRM2/ZxeP3oRDjtYJ/Yz
j/c66RrDecczSMNA09sxddpQbwNzj+5vSq+Ebx50hK37ZbWZB7Nl/WuHi7Pf3AV9
GX419r615lzlVRXa3jrFMH5egCN7ayF2uGWdoIhBkLLFOcvqNhaxcpPwBvOxHJ0q
U5Ks9X+9AgMBAAECggEACUp74SRXdXVr7y6aWWdV8UlkDd34zBcSs4oeFVm4SXPQ
V+/CV7h7iAZyvQB36jKUkpjrWY1yys+z1vfITKtktDvun5NJjrGKDIe9IByPVNbv
XE31pbrjZ7Zrj9EVXW7lWycUSjoThkn8VckoGRhXRfvveKFeXaVGGR3NzNGPedkH
lwNgRG4ShY2g3GyHXWfYBNdIXiZSPPVaxga6/E/2+Mv86l+l7I/Hy8JBKVednTu0
w1FPhJWK6g90rty4PrZMNYRwFmIkOrkkUhbQu21+TeisDqOHkze9VxX1y4pSWyiq
zhPPevlPXUUfaQ9LtEkzLFD+S6y8AaOaPJGcCdRynwKBgQD5MnsM0T5/FFaJ/snQ
yCvv9E/h1pXT8Yt+r7GC/pFfocCVjBnPvgzkB/3pExE3zUkG22ty5mzUEfaCp6Uz
h1FYBLCoRPEtNyp7cXj5DKJf9Y75owceQdChQdTSaYdR1Yb495Ig8YU98TTGixXR
x+dmXP5Fosa5vdZJ4jQMrAsMgwKBgQDulR2MSyeYEwFhwxp16aXnpd/rR3iDM41G
92DrGAqIqHTbTXX5AdJOSXlI2Oo5gtWXhoU+Wj1hUhlh5N+ICDAoAZBvNU1QI6te
BOBhAqQ34hyDXnc3VWv/RdCHHQrcNiNeTk0XZ2dWGr0j0PGyzIGMO8RtF122dKfM
0AGmo1gOvwKBgH1FDChwU3tsjOhH5coHpla0uSdtSNpHdXlU9uZD9G5fkMFcsWkG
P9Kt1c1B4YjssIY67TPQc+rTsNkTT2+s2Y5mpSuhpJ+3OKrfaxG/cSzN83a4po5m
RWua/VJc7EKOFZC4W4QmBXYS+BXKu0g+tqt1mfkFj+K1dLClfsbUAaXjAoGBANkg
NdrmzqrUqQ5Km/sxXz45NFaQHbnxoaIzIi3yHCwQewDWNwYdxUJgFZPZbRhX3IDg
+MQtJe065US1IUVQhlrySXsb3DeRrrSK5ZUD7WW6Ts6zmvVttTKFW+iK4sZUMs3x
nrEs9ttizD0bO8vH2CJChlntyOhys/9uUgJQZ6RLAoGAN8ne+ym3GYGupov+96Qw
bFXN9DZU/LaMoQYDjnJiqvzjzmVSoNQLzkIdpUtL4VHFjJRnatkj9Te0tGCVgEVp
FxbtUziKBdOOo3hOY+QDD3VbfJwUBJV87EockoCO9wIgCmiu95mxw4SZgDAKMB1c
0UFJQdeYBYPD2bgS54y6Lp8=
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