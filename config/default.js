module.exports = {
  app: {
    title: 'rrh',
    description: 'rrh',
    head: {
      titleTemplate: 'rrh | %s',
      meta: [
        { name: 'description', content: 'rrh' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'rrh' },
        { property: 'og:image', content: 'https://example.org/logo.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'rrh' }
      ]
    }
  },
  roles: {
    ADMIN: 1,
    USER: 3
  }
};
