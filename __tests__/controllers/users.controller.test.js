const { UsersController } = require('../../controllers');
const { UsersService } = require('../../services');
const { BadRequestError } = require('../../errors');
const { ContentNegotiation } = require('../../utils');
const { usersDB } = require('../__mocks__/testDB');

describe('Testing UsersController', () => {
  describe('Testing getAllUsers method', () => {
    it('should call UsersService.findAllUsers and return a response', async () => {
      //   Arrabge
      const req = {
        query: {
          page: 0,
          size: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: usersDB,
      };
      jest
        .spyOn(UsersService, 'findAllUsers')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      // Act
      const response = await UsersController.getAllUsers(req, res, next);

      // Assert
      expect(UsersService.findAllUsers).toHaveBeenCalledTimes(1);
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if UsersService.findAllUsers throws an error', async () => {
      const req = {
        query: {
          page: 0,
          size: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest
        .spyOn(UsersService, 'findAllUsers')
        .mockRejectedValueOnce(expectedError);

      await UsersController.getAllUsers(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('getUserByUsername method', () => {
    it('should return a BadRequest error to the error middleware, if required fields are missing', async () => {
      const req = { params: {} };
      const res = {};
      const next = jest.fn();
      await UsersController.getUserByUsername(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing username parameter!',
        })
      );
    });

    it('should call UsersService.findUser and return a response', async () => {
      const req = {
        params: {
          username: 'testuser',
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: usersDB[0],
      };
      jest
        .spyOn(UsersService, 'findUser')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await UsersController.getUserByUsername(req, res, next);

      expect(UsersService.findUser).toHaveBeenCalledWith(req.params.username);
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if UsersService.findUser throws an error', async () => {
      const req = {
        params: {
          username: 'testuser',
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest.spyOn(UsersService, 'findUser').mockRejectedValueOnce(expectedError);

      await UsersController.getUserByUsername(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('updateUserByUsername method', () => {
    it('should return a success response when updating a user', async () => {
      const username = 'testuser';
      const newPassword = 'newpassword';
      const oldPassword = 'oldpassword';
      const req = {
        params: {
          username,
        },
        body: {
          oldPassword, newPassword
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: usersDB[0],
      };
      jest
        .spyOn(UsersService, 'updatePasswordByUsername')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await UsersController.updatePasswordByUsername(
        req,
        res,
        next
      );

      expect(UsersService.updatePasswordByUsername).toHaveBeenCalledWith(
        username,
        oldPassword,
        newPassword
      );
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should throw a BadRequestError when username parameter is missing', async () => {
      const req = {
        params: {},
        body: {
          Password: 'password',
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'Missing username parameter!',
      });
      await UsersController.updatePasswordByUsername(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it('should throw a BadRequestError when Password is missing', async () => {
      const req = {
        params: {
          username: 'testuser',
        },
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'Password should not be empty!',
      });

      await UsersController.updatePasswordByUsername(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('deleteByUsername', () => {
    it('should return a success response when deleting a user', async () => {
      const username = 'testuser';
      const req = {
        params: {
          username,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: 'user deleted',
      };
      jest
        .spyOn(UsersService, 'deleteByUsername')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await UsersController.deleteByUsername(
        req,
        res,
        next
      );

      expect(UsersService.deleteByUsername).toHaveBeenCalledWith(username);
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalled();
      expect(response).toBe(expectedResponse);
    });

    it('should throw a BadRequestError when username parameter is missing', async () => {
      const req = {
        params: {},
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'Missing username parameter!',
      });

      await UsersController.deleteByUsername(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
