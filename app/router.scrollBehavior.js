export default function (to, from, savedPosition) {
  let t = { x: 0, y: 0 }
  if (to.hash) {
    t = {
      selector: to.hash,
      // behavior: 'smooth',
    }
  }

  // wait for transition before scroll top
  return new Promise((resolve, reject) => {
    // setTimeout(() => {
      if (to.hash) {
        resolve(t)
      } else {
        resolve(window.scrollTo(0, 0))
      }
   // }, 400)
  })
}
