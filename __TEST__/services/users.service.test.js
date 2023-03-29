const { UsersService } = require('../../server/services');
const { UsersRepository } = require('../../server/ repositories');
const { generateHashPassword, getPagingData } = require('../../server/utils');
const { ViewOnlyUser, CreateOnlyUser } = require('../../server/dto/user');
const {
  BadRequestError,
  HTTP404NotFoundError,
} = require('../../server/errors');
const { usersDB } = require('../testDB');

jest.mock('../../server/utils');

describe('UsersService', () => {
  describe('findAllUsers', () => {
    it('should return a list of users', async () => {
      // Arrange
      const limit = 5;
      const offset = 0;
      const page = 1;
      const mockUsers = { count: usersDB.length, rows: usersDB };
      const mockResponse = {
        totalItems: usersDB.length,
        payload: usersDB,
        totalPages: 2,
        currentPage: page,
      };
      jest.spyOn(UsersRepository, 'findAll').mockResolvedValueOnce(mockUsers);
      getPagingData.mockReturnValue(mockResponse);

      // Act
      const result = await UsersService.findAllUsers(limit, offset, page);

      // Assert
      expect(UsersRepository.findAll).toHaveBeenCalledWith(limit, offset);
      expect(result).toEqual({
        status: 200,
        message: mockResponse,
      });
    });

    it('should throw an error if the repository call fails', async () => {
      // Arrange
      const limit = 5;
      const offset = 0;
      const page = 1;
      const mockError = new Error('Internal server error');
      jest.spyOn(UsersRepository, 'findAll').mockRejectedValue(mockError);

      // Act & Assert
      await expect(
        UsersService.findAllUsers(limit, offset, page)
      ).rejects.toThrow(mockError);
    });
  });

  describe('findUser', () => {
    it('should return a user by username', async () => {
      const username = 'testuser';
      const mockUser = usersDB[0];
      jest
        .spyOn(UsersRepository, 'findByUsername')
        .mockResolvedValueOnce(mockUser);

      const result = await UsersService.findUser(username);

      expect(UsersRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(result).toEqual({
        status: 200,
        message: new ViewOnlyUser(mockUser),
      });
    });

    it('should throw an HTTP404NotFoundError if the user is not found', async () => {
      const username = 'testuser';
      jest.spyOn(UsersRepository, 'findByUsername').mockResolvedValue(null);

      await expect(UsersService.findUser(username)).rejects.toThrow(
        HTTP404NotFoundError
      );
    });

    it('should return a user without DTO if the dto parameter is false', async () => {
      const username = 'testuser';
      const mockUser = usersDB[0];
      jest.spyOn(UsersRepository, 'findByUsername').mockResolvedValue(mockUser);

      const result = await UsersService.findUser(username, false);

      expect(UsersRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(result).toEqual({
        status: 200,
        message: mockUser,
      });
    });

    it('should throw an error if the repository call fails', async () => {
      const username = 'testuser';
      const mockError = new Error('Internal server error');
      jest
        .spyOn(UsersRepository, 'findByUsername')
        .mockRejectedValue(mockError);

      await expect(UsersService.findUser(username)).rejects.toThrow(mockError);
    });
  });

  describe('createUser', () => {
    it('should successfully create a new user', async () => {
      const username = 'testuser';
      const email = 'testuser@test.com';
      const password = 'password';
      const hashedPassword = 'hashedPassword';

      jest.spyOn(UsersRepository, 'findByUsername').mockResolvedValue(null);
      jest.spyOn(UsersRepository, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(UsersRepository, 'create').mockResolvedValue(usersDB[0]);
      generateHashPassword.mockResolvedValueOnce(hashedPassword);

      const expectedResponse = {
        status: 201,
        message: new CreateOnlyUser(usersDB[0]),
      };

      const response = await UsersService.createUser(username, email, password);

      expect(UsersRepository.findByUsername).toHaveBeenCalledWith(username);
      expect(UsersRepository.findByEmail).toHaveBeenCalledWith(email);
      expect(generateHashPassword).toHaveBeenCalledWith(password);
      expect(UsersRepository.create).toHaveBeenCalledWith(
        username,
        email,
        hashedPassword
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should throw a BadRequestError when the username already exists', async () => {
      const username = 'testuser';
      const email = 'testuser@test.com';
      const password = 'password';

      jest
        .spyOn(UsersRepository, 'findByUsername')
        .mockResolvedValue(usersDB[0]);

      await expect(
        UsersService.createUser(username, email, password)
      ).rejects.toThrow(BadRequestError);
    });

    it('should throw a BadRequestError when the email already exists', async () => {
      const username = 'testuser';
      const email = 'testuser@test.com';
      const password = 'password';
      jest.spyOn(UsersRepository, 'findByUsername').mockResolvedValue(null);
      jest.spyOn(UsersRepository, 'findByEmail').mockResolvedValue(usersDB[0]);

      await expect(
        UsersService.createUser(username, email, password)
      ).rejects.toThrow(BadRequestError);
    });
  });

  describe('updateUserByUsername', () => {
    it('should successfully update the user password by username', async () => {
      const username = 'testuser';
      const password = 'newpassword';
      const hashedPassword = 'hashedNewPassword';
      jest.spyOn(UsersRepository, 'updateUser').mockResolvedValue([1]);
      generateHashPassword.mockResolvedValueOnce(hashedPassword);
      const expectedResponse = { status: 200, message: 'User updated!' };

      const response = await UsersService.updateUserByUsername(
        username,
        password
      );

      expect(generateHashPassword).toHaveBeenCalledWith(password);
      expect(UsersRepository.updateUser).toHaveBeenCalledWith(
        username,
        hashedPassword
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an HTTP404NotFoundError when the user does not exist', async () => {
      const username = 'nonexistentuser';
      const password = 'newpassword';
      jest.spyOn(UsersRepository, 'updateUser').mockResolvedValueOnce([0]);

      await expect(
        UsersService.updateUserByUsername(username, password)
      ).rejects.toThrow(HTTP404NotFoundError);
    });
  });

  describe('deleteUserByUsername', () => {
    it('should delete a user with a given username', async () => {
      const username = 'testuser';

      jest.spyOn(UsersRepository, 'deleteUser').mockResolvedValueOnce(1);

      const result = await UsersService.deleteUserByUsername(username);

      expect(UsersRepository.deleteUser).toHaveBeenCalledWith(username);
      expect(result).toEqual({ status: 202, message: 'User removed!' });
    });

    it('should throw an HTTP404NotFoundError when the user does not exist', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(UsersRepository, 'deleteUser').mockResolvedValueOnce(0);

      await expect(UsersService.deleteUserByUsername(username)).rejects.toThrow(
        HTTP404NotFoundError
      );
    });
  });
});
