module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/users',
      handler: 'user.find',
      config: {
        // @ts-ignore
        roles: ["administrador", "editor"],
        prefix: '',
      },
    },
  ]
}
