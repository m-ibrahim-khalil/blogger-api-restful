const { AuthService, UsersService } = require('../../server/services');
const { createJWT, comparePassword } = require('../../server/utils');
const { BadRequestError } = require('../../server/errors');

jest.mock('../../server/utils');

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
        .mockResolvedValueOnce({ status: 201, message: mockUser });
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
          status: 201,
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
        .spyOn(UsersService, 'findUser')
        .mockResolvedValueOnce({ message: mockUser });
      comparePassword.mockResolvedValueOnce(true);
      createJWT.mockReturnValue(mockAccessToken);

      const response = await AuthService.loginUser(
        mockUser.username,
        mockUser.password
      );

      expect(UsersService.findUser).toHaveBeenCalledTimes(1);
      expect(UsersService.findUser).toHaveBeenCalledWith(
        mockUser.username,
        false
      );
      expect(comparePassword).toHaveBeenCalledWith(
        mockUser.password,
        mockUser.password
      );
      expect(createJWT).toHaveBeenCalledWith({ username: mockUser.username });
      expect(response).toEqual(
        expect.objectContaining({
          status: 200,
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
      jest.spyOn(UsersService, 'findUser').mockRejectedValueOnce(expectedError);

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
        .spyOn(UsersService, 'findUser')
        .mockResolvedValueOnce({ message: mockUser });
      comparePassword.mockResolvedValue(false);

      await expect(
        AuthService.loginUser(mockUser.username, mockUser.password)
      ).rejects.toThrow(BadRequestError);
    });
  });
});
