/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Token from 'App/Models/token'
import Hash from '@ioc:Adonis/Core/Hash'
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.group(() => {
  Route.resource('posts', 'PostsController').apiOnly()

  Route.resource('posts.comments', 'CommentsController')
  .apiOnly();
  
}).middleware('auth')

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  // Lookup user manually
  const user = await Token
    .query()
    .where('email', email)
    .firstOrFail()

  // Verify password
  if (!(await Hash.verify(user.password, password))) {
    return response.badRequest('Invalid credentials')
  }

  // Generate token
  const token = await auth.use('api').generate(user)
  return {
    token: token
  }
})

Route.post('user', async ({request}) => {
  const body = request.body();
  const user = await Token.create({
    email: body.email,
    password: body.password
  })
  return user;
})