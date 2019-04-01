const { test, trait } = use('Test/Suite')('User Endpoints')
const User = use('App/Models/User')
const Company = use('App/Models/Company');
const CompanyMember = use('App/Models/CompanyMember');

trait('Auth/Client')
trait('Test/ApiClient')



test('create a new user', async ({ client }) => {
  var random = Math.random(); 
  const response = await client
    .post('/users/signup')
    .send({
      username: `test_username${random}`,
      email: `${random}@gmail.com`,
      password: "123456"
    })
    .end()

  response.assertStatus(200);
});

test('fail to a new user', async ({ client }) => {
  const response = await client
    .post('/users/signup')
    .send({
      username: "test_username",
      email: "email@email",
    })
    .end()

  response.assertStatus(500);
});

test('create a new company', async ({ client }) => {
  const user = await User.query().first();
  const response = await client
    .post(`/users/companies`)
    .send({
      title: "minha empresa",
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200);
  response.assertJSONSubset({
    title: 'minha empresa',
  });
});

test('fails to a new company', async ({ client }) => {
  const user = await User.query().first();
  const response = await client
    .post(`/users/companies`)
    .send({
      title: "",
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(500);
  response.assertJSONSubset([{
    message: 'Informe o nome da empresa',
  }]);
});

test('get all companies', async ({ client }) => {
  const user = await User.query().first();
  const response = await client
    .get(`/users/companies`)
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200);
  response.assertJSONSubset([{
    title: 'minha empresa',
  }]);
});


test('update company', async ({ client }) => {
  const user = await User.query().first();
  const company = await user.companies().first();
  const response = await client
    .put(`/users/companies/${company.id}`)
    .send({
      title: 'minha outra empresa'
    })
    .loginVia(user, 'jwt')
    .end()

  response.assertStatus(200);
  response.assertJSONSubset({
    title: 'minha outra empresa',
  });
});

test('add member to company', async ({ client }) => {
  var random = Math.random(); 
  const user = await User.create({
    username: `meu nome nao é jhony${random}`,
    email: `${random}@gmail.com`,
    password: '21642146'
  });
  const company = await Company.query().first();
  const toLogin = await company.user().first();
  const response = await client
    .post(`/users/companies/${company.id}/members`)
    .send({
      user_id: user.id
    })
    .loginVia(toLogin, 'jwt')
    .end()

  response.assertStatus(200);
  response.assertJSONSubset({
    user_id: user.id,
  });
});

test('remove member to company', async ({ client }) => {
  const cm = await CompanyMember.query().first();
  
  const company = await cm.company().fetch();
  const toRemove = await cm.user().fetch();
  const toLogin = await company.user().first();
  const response = await client
    .delete(`/users/companies/${company.id}/members`)
    .send({
      user_id: toRemove.id
    })
    .loginVia(toLogin, 'jwt')
    .end()

  response.assertStatus(200);
});