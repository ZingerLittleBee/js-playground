const { XMLHttpRequest } = require('xmlhttprequest')

function request() {
  return {
    url: 'https://dog.ceo/api/breeds/image/random'
  }
}

function XFetch(request, resolve, reject) {
  let xhr = new XMLHttpRequest()
  xhr.onerror = (e) => reject(e)
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      xhr.status === 200 ? resolve(xhr.responseText) : reject(xhr.statusText)
    }
  }
  xhr.open('GET', request.url, true)
  xhr.send()
}

XFetch(request(), (e) => console.log(e), (e) => console.error(e))