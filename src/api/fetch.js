import axios from 'axios'

export function fetch(url, methods, datas, headers, timeout) {
  let options = Object.assign({}, {
    url: url,
    method: methods,
    data: datas
  })
  if (headers) {
    options.headers = headers
  }
  if (timeout) {
    options.timeout = timeout
  }
  let listPromise = new Promise((resolve, reject) => {
    axios.request(options)
      .then(res => {
        resolve(res.data)
      }).catch(res => {
        reject(res)
      })
  })
  return listPromise
}