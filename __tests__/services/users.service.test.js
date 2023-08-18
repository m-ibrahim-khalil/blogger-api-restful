const { UsersService } = require('../../services');
const { UsersRepository } = require('../../ repositories');
const { generateHashPassword, comparePassword, getPagingData } = require('../../utils');
const { ViewOnlyUser, CreateOnlyUser } = require('../../dto/user');

const {
  BadRequestError,
  HTTP404NotFoundError,
} = require('../../errors');
const { usersDB } = require('../__mocks__/testDB');

jest.mock('../../utils');

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

  describe('updatePasswordByUsername', () => {
    it('should successfully update the user password by username', async () => {
      const username = 'testuser';
      const oldPassword = 'oldpassword';
      const newPassword = 'newpassword';
      const hashedPassword = 'hashedNewPassword';
      jest.spyOn(UsersRepository, 'updatePasswordByUsername').mockResolvedValue([1]);
      jest
        .spyOn(UsersService, 'findUserPassword')
        .mockResolvedValueOnce({ password: oldPassword});
      generateHashPassword.mockResolvedValueOnce(hashedPassword);
      comparePassword.mockResolvedValueOnce(true);
      const expectedResponse = {  message: 'Password updated!' };

      const response = await UsersService.updatePasswordByUsername(
        username,
        oldPassword,
        newPassword
      );

      expect(generateHashPassword).toHaveBeenCalledWith(newPassword);
      expect(UsersRepository.updatePasswordByUsername).toHaveBeenCalledWith(
        username,
        hashedPassword
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an HTTP404NotFoundError when the user does not exist', async () => {
      const username = 'nonexistentuser';
      const oldPassword = 'oldpassword';
      const newPassword = 'newpassword';
      jest.spyOn(UsersRepository, 'updatePasswordByUsername').mockResolvedValueOnce([0]);

      await expect(
        UsersService.updatePasswordByUsername(username, oldPassword, newPassword)
      ).rejects.toThrow(HTTP404NotFoundError);
    });
  });

  describe('deleteByUsername', () => {
    it('should delete a user with a given username', async () => {
      const username = 'testuser';

      jest.spyOn(UsersRepository, 'deleteByUsername').mockResolvedValueOnce(1);

      const result = await UsersService.deleteByUsername(username);

      expect(UsersRepository.deleteByUsername).toHaveBeenCalledWith(username);
      expect(result).toEqual({ message: 'User removed!' });
    });

    it('should throw an HTTP404NotFoundError when the user does not exist', async () => {
      const username = 'nonexistentuser';
      jest.spyOn(UsersRepository, 'deleteByUsername').mockResolvedValueOnce(0);

      await expect(UsersService.deleteByUsername(username)).rejects.toThrow(
        HTTP404NotFoundError
      );
    });
  });
});
