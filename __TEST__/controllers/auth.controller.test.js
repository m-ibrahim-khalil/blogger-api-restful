const { AuthController } = require('../../server/controllers');
const { AuthService } = require('../../server/services');
const { BadRequestError } = require('../../server/errors');
const { ContentNegotiation } = require('../../server/utils');

describe('Testing AuthController', () => {
  describe('testing register method', () => {
    it('should return a BadRequest error to the error middleware, if required fields are missing', async () => {
      // Arrnge
      const req = { body: {} };
      const res = {};
      const next = jest.fn();

      // Act & Assert
      await AuthController.register(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new BadRequestError({
          name: 'Validation Error!',
          description: 'Username, Email and Password are required!',
        })
      );
    });

    it('should call AuthService.registerUser and return a response', async () => {
      // Arrange
      const req = {
        body: {
          Username: 'testuser',
          Email: 'test@example.com',
          Password: 'password',
        },
      };
      const res = { cookie: jest.fn() };
      const next = jest.fn();
      const expectedResponse = {
        status: 201,
        message: 'User registered successfully',
        accessToken: 'some_access_token',
      };
      jest
        .spyOn(AuthService, 'registerUser')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      // Act
      const response = await AuthController.register(req, res, next);

      // Assert
      expect(AuthService.registerUser).toHaveBeenCalledWith(
        req.body.Username,
        req.body.Email,
        req.body.Password
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'jwt',
        expectedResponse.accessToken,
        {
          httpOnly: true,
        }
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if AuthService.registerUser throws an error', async () => {
      const req = {
        body: {
          Username: 'testuser',
          Email: 'test@example.com',
          Password: 'password',
        },
      };
      const res = { cookie: jest.fn() };
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest
        .spyOn(AuthService, 'registerUser')
        .mockRejectedValueOnce(expectedError);

      await AuthController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('login', () => {
    it('should return a BadRequest error to the error middleware, if required fields are missing', async () => {
      const req = { body: {} };
      const res = {};
      const next = jest.fn();
      await AuthController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new BadRequestError({
          name: 'Validation Error!',
          description: 'Username and Password are required!',
        })
      );
    });

    it('should call AuthService.loginUser and return a response', async () => {
      const req = {
        body: {
          Username: 'testuser',
          Password: 'password',
        },
      };
      const res = { cookie: jest.fn() };
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: 'User logged in successfully',
        accessToken: 'some_access_token',
      };
      jest
        .spyOn(AuthService, 'loginUser')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await AuthController.login(req, res, next);

      expect(AuthService.loginUser).toHaveBeenCalledWith(
        req.body.Username,
        req.body.Password
      );
      expect(res.cookie).toHaveBeenCalledWith(
        'jwt',
        expectedResponse.accessToken,
        {
          httpOnly: true,
        }
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if AuthService.loginUser throws an error', async () => {
      const req = {
        body: {
          Username: 'testuser',
          Password: 'password',
        },
      };
      const res = { cookie: jest.fn() };
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest.spyOn(AuthService, 'loginUser').mockRejectedValueOnce(expectedError);

      await AuthController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
