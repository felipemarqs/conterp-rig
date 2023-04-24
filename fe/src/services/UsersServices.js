import HttpClient from "./utils/HttpClient";

class UsersServices {
  constructor() {
    this.HttpClient = new HttpClient("http://localhost:3001");
  }

  async listUsers(orderBy = "asc") {
    const users = await this.HttpClient.get(`/users?orderBy=${orderBy}`);

    console.log(users);

    return users;
  }

  async createUser(user) {
    console.log("user HHPT", user);
    const body = {
      email: user.email,
      password: user.password,
      access_level: user.access_level,
    };

    return this.HttpClient.post(`/users`, {
      body: body,
    });
  }
}

export default new UsersServices();
