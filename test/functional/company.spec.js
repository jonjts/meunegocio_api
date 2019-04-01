const { test, trait } = use('Test/Suite')('Company Endpoints')
const Company = use("App/Models/Company");
const Client = use("App/Models/Client");
const Phone = use("App/Models/Phone");
const User = use("App/Models/User");

trait('Auth/Client')
trait('Test/ApiClient')


test('create a new client', async ({ client }) => {
  let user = {
    username: `test${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    password: `${Math.random()}`,
  };
  user = await User.create(user);
  const company = await user.companies().create({
    title: "company test",
  });

  const response = await client
    .post(`/companies/${company.id}/clients`)
    .send({
      name: `Pedrinho`,
      cpf: "065.310.490-14"
    })
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
  response.assertJSONSubset(
    {
      name: 'Pedrinho'
    }
  )
});

test("fail to create a new client", async ({ client }) => {
  let user = {
    username: `test${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    password: `${Math.random()}`
  };
  user = await User.create(user);
  const company = await user.companies().create({
    title: "company test"
  });

  const response = await client
    .post(`/companies/${company.id}/clients`)
    .send({
      name: ``
    })
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(500);
});


test("update a client ", async ({ client }) => {
  let user = {
    username: `test${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    password: `${Math.random()}`
  };
  user = await User.create(user);
  const company = await user.companies().create({
    title: "company test"
  });

  const newClient = await company.clients().create(
    {
      name: "Jurubeba",
      rg: 123,
      cpf: '065.310.490-14'
    }
  );

  const response = await client
    .put(`/companies/${company.id}/clients/${newClient.id}`)
    .send({
      name: `Almeida`,
      rg: 321,  
      cpf: '429.065.570-05',      
    })
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
});


test("fail to create a new client", async ({ client }) => {
  let user = {
    username: `test${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    password: `${Math.random()}`
  };
  user = await User.create(user);
  const company = await user.companies().create({
    title: "company test"
  });

  const response = await client
    .post(`/companies/${company.id}/clients`)
    .send({
      name: ``
    })
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(500);
});


test("add phone in a client ", async ({ client }) => {
  let user = {
    username: `test${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    password: `${Math.random()}`
  };
  user = await User.create(user);
  const company = await user.companies().create({
    title: "company test"
  });

  const newClient = await company.clients().create(
    {
      name: "Jurubeba",
      rg: 123,
      cpf: '065.310.490-14'
    }
  );

  const response = await client
    .post(`/companies/${company.id}/clients/${newClient.id}/phones`)
    .send([{
      number: '(79) 99133-3321'
    }])
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(200);
});

test("fail to add duplicate phone in a client ", async ({ client }) => {
  let user = {
    username: `test${Math.random()}`,
    email: `${Math.random()}@gmail.com`,
    password: `${Math.random()}`
  };
  user = await User.create(user);
  const company = await user.companies().create({
    title: "company test"
  });

  const newClient = await company.clients().create({
    name: "Jurubeba",
    rg: 123,
    cpf: "065.310.490-14"
  });

  const response = await client
    .post(`/companies/${company.id}/clients/${newClient.id}/phones`)
    .send([
      {
        number: "(79) 99133-3321"
      },
      {
        number: "(79) 99133-3321"
      }
    ])
    .loginVia(user, "jwt")
    .end();

  response.assertStatus(500);
});