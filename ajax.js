const { XMLHttpRequest } = require('xmlhttprequest')
const fetch = require('node-fetch')


function request() {
  return {
    url: 'https://dog.ceo/api/breeds/image/random'
  }
}

function XFetch(request) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onerror = (e) => reject(e)
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        xhr.status === 200 ? resolve(JSON.parse(xhr.responseText)) : reject(xhr.statusText)
      }
    }
    xhr.open('GET', request.url, true)
    xhr.send()
  })
}


// let r1 = XFetch(request()).then(res => {
//   console.log(res)
//   return XFetch(request())
// })
// let r2 = r1.then(res => {
//   console.log(res)
//   return XFetch(request())
// })

// r2.then(res => console.log(res))

// fetch('https://dog.ceo/api/breeds/image/random')
//   .then(function(response) {
//     // return response.json();
//     console.log('response.json()', response.json())
//   })
//   .then(function(myJson) {
//     console.log('myJson', myJson);
//   });

let dice = 3;
let sides = 6;
let query = `query RollDice($dice: Int!, $sides: Int) {
  rollDice(numDice: $dice, numSides: $sides)
}`
let author = 'andy'
let content = 'hope is a good thing'
let query2 = `mutation CreateMessage($input: MessageInput) {
  createMessage(input: $input) {
    id
  }
}`

fetch('http://localhost:4000/graphql', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({ 
    query: query2,
    variables: {
      input: {
        author,
        content
      }
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned: ', data))
