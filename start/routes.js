'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//User routes
Route.post('/users/signup', 'UserController.create');
Route.get('/users/companies', 'UserController.getCompanies');
Route.post('/users/companies', 'UserController.createCompany');
Route.put('/users/companies/:id', 'UserController.updateCompany');
Route.post('/users/companies/:id/members', 'UserController.addMemberToCompany');
Route.delete('/users/companies/:id/members', 'UserController.removeMemberToCompany');

//Session routes
Route.post('/sessions/signin', 'SessionController.create');

//Company routes
Route.get('/companies/:id/clients', 'CompanyController.getClients')
    .middleware(['inCompany']);
Route.post('/companies/:id/clients', 'CompanyController.createClient')
    .middleware(['inCompany']);
Route.put('/companies/:id/clients/:client_id', 'CompanyController.updateClient')
    .middleware(['inCompany']);
Route.post('/companies/:id/clients/:client_id/phones', 'CompanyController.addPhone')
    .middleware(['inCompany']);