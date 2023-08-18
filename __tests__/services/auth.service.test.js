const { AuthService, UsersService } = require('../../services');
const { createJWT, comparePassword } = require('../../utils');
const { BadRequestError } = require('../../errors');

jest.mock('../../utils');

describe('Testing Auth Service: ', () => {
  describe('Testing registerUser function: ', () => {
    it('should register user successfully and return access token: ', async () => {
      // Arrange
      const mockUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
      };
      const mockAccessToken = 'mock-access-token';
      jest
        .spyOn(UsersService, 'createUser')
        .mockResolvedValueOnce({  message: mockUser });
      createJWT.mockReturnValue(mockAccessToken);

      // Act
      const response = await AuthService.registerUser(
        mockUser.username,
        mockUser.email,
        mockUser.password
      );

      // Assert
      expect(UsersService.createUser).toHaveBeenCalledTimes(1);
      expect(createJWT).toHaveBeenCalledWith({ username: mockUser.username });
      expect(response).toEqual(
        expect.objectContaining({
          message: mockUser,
          accessToken: mockAccessToken,
        })
      );
    });

    it('should throw an error if UserService.createUser throws an error', async () => {
      // Arrange
      const mockUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
      };
      const expectedError = new Error('Database error!');
      jest
        .spyOn(UsersService, 'createUser')
        .mockRejectedValueOnce(expectedError);

      // Act & Assert
      await expect(
        AuthService.registerUser(
          mockUser.username,
          mockUser.email,
          mockUser.password
        )
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing LoginUser function: ', () => {
    it('should login user successfully and return access token: ', async () => {
      const mockUser = {
        username: 'testuser',
        password: 'password',
      };
      const mockAccessToken = 'mock-access-token';
      jest
        .spyOn(UsersService, 'findUserPassword')
        .mockResolvedValueOnce({ password: mockUser.password});
      comparePassword.mockResolvedValueOnce(true);
      createJWT.mockReturnValue(mockAccessToken);

      const response = await AuthService.loginUser(
        mockUser.username,
        mockUser.password
      );

      expect(UsersService.findUserPassword).toHaveBeenCalledTimes(1);
      expect(UsersService.findUserPassword).toHaveBeenCalledWith(
        mockUser.username,
      );
      expect(comparePassword).toHaveBeenCalledWith(
        mockUser.password,
        mockUser.password
      );
      expect(createJWT).toHaveBeenCalledWith({ username: mockUser.username });
      expect(response).toEqual(
        expect.objectContaining({
          message: 'Login Succes!',
          accessToken: mockAccessToken,
        })
      );
    });

    it('should throw an error if UserService.findUser throws an error', async () => {
      const mockUser = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password',
      };
      const expectedError = new Error('Database error!');
      jest.spyOn(UsersService, 'findUserPassword').mockRejectedValueOnce(expectedError);

      await expect(
        AuthService.loginUser(mockUser.username, mockUser.password)
      ).rejects.toThrow(expectedError);
    });

    it('should throw an error if password is incorrect', async () => {
      const mockUser = {
        username: 'testuser',
        password: 'wrong_password',
      };
      jest
        .spyOn(UsersService, 'findUserPassword')
        .mockResolvedValueOnce({ password: mockUser.password });
      comparePassword.mockResolvedValue(false);

      await expect(
        AuthService.loginUser(mockUser.username, mockUser.password)
      ).rejects.toThrow(BadRequestError);
    });
  });
});
