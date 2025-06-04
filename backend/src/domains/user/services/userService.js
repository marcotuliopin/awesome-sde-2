const fs = require("fs").promises;
const path = require("path");
const encryptPassword = require("../../../utils/functions/encryptPassword");
const NotFoundError = require("../../../../errors/NotFoundError");
const DuplicateError = require("../../../../errors/DuplicateError");
const QueryError = require("../../../../errors/QueryError");

const USERS_FILE = process.env.USERS_FILE || path.resolve(__dirname, "../../../../data/users.json");

class UserService {
  async _readUsers() {
    try {
      const data = await fs.readFile(USERS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async _writeUsers(users) {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  }

  async create(body) {
    if (!body || !body.email || !body.password) {
      throw new QueryError("Email e senha são obrigatórios.");
    }

    const email = body.email.toLowerCase().trim();
    const users = await this._readUsers();

    const exists = users.find((user) => user.email === email);
    if (exists) {
      throw new DuplicateError("Esse email já está cadastrado no sistema!");
    }

    const encryptedPassword = await encryptPassword(body.password);

    const newUser = {
      id: Date.now(), // ou use uuid
      name: body.name,
      email,
      password: encryptedPassword,
    };

    users.push(newUser);
    await this._writeUsers(users);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  async getByEmail(email) {
    const users = await this._readUsers();
    const user = users.find((u) => u.email === email.toLowerCase().trim());

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    return user;
  }
}

module.exports = new UserService();
