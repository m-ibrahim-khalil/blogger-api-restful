const { StoriesControler } = require('../../server/controllers');
const { StoriesService } = require('../../server/services');
const { BadRequestError } = require('../../server/errors');
const { ContentNegotiation } = require('../../server/utils');
const { storiesDB } = require('../testDB');

describe('Testing StoriesControler', () => {
  describe('Testing getAllStories method', () => {
    it('should call StoriesService.findAllStories and return a response', async () => {
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
        message: storiesDB,
      };
      jest
        .spyOn(StoriesService, 'findAllStories')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      // Act
      const response = await StoriesControler.getAllStories(req, res, next);

      // Assert
      expect(StoriesService.findAllStories).toHaveBeenCalledTimes(1);
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if StoriesService.findAllStories throws an error', async () => {
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
        .spyOn(StoriesService, 'findAllStories')
        .mockRejectedValueOnce(expectedError);

      await StoriesControler.getAllStories(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('getStoryById method', () => {
    it('should return a BadRequest error to the error middleware, if required fields are missing', async () => {
      const req = { params: {} };
      const res = {};
      const next = jest.fn();
      await StoriesControler.getStoryById(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing story id parameter!',
        })
      );
    });

    it('should call StoriesService.findStoryById and return a response', async () => {
      const req = {
        params: {
          id: '1',
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: storiesDB[0],
      };
      jest
        .spyOn(StoriesService, 'findStoryById')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await StoriesControler.getStoryById(req, res, next);

      expect(StoriesService.findStoryById).toHaveBeenCalledWith(req.params.id);
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if StoriesService.findStoryById throws an error', async () => {
      const req = {
        params: {
          id: '1',
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest
        .spyOn(StoriesService, 'findStoryById')
        .mockRejectedValueOnce(expectedError);

      await StoriesControler.getStoryById(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('getStroiesByAuthor method', () => {
    it('should return a BadRequest error to the error middleware, if required fields are missing', async () => {
      const req = {
        params: {},
        query: {
          page: 0,
          size: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      await StoriesControler.getStroiesByAuthor(req, res, next);
      expect(next).toHaveBeenCalledWith(
        new BadRequestError({
          name: 'Validation Error!',
          description: 'Missing authorId parameter!',
        })
      );
    });

    it('should call StoriesService.findStoriesByAuthor and return a response', async () => {
      const req = {
        params: {
          authorId: '1',
        },
        query: {
          page: 0,
          size: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: storiesDB,
      };
      jest
        .spyOn(StoriesService, 'findStoriesByAuthor')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await StoriesControler.getStroiesByAuthor(
        req,
        res,
        next
      );

      expect(StoriesService.findStoriesByAuthor).toHaveBeenCalledWith(
        req.params.authorId,
        expect.any(Number),
        expect.any(Number),
        req.query.page
      );
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should call the error middleware if StoriesService.findStoriesByAuthor throws an error', async () => {
      const req = {
        params: {
          authorId: '1',
        },
        query: {
          page: 0,
          size: 5,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest
        .spyOn(StoriesService, 'findStoriesByAuthor')
        .mockRejectedValueOnce(expectedError);

      await StoriesControler.getStroiesByAuthor(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('createStory method', () => {
    it('should return a success response when create a story', async () => {
      const username = 'testUser';
      const title = 'Test title';
      const description = 'Test description';
      const req = {
        username,
        body: {
          title,
          description,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: storiesDB[0],
      };
      jest
        .spyOn(StoriesService, 'createStory')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await StoriesControler.createStory(req, res, next);

      expect(StoriesService.createStory).toHaveBeenCalledWith(
        title,
        description,
        username
      );
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should throw a BadRequestError when title or decription is missing', async () => {
      const username = 'testUser';
      const req = {
        username,
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'title and description are required!',
      });
      await StoriesControler.createStory(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it('should call the error middleware if StoriesService.createStory throws an error', async () => {
      const username = 'testUser';
      const title = 'Test title';
      const description = 'Test description';
      const req = {
        username,
        body: {
          title,
          description,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new Error('Something went wrong');
      jest
        .spyOn(StoriesService, 'createStory')
        .mockRejectedValueOnce(expectedError);

      await StoriesControler.createStory(req, res, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('updateStoryById method', () => {
    it('should return a success response when updating a story', async () => {
      const id = '1';
      const title = 'Test title';
      const description = 'Test description';
      const req = {
        params: {
          id,
        },
        body: {
          title,
          description,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: 'story updated!',
      };
      jest
        .spyOn(StoriesService, 'updateStoryById')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await StoriesControler.updateStoryById(req, res, next);

      expect(StoriesService.updateStoryById).toHaveBeenCalledWith(
        id,
        title,
        description
      );
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalledTimes(
        1
      );
      expect(response).toBe(expectedResponse);
    });

    it('should throw a BadRequestError when id parameter is missing', async () => {
      const title = 'Test title';
      const description = 'Test description';
      const req = {
        params: {},
        body: {
          title,
          description,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'Missing story id parameter!',
      });
      await StoriesControler.updateStoryById(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });

    it('should throw a BadRequestError when title or decription is missing', async () => {
      const req = {
        params: {
          id: '1',
        },
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'title and description are required!',
      });

      await StoriesControler.updateStoryById(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe('deleteStoryById', () => {
    it('should return a success response when deleting a story', async () => {
      const id = '1';
      const req = {
        params: {
          id,
        },
      };
      const res = {};
      const next = jest.fn();
      const expectedResponse = {
        status: 200,
        message: 'story deleted!',
      };
      jest
        .spyOn(StoriesService, 'deleteStoryById')
        .mockResolvedValueOnce(expectedResponse);
      jest
        .spyOn(ContentNegotiation.prototype, 'sendResponse')
        .mockResolvedValueOnce(expectedResponse);

      const response = await StoriesControler.deleteStoryById(req, res, next);

      expect(StoriesService.deleteStoryById).toHaveBeenCalledWith(id);
      expect(ContentNegotiation.prototype.sendResponse).toHaveBeenCalled();
      expect(response).toBe(expectedResponse);
    });

    it('should throw a BadRequestError when id parameter is missing', async () => {
      const req = {
        params: {},
      };
      const res = {};
      const next = jest.fn();
      const expectedError = new BadRequestError({
        name: 'Validation Error!',
        description: 'Missing story id parameter!',
      });

      await StoriesControler.deleteStoryById(req, res, next);
      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
