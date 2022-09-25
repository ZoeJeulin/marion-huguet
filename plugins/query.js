import { print } from 'graphql'

const query = (client, query, variables = {}) => {
  return new Promise((resolve, reject) => {
    client
      .post('', {
        query: print(query),
        variables,
      })
      .then(({ data }) => {
        if (data.errors?.length) {
          reject(data.errors)
        }
        resolve(data.data)
      })
      .catch((e) => {
        reject(e)
        throw e
      })
  })
}

export default ({ app }, inject) => {
  inject('query', query)
}
