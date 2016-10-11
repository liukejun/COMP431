const url = 'https://webdev-dummy.herokuapp.com'

const resource = (method, endpoint, payload) => {
  const options =  {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (payload) options.body = JSON.stringify(payload)

  return fetch(`${url}/${endpoint}`, options)
    .then(r => {
      if (r.status === 200) {
        if (r.headers.get('Content-Type').indexOf('json') > 0) {
          return r.json()
        } else {
          return r.text()
        }
      } else {
        // useful for debugging, but remove in production
        console.error(`${method} ${endpoint} ${r.statusText}`)
        throw new Error(r.statusText)
      }
    })
}

const login = () => {
  
  const username = document.querySelector("#loginUsername")
  const password = document.querySelector("#loginPwd")
 
  return resource('POST', 'login', { 
      username: username.value, 
      password: password.value 
    })
    .then(r => resource('GET', 'headlines'))
    .then(r => {
      const user = r.headlines[0]

      const displayName = document.querySelector("#user-info-displayName")
      const displayHeadline = document.querySelector("#userinfo-current-state")
      displayName.innerHTML = `${user.username}`
      displayHeadline.innerHTML = `${user.headline}`
    })
    .catch(r => displayHeadline.innerHTML = `${r.message || 'Error'}`)
}

// const logout = () => {
//   const box = document.querySelector("#message")
//   return resource('PUT', 'logout')
//     .then(r => box.innerHTML = "You have logged out" )
//     .then(_ => toggle(true))
//     .catch(r => box.innerHTML = `"${r.message}" when logging out` )
// }

// const updateHeadline = (headline) => {
//   const box = document.querySelector("#message")
//   return resource('PUT', 'headline', { headline })
//     .then((response) => {
//       console.log(`New headline ${response.headline}`)
//       box.innerHTML = `Update headline to "${response.headline}"`
//     })
//     .then(_ => toggle(false))
//     .catch(response => box.innerHTML = `"${response.message}" when updating headlines`)
// }

export { url, login}
