import { test, expect } from 'playwright-test-coverage';

test('register', async ({ page }) => {

  await page.route('*/**/api/auth', async (route) => {
    const requestMethod = route.request().method();

    if (requestMethod === 'POST') {
      const regResult = {
        "user": {
          "name": "MaiLia P",
          "email": "mailiap@gmail.com",
          "roles": [
            {
              "role": "diner"
            }
          ],
          "id": 917
        },
        "token": "secretToken"
      };
      await route.fulfill({ json: regResult });
    } else if (requestMethod === 'DELETE') {
      const logoutResult = {
        "message": "logout successful"
      };
      await route.fulfill({ json: logoutResult });
    } else {
      await route.continue();
    }
  });
  
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Register' }).click();
  await expect(page.getByRole('heading')).toContainText('Welcome to the party');
  await page.getByRole('textbox', { name: 'Full name' }).fill('MaiLia P');
  await page.getByRole('textbox', { name: 'Full name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Email address' }).fill('mailiap@gmail.com');
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await expect(page.getByRole('textbox', { name: 'Full name' })).toHaveValue('MaiLia P');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue('mailiap@gmail.com');
  await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('password123');
  await page.getByRole('button', { name: 'Register' }).click();
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');

});

test('purchase with login', async ({ page }) => {
  await page.route('*/**/api/order/menu', async (route) => {
    const menuRes = [
      { id: 1, title: 'Veggie', image: 'pizza1.png', price: 0.0038, description: 'A garden of delight' },
      { id: 2, title: 'Pepperoni', image: 'pizza2.png', price: 0.0042, description: 'Spicy treat' },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: menuRes });
  });

  await page.route('*/**/api/franchise', async (route) => {
    const franchiseRes = [
      {
        id: 2,
        name: 'LotaPizza',
        stores: [
          { id: 4, name: 'Lehi' },
          { id: 5, name: 'Springville' },
          { id: 6, name: 'American Fork' },
        ],
      },
      { id: 3, name: 'PizzaCorp', stores: [{ id: 7, name: 'Spanish Fork' }] },
      { id: 4, name: 'topSpot', stores: [] },
    ];
    expect(route.request().method()).toBe('GET');
    await route.fulfill({ json: franchiseRes });
  });

  await page.route('*/**/api/auth', async (route) => {
    const loginReq = { email: 'mailiap@gmail.com', password: 'password123' };
    const loginRes = { user: { id: 3, name: 'MaiLia P', email: 'mailiap@gmail.com', roles: [{ role: 'diner' }] }, token: 'secretToken' };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

  await page.route('*/**/api/order', async (route) => {
    const orderReq = {
      items: [
        { menuId: 1, description: 'Veggie', price: 0.0038 },
        { menuId: 2, description: 'Pepperoni', price: 0.0042 },
      ],
      storeId: '4',
      franchiseId: 2,
    };
    const orderRes = {
      order: {
        items: [
          { menuId: 1, description: 'Veggie', price: 0.0038 },
          { menuId: 2, description: 'Pepperoni', price: 0.0042 },
        ],
        storeId: '4',
        franchiseId: 2,
        id: 23,
      },
      jwt: 'eyJpYXQ',
    };
    expect(route.request().method()).toBe('POST');
    expect(route.request().postDataJSON()).toMatchObject(orderReq);
    await route.fulfill({ json: orderRes });
  });

  await page.goto('http://localhost:5173');
  await page.getByRole('button', { name: 'Order now' }).click();
  await expect(page.locator('h2')).toContainText('Awesome is a click away');
  await page.getByRole('combobox').selectOption('4');
  await page.getByRole('link', { name: 'Image Description Veggie A' }).click();
  await page.getByRole('link', { name: 'Image Description Pepperoni' }).click();
  await expect(page.locator('form')).toContainText('Selected pizzas: 2');
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByPlaceholder('Email address').click();
  await page.getByPlaceholder('Email address').fill('mailiap@gmail.com');
  await page.getByPlaceholder('Email address').press('Tab');
  await page.getByPlaceholder('Password').fill('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('main')).toContainText('Send me those 2 pizzas right now!');
  await expect(page.locator('tbody')).toContainText('Veggie');
  await expect(page.locator('tbody')).toContainText('Pepperoni');
  await expect(page.locator('tfoot')).toContainText('0.008 ₿');
  await page.getByRole('button', { name: 'Pay now' }).click();
  await expect(page.getByText('0.008')).toBeVisible();
});


test('about page and history pages', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page.getByRole('main')).toContainText('The secret sauce');
  await expect(page.getByRole('main')).toContainText('Our talented employees at JWT Pizza are true artisans. They pour their heart and soul into every pizza they create, striving for perfection in every aspect. From hand-stretching the dough to carefully layering the toppings, they take pride in their work and are constantly seeking ways to elevate the pizza-making process. Their creativity and expertise shine through in every slice, resulting in a pizza that is not only delicious but also a work of art. We are grateful for our dedicated team and their unwavering commitment to delivering the most flavorful and satisfying pizzas to our valued customers.');
  await page.getByRole('link', { name: 'History' }).click();
  await expect(page.getByRole('heading')).toContainText('Mama Rucci, my my');
  await expect(page.getByRole('main')).toContainText('However, it was the Romans who truly popularized pizza-like dishes. They would top their flatbreads with various ingredients such as cheese, honey, and bay leaves.');
});

test('franchise dashboard / create store', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
    const loginReq = {"email": "mailiap@gmail.com", "password": "password123"};
    const loginRes = { user: { id: 3, name: "MaiLia P", email: "mailiap@gmail.com", roles: [{ role: "diner" }, { objectId: 1, role: "franchisee" }] }, token: "secretToken" };
    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });

    await page.route('*/**/api/franchise/3', async (route) => {
    expect(route.request().method()).toBe('GET');
    const headers = route.request().headers();
    expect(headers['authorization']).toBe('Bearer secretToken');
    let franchDashboardRes = [
      {
        "id": 1, "name": "pizzaPocket",
        "admins": [
          {"id": 3, "name": "MaiLia P", "email": "mailiap@gmail.com"}],
        "stores": [
          { "id": 1, "name": "SLC", "totalRevenue": 8.00 },
          { "id": 2, "name": "The 'Couve", "totalRevenue": 11.00 },
          { "id": 18, "name": "jtown", "totalRevenue": 0 },
          { "id": 19, "name": "jtown", "totalRevenue": 0 },
          { "id": 20, "name": "jtown", "totalRevenue": 0 }
        ]
      }
    ]
    await route.fulfill({ json: franchDashboardRes });
  });

    await page.route('*/**/api/franchise/1/store', async (route) => {
    expect(route.request().method()).toBe('POST');
    const headers = route.request().headers();
    expect(headers['authorization']).toBe('Bearer secretToken');
    let storeReq = {"id": "", "name": "nyc"}
    let storeRes = {"id": 40, "franchiseId": 1, "name": "nyc"}
    expect(route.request().postDataJSON()).toMatchObject(storeReq);
    await route.fulfill({ json: storeRes });

  });

    await page.goto('http://localhost:5173/');
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email address' }).fill('mailiap@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
    await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue('mailiap@gmail.com');
    await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('password123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
    await page.getByLabel('Global').getByRole('link', { name: 'Franchise' }).click();
    await expect(page.getByRole('heading')).toContainText('pizzaPocket');
    await expect(page.locator('tbody')).toContainText('SLC');
    await page.getByRole('button', { name: 'Create store' }).click();
    await page.getByRole('textbox', { name: 'store name' }).click();
    await page.getByRole('textbox', { name: 'store name' }).fill('nyc');
    await expect(page.getByRole('heading')).toContainText('Create store');
    await expect(page.getByRole('textbox', { name: 'store name' })).toHaveValue('nyc');
    await page.getByRole('button', { name: 'Create' }).click();

});

test('admin dashboard, create/remove store', async ({ page }) => {
    await page.route('*/**/api/auth', async (route) => {
    console.log("Authorizing.................................")
    const loginReq = { email: "mailiap@gmail.com", password: "password123" };
    const loginRes = { user: { id: 1, name: "MaiLia P", email: "mailiap@gmail.com", roles: [{ role: "admin" }, { objectId: 44, role: "franchisee" }, { objectId: 47, role: "franchisee" }] }, token: "secretToken" };

    expect(route.request().method()).toBe('PUT');
    expect(route.request().postDataJSON()).toMatchObject(loginReq);
    await route.fulfill({ json: loginRes });
  });
  
    await page.route('*/**/api/franchise', async (route) => {
    const method = route.request().method();
    const headers = route.request().headers();
    expect(headers['authorization']).toBe('Bearer secretToken');
    console.log("This is the header: ", headers)
    console.log("This is the method: ", method)
    if (method === 'GET') {
      const adminDashRes = [
        { id: 15, name: "guy", admins: [{ id: 381, name: "randomGuy", email: "randomGuy@admin.com" }], stores: [] },
        { id: 16, name: "girl", admins: [{ id: 383, name: "randomGirl", email: "randomGirl@admin.com" }], stores: [{ id: 6, name: "PizzaPlace", totalRevenue: 0 }] },
        { id: 44, name: "me", admins: [{ id: 1, name: "MaiLia P", email: "mailiap@gmail.com" }], stores: [] }
      ];
      await route.fulfill({ json: adminDashRes });
    } else if (method === 'POST') {
      const franchReq = { stores: [], id: "", name: "MyPizza", admins: [{ email: "mailiap@gmail.com" }] };
      const franchRes = { stores: [], id: 51, name: "MyPizza", admins: [{ email: "mailiap@gmail.com", id: 1, name: "MaiLia P" }] };
      expect(route.request().postDataJSON()).toMatchObject(franchReq);
      await route.fulfill({ json: franchRes });
    } 

  });

    await page.route('*/**/api/franchise/44', async (route) => {
    expect(route.request().method()).toBe('DELETE');
    const headers = route.request().headers();
    expect(headers['authorization']).toBe('Bearer secretToken');
    const delRes = {"message": "franchise deleted"}
    await route.fulfill({ json: delRes });
  });
  
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('mailiap@gmail.com');  
  await page.getByRole('textbox', { name: 'Email address' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  await expect(page.getByRole('heading')).toContainText('Welcome back');
  await expect(page.getByRole('textbox', { name: 'Email address' })).toHaveValue('mailiap@gmail.com');
  await expect(page.getByRole('textbox', { name: 'Password' })).toHaveValue('password123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading')).toContainText('The web\'s best pizza');
  await page.getByRole('link', { name: 'Admin' }).click();
  await expect(page.getByRole('table')).toContainText('guy');
  await page.getByRole('button', { name: 'Add Franchise' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).click();
  await page.getByRole('textbox', { name: 'franchise name' }).fill('MyPizza');
  await page.getByRole('textbox', { name: 'franchise name' }).press('Tab');
  await page.getByRole('textbox', { name: 'franchisee admin email' }).fill('mailiap@gmail.com');
  await expect(page.getByRole('heading')).toContainText('Create franchise');
  await expect(page.getByRole('textbox', { name: 'franchise name' })).toHaveValue('MyPizza');
  await expect(page.getByRole('textbox', { name: 'franchisee admin email' })).toHaveValue('mailiap@gmail.com');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByRole('row', { name: 'me MaiLia P Close' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Close' }).click();

});