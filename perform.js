let fetch = require('node-fetch')
let fs = require('fs')

async function perform() {
  let res = await fetch('https://wechatscope.jmsc.hku.hk/api/update_weixin_public_pretty?days=7')
  let text = await res.text()
  let stripped = text.replace(/<p>/g, '')
  let list = JSON.parse(stripped)
  list.map(item => fetchArticle(item))
}

async function fetchArticle(meta) {
  let path = `./files/${meta.archive}.html`
  if (fs.existsSync(path)) return
  let res = await fetch(`https://wechatscope.jmsc.hku.hk/api/html?fn=${meta.archive}`)
  let text = await res.text()

  fs.writeFileSync(path, `<!-- ${JSON.stringify(meta)} -->\n${text}`)
}

perform()
