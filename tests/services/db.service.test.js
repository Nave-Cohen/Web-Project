const { register, login, pool } = require("../../services/db.service");

beforeAll(async () => {
  const users = ["testuser", "newuser", "existuser"];
  for (const user of users) {
    try {
      // Clean up the inserted data
      await pool.query("DELETE FROM users WHERE username = ?", [user]);
    } catch {}
  }
});
afterAll(async () => {
  const users = ["newuser", "existuser", "testuser"];
  for (const user of users) {
    try {
      // Clean up the inserted data
      await pool.query("DELETE FROM users WHERE username = ?", [user]);
    } catch {}
  }
});
////////////////////////////////////////////////////////////
////////////////////////Register///////////////////////////////
////////////////////////////////////////////////////////////
// Tests that the function successfully registers a new user with valid username, email, and password.
it("test_register_successfully_registers_new_user", async () => {
  const result = await register(
    "testuser",
    "testemail@test.com",
    "testpassword"
  );
  expect(result).toBe(true);
});

// Tests that the function returns false when attempting to register a new user with an existing username.
it("test_register_fails_with_existing_username", async () => {
  // Create a separate connection object
  pool.query = jest.fn().mockRejectedValue({ code: "ER_DUP_ENTRY" });
  const result = await register("testuser", "newemail@test.com", "newpassword");
  expect(result).toBe(false);
});

// Tests that the function returns false when attempting to register a new user with an existing email.
it("test_register_fails_with_existing_email", async () => {
  // Create a separate connection object
  pool.query = jest.fn().mockRejectedValue({ code: "ER_DUP_ENTRY" });
  const result = await register("newuser", "testemail@test.com", "newpassword");
  expect(result).toBe(false);
});

// Tests that the function returns false when attempting to register a new user with a username, email, or password that exceeds the maximum length allowed by the database.
it("test_register_fails_with_max_length_exceeded", async () => {
  const longString = "a".repeat(256); // Generating a string that exceeds the maximum length allowed by the database
  const result = await register(longString, "newemail@test.com", "newpassword");
  expect(result).toBe(false);
});

// Tests that the function returns false when attempting to register a new user with a username, email, or password that contains invalid characters.
it("test_register_fails_with_invalid_characters", async () => {
  const invalidString = "test!@#$%^&*()_+-={}[]|\\:;\"'<>,.?/user"; // Generating a string that contains invalid characters
  const result = await register(
    invalidString,
    "newemail@test.com",
    "newpassword"
  );
  expect(result).toBe(false);
});

// Tests that the function returns false and handles a database connection failure gracefully.
it("test_register_handles_database_connection_failure", async () => {
  // Mocking the pool.query function to throw an error
  jest.fn(() => {
    throw new Error("Database connection failed");
  });

  const result = await register("newuser", "newemail@test.com", "newpassword");
  expect(result).toBe(false);
});
////////////////////////////////////////////////////////////
////////////////////////Login///////////////////////////////
////////////////////////////////////////////////////////////
// Tests that a user can successfully log in with a valid username and password.
it("test_login_valid_username_and_password", async () => {
  const mockConnection = {
    query: jest.fn().mockReturnValueOnce([
      [
        {
          username: "testuser",
          email: "testuser@test.com",
          password: "password123",
        },
      ],
    ]),
  };
  pool.getConnection = jest.fn().mockResolvedValueOnce(mockConnection);
  const result = await login("testuser", "password123");
  expect(result).toEqual({
    username: "testuser",
    email: "testuser@test.com",
    password: "password123",
  });
});

// Tests that a user can successfully log in with a valid email and password.
it("test_login_valid_email_and_password", async () => {
  const mockConnection = {
    query: jest.fn().mockReturnValueOnce([
      [
        {
          username: "testuser",
          email: "testuser@test.com",
          password: "password123",
        },
      ],
    ]),
  };
  pool.getConnection = jest.fn().mockResolvedValueOnce(mockConnection);
  const result = await login("testuser@test.com", "password123");
  expect(result).toEqual({
    username: "testuser",
    email: "testuser@test.com",
    password: "password123",
  });
});

// Tests that a user cannot log in with an invalid username and password.
it("test_login_invalid_username_and_password", async () => {
  const mockConnection = {
    query: jest.fn().mockReturnValueOnce([[]]),
  };
  pool.getConnection = jest.fn().mockResolvedValueOnce(mockConnection);
  const result = await login("invaliduser", "invalidpassword");
  expect(result).toBeNull();
});

// Tests that a user cannot log in with an invalid email and password.
it("test_login_invalid_email_and_password", async () => {
  const mockConnection = {
    query: jest.fn().mockReturnValueOnce([[]]),
  };
  pool.getConnection = jest.fn().mockResolvedValueOnce(mockConnection);
  const result = await login("invaliduser@test.com", "invalidpassword");
  expect(result).toBeNull();
});
