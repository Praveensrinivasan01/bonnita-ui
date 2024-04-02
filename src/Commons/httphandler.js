import axios from 'axios'

const createHandler = method => {
  return async function (url, body, headers = {}) {
    const config = {
      method,
      url,
      data: body,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
        ...headers
      }
    }
    try {
      const response = await axios(config)
      console.log('res------>', response)
      return response.data
    } catch (error) {
      console.log('http handler------->', error)
      console.log('http handler------->', error.response)
      // throw new Error(JSON.stringify(error.response));
      return error.response
    }
  }
}

const HttpHandler = {
  get: createHandler('get'),
  post: createHandler('post'),
  put: createHandler('put'),
  patch: createHandler('patch'),
  delete: createHandler('delete')
}

export default HttpHandler
