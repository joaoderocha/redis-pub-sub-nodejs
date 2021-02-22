'use strict'

module.exports = async (tempo) => (
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(tempo)
    }, tempo)
  })
)
