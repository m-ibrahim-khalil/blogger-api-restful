const { AuthService, UsersService } = require('../../server/services');
const { comparePassword } = require('../../server/utils');

describe('Testing Auth Service: ', () => {
  describe('Testing registerUser function: ', () => {
    it('should return a registered user: ', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';
      const expectedUser = { username, email, password };
      jest
        .spyOn(UsersService, 'createUser')
        .mockResolvedValueOnce({ status: 201, message: expectedUser });

      const data = await AuthService.registerUser(username, email, password);

      expect(UsersService.createUser).toHaveBeenCalledTimes(1);
      expect(data).toEqual(
        expect.objectContaining({
          status: 201,
          message: expectedUser,
          accessToken: expect.any(String),
        })
      );
    });

    it('should throw an error if there is an error in the database query', async () => {
      const username = 'testuser';
      const email = 'testuser@example.com';
      const password = 'password';
      const expectedError = new Error('Database error!');
      jest
        .spyOn(UsersService, 'createUser')
        .mockRejectedValueOnce(expectedError);

      await expect(
        AuthService.registerUser(username, email, password)
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing LoginUser function: ', () => {
    it('should return a accesstoken: ', async () => {
      const username = 'testuser';
      const password = 'password';
      const expectedUser = { username, password };
      jest
        .spyOn(UsersService, 'findUser')
        .mockResolvedValueOnce({ message: expectedUser });
      comparePassword.mockResolvedValueOnce(true);

      const data = await AuthService.loginUser(username, password);

      expect(UsersService.findAllUsers).toHaveBeenCalledTimes(1);
      expect(data).toEqual(
        expect.objectContaining({
          status: 201,
          message: expect.any(String),
          accessToken: expect.any(String),
        })
      );
    });

    it('should throw an error if there is an error in the database query', async () => {
      const username = 'testuser';
      const password = 'password';
      const expectedError = new Error('Database error!');
      jest.spyOn(UsersService, 'findUser').mockRejectedValueOnce(expectedError);

      await expect(AuthService.loginUser(username, password)).rejects.toThrow(
        expectedError
      );
    });
  });
});
