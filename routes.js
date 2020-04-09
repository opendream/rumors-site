const routes = (module.exports = require('next-routes')());

routes
  // routes.add(name, pattern = /name, page = name)
  .add('index', '/')
  .add('articles', '/articles', 'articles')
  .add('replies', '/replies', 'replies')
  .add('users', '/users', 'users')
  // routes.add({name: 'name', pattern: '/name', page: 'name'})
  .add({
    name: 'article',
    pattern: '/article/:id',
    page: 'article',
  })
  .add({
    name: 'reply',
    pattern: '/reply/:id',
    page: 'reply',
  })
  .add({
    name: 'edit',
    pattern: 'edit/:id',
    page: 'edit',
  });
