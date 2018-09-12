const CID = require('cids')
const explain = require('explain-error')

module.exports = function base32 (cids) {
  cids = Array.isArray(cids) ? cids : [cids]

  return cids.map(cid => {
    try {
      cid = new CID(cid)
    } catch (err) {
      throw explain(err, `invalid cid ${cid}`)
    }

    if (cid.version !== 1) {
      cid = cid.toV1()
    }

    return cid.toBaseEncodedString('base32')
  })
}
