const baseRoutes = {
  auth: '/auth',
  user: '/user',
  users: '/users',
  order: '/order',
  chat: '/chat',
  wallet: '/wallet',
};

const createAuthRoutes = (route: string) => {
  return new Proxy(
    {} as {
      [key in
        | 'login'
        | 'signup'
        | 'reset-password'
        | 'forgot-password'
        | 'check-email-exist'
        | 'create-user'
        | 'verify-reset-otp'
        | 'verify-email']: {
        route: string;
        route_(id: string): string;
      };
    },
    {
      get(_, key) {
        return {
          get route() {
            return `${route}/${String(key)}`;
          },
          route_(id: string) {
            return `${route}/${String(key)}/${id}`;
          },
        };
      },
    },
  );
};

const createUsersRoutes = (route: string) => {
  return new Proxy(
    {} as {
      [key in 'search' | 'update']: {
        route: string;
        route_(id: string): string;
      };
    },
    {
      get(_, key) {
        return {
          get route() {
            return `${route}/${String(key)}`;
          },
          route_(id: string) {
            return `${route}/${String(key)}/${id}`;
          },
        };
      },
    },
  );
};

const createOrderRoutes = (route: string) => {
  return new Proxy(
    {} as {
      [key in 'create' | 'orders' | 'cancel-request' | 'cancel-ride']: {
        route: string;
        route_(id: string): string;
      };
    },
    {
      get(_, key) {
        return {
          get route() {
            return `${route}/${String(key)}`;
          },
          route_(id: string) {
            return `${route}/${String(key)}/${id}`;
          },
        };
      },
    },
  );
};

const createChatRoutes = (route: string) => {
  return new Proxy(
    {} as {
      [key in 'get-messages' | 'send-message']: {
        route: string;
        route_(id: string): string;
      };
    },
    {
      get(_, key) {
        return {
          get route() {
            return `${route}/${String(key)}`;
          },
          route_(id: string) {
            return `${route}/${String(key)}/${id}`;
          },
        };
      },
    },
  );
};

const createWalletRoutes = (route: string) => {
  return new Proxy(
    {} as {
      [key in 'details' | 'transactions' | 'top-up']: {
        route: string;
        route_(id: string): string;
      };
    },
    {
      get(_, key) {
        return {
          get route() {
            return `${route}/${String(key)}`;
          },
          route_(id: string) {
            return `${route}/${String(key)}/${id}`;
          },
        };
      },
    },
  );
};

const apiRoutes = {
  get auth() {
    const route = baseRoutes.auth;
    return createAuthRoutes(route);
  },
  get users() {
    const route = baseRoutes.users;
    return createUsersRoutes(route);
  },
  get chat() {
    const route = baseRoutes.chat;
    return createChatRoutes(route);
  },
  get order() {
    const route = baseRoutes.order;
    return createOrderRoutes(route);
  },
  get wallet() {
    const route = baseRoutes.wallet;
    return createWalletRoutes(route);
  },
};

export default apiRoutes;
