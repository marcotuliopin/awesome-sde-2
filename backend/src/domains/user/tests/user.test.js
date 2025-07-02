process.env.USERS_FILE = require("path").resolve(__dirname, "../../../../data/users.test.json");

const fs = require("fs").promises;
const userService = require("../services/userService");


describe("UserService", () => {
  beforeEach(async () => {
    await fs.writeFile(process.env.USERS_FILE , "[]");
  });

  test("deve criar um novo usuário", async () => {
    const user = {
      name: "João Silva",
      email: "joao@example.com",
      password: "senha123"
    };

    const result = await userService.create(user);

    expect(result).toHaveProperty("id");
    expect(result.email).toBe("joao@example.com");
    expect(result.password).not.toBe("senha123");
  });

  test("deve lançar erro ao tentar criar um usuário com email duplicado", async () => {
    const user = {
      name: "Maria",
      email: "maria@example.com",
      password: "abc123"
    };

    await userService.create(user);

    await expect(userService.create(user)).rejects.toThrow("Esse email já está cadastrado");
  });

  test("deve buscar um usuário pelo email", async () => {
    const user = {
      name: "Carlos",
      email: "carlos@example.com",
      password: "321321"
    };

    await userService.create(user);

    const found = await userService.getByEmail("carlos@example.com");

    expect(found.email).toBe("carlos@example.com");
    expect(found.name).toBe("Carlos");
  });

  test("deve lançar erro se usuário não for encontrado", async () => {
    await expect(userService.getByEmail("naoexiste@email.com"))
      .rejects.toThrow("User not found.");
  });
});
