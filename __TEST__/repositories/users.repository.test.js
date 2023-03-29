const { UsersRepository } = require('../../server/ repositories');
const { User } = require('../../server/models');
const { usersDB } = require('../testDB');

class TestUser {
  constructor(user) {
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.createdAt = '12-12-12';
    this.updatedAt = '12-12-12';
    this.id = '12345';
  }
}

describe('Testing Users Repository: ', () => {
  describe('Testing findAllUsers function: ', () => {
    it('should return a list of users', async () => {
      // Arrange
      const size = 3;
      const skip = 0;
      jest
        .spyOn(User, 'findAndCountAll')
        .mockImplementation(({ limit, offset }) =>
          usersDB.slice(offset, offset + limit)
        );

      // Act
      const response = await UsersRepository.findAll(size, skip);

      // Assert
      expect(User.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: size,
          offset: skip,
        })
      );
      expect(response.length).toBe(size);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            username: expect.any(String),
            email: expect.any(String),
            password: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            id: expect.any(String),
          }),
        ])
      );
    });

    it('should throw an error if there is an error in the database query', async () => {
      // Arrange
      const limit = 3;
      const offset = 0;
      const expectedError = new Error('Database error!');
      jest.spyOn(User, 'findAndCountAll').mockRejectedValueOnce(expectedError);

      // Act & Assert
      await expect(UsersRepository.findAll(limit, offset)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe('Testing findByUsername function', () => {
    it('should return a user by username', async () => {
      const username = 'testuser';
      const expectedData = { ...usersDB[0] };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(expectedData);

      const response = await UsersRepository.findByUsername(username);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(response).toEqual(expectedData);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const username = 'testuser';
      const expectedError = new Error('Database error');
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(expectedError);

      await expect(UsersRepository.findByUsername(username)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe('Testing findByEmail function', () => {
    it('should return a user by email', async () => {
      const email = 'testuser@gmail.com';
      const expectedData = { ...usersDB[0] };
      jest.spyOn(User, 'findOne').mockResolvedValueOnce(expectedData);

      const response = await UsersRepository.findByEmail(email);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email },
      });
      expect(response).toEqual(expectedData);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const email = 'testuser@gmail.com';
      const expectedError = new Error('Database error');
      jest.spyOn(User, 'findOne').mockRejectedValueOnce(expectedError);

      await expect(UsersRepository.findByEmail(email)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe('Testing CreateUser function: ', () => {
    it('should create an user and return a user body: ', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';
      const expectedUser = { username, email, password };
      jest
        .spyOn(User, 'create')
        .mockImplementation((user) => new TestUser(user));
      const response = await UsersRepository.create(username, email, password);
      expect(User.create).toHaveBeenCalledTimes(1);
      expect(User.create).toHaveBeenCalledWith({
        username: username.toLowerCase(),
        email,
        password,
      });
      expect(response).toEqual(expect.objectContaining(expectedUser));
    });

    it('should throw an error if there is an error in the database query', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';
      const expectedError = new Error('Database error');
      jest.spyOn(User, 'create').mockRejectedValueOnce(expectedError);

      await expect(
        UsersRepository.create(username, email, password)
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing updateUser function: ', () => {
    it('should update a user by username and return 1', async () => {
      const username = 'testuser';
      const password = 'testpassword';
      jest.spyOn(User, 'update').mockResolvedValueOnce([1]);

      const user = await UsersRepository.updateUser(username, password);

      expect(User.update).toHaveBeenCalledWith(
        { password },
        { where: { username: username.toLowerCase() } }
      );
      expect(user[0]).toBe(1);
    });

    it('should return 0 if the user does not exist', async () => {
      const username = 'nonexistentuser';
      const password = 'testpassword';
      jest.spyOn(User, 'update').mockResolvedValueOnce([0]);

      const user = await UsersRepository.updateUser(username, password);

      expect(User.update).toHaveBeenCalledWith(
        { password },
        { where: { username: username.toLowerCase() } }
      );
      expect(user[0]).toBe(0);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const username = 'testuser';
      const password = 'newpassword';
      const expectedError = new Error('Database error');
      jest.spyOn(User, 'update').mockRejectedValueOnce(expectedError);

      await expect(
        UsersRepository.updateUser(username, password)
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing deleteUser function: ', () => {
    it('should delete a user by username', async () => {
      const username = 'testuser';
      jest.spyOn(User, 'destroy').mockResolvedValueOnce(1);

      const user = await UsersRepository.deleteUser(username);

      expect(User.destroy).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(user).toBe(1);
    });

    it('should return 0 if the user does not exist', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(User, 'destroy').mockResolvedValueOnce(0);

      const user = await UsersRepository.deleteUser(username);

      expect(User.destroy).toHaveBeenCalledWith({
        where: { username: username.toLowerCase() },
      });
      expect(user).toBe(0);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const username = 'testuser';
      const expectedError = new Error('Database error');
      jest.spyOn(User, 'destroy').mockRejectedValueOnce(expectedError);

      await expect(UsersRepository.deleteUser(username)).rejects.toThrow(
        expectedError
      );
    });
  });
});
