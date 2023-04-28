const head = (data) => {
  const seo = { meta: [] }
  if (data && data.title) {
    seo.title = data.title
    seo.meta.push({
      hid: `og:title`,
      property: 'og:title',
      content: data.title,
    })
  }

  if (data && data.description) {
    seo.meta.push({
      hid: `description`,
      name: 'description',
      content: data.description,
    })
    seo.meta.push({
      hid: `og:description`,
      property: 'og:description',
      content: data.description,
    })
    seo.meta.push({
      hid: `twitter:description`,
      name: 'twitter:description',
      content: data.description,
    })
  }
  if (data && data.image) {
    seo.meta.push({
      hid: `og:image`,
      property: 'og:image',
      content: data.image.url,
    })
    seo.meta.push({
      hid: `twitter:image`,
      name: 'twitter:image',
      content: data.image.url,
    })
  }

  return seo
}
export default head
