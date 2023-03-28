const { StoriesService, UsersService } = require('../../server/services');
const { StoriesRepository } = require('../../server/ repositories');
const { getPagingData } = require('../../server/utils');
const { ViewOnlyStory, CreateOnlyStory } = require('../../server/dto/story');
const { HTTP404NotFoundError } = require('../../server/errors');
const { storiesDB, usersDB } = require('../testDB');

jest.mock('../../server/utils');

describe('StoriesService', () => {
  describe('findAllStories', () => {
    it('should return a list of stories', async () => {
      // Arrange
      const limit = 5;
      const offset = 0;
      const page = 1;
      const mockStories = { count: storiesDB.length, rows: storiesDB };
      const mockResponse = {
        totalItems: storiesDB.length,
        payload: storiesDB,
        totalPages: 2,
        currentPage: page,
      };
      jest
        .spyOn(StoriesRepository, 'findAll')
        .mockResolvedValueOnce(mockStories);
      getPagingData.mockReturnValue(mockResponse);

      // Act
      const result = await StoriesService.findAllStories(limit, offset, page);

      // Assert
      expect(StoriesRepository.findAll).toHaveBeenCalledWith(limit, offset);
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
      jest.spyOn(StoriesRepository, 'findAll').mockRejectedValue(mockError);

      // Act & Assert
      await expect(
        StoriesService.findAllStories(limit, offset, page)
      ).rejects.toThrow(mockError);
    });
  });

  describe('findStoryById', () => {
    it('should return a story by id', async () => {
      const id = '1';
      const mockStory = storiesDB[0];
      jest
        .spyOn(StoriesRepository, 'findById')
        .mockResolvedValueOnce(mockStory);

      const result = await StoriesService.findStoryById(id);

      expect(StoriesRepository.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual({
        status: 200,
        message: new ViewOnlyStory(mockStory),
      });
    });

    it('should throw an HTTP404NotFoundError if the story is not found', async () => {
      const id = '1';
      jest.spyOn(StoriesRepository, 'findById').mockResolvedValue(null);

      await expect(StoriesService.findStoryById(id)).rejects.toThrow(
        HTTP404NotFoundError
      );
    });

    it('should throw an error if the repository call fails', async () => {
      const id = '1';
      const mockError = new Error('Internal server error');
      jest.spyOn(StoriesRepository, 'findById').mockRejectedValue(mockError);

      await expect(StoriesService.findStoryById(id)).rejects.toThrow(mockError);
    });
  });

  describe('findStoriesByAuthor', () => {
    it('should return a list of stories by authorId', async () => {
      const authorId = '1';
      const limit = 5;
      const offset = 0;
      const page = 1;
      const mockStories = { count: storiesDB.length, rows: storiesDB };
      const mockResponse = {
        totalItems: storiesDB.length,
        payload: storiesDB,
        totalPages: 2,
        currentPage: page,
      };
      jest
        .spyOn(StoriesRepository, 'findByAuthorId')
        .mockResolvedValueOnce(mockStories);
      getPagingData.mockReturnValue(mockResponse);

      const result = await StoriesService.findStoriesByAuthor(
        authorId,
        limit,
        offset,
        page
      );

      expect(StoriesRepository.findByAuthorId).toHaveBeenCalledWith(
        authorId,
        limit,
        offset
      );
      expect(result).toEqual({
        status: 200,
        message: mockResponse,
      });
    });

    it('should throw an error if the repository call fails', async () => {
      const authorId = '1';
      const limit = 5;
      const offset = 0;
      const page = 1;
      const mockError = new Error('Internal server error');
      jest
        .spyOn(StoriesRepository, 'findByAuthorId')
        .mockRejectedValue(mockError);

      await expect(
        StoriesService.findStoriesByAuthor(authorId, limit, offset, page)
      ).rejects.toThrow(mockError);
    });
  });

  describe('createStory', () => {
    it('should successfully create a new story', async () => {
      const mockStory = storiesDB[0];
      const mockUser = usersDB[0];
      jest
        .spyOn(UsersService, 'findUser')
        .mockResolvedValue({ message: mockUser });
      jest.spyOn(StoriesRepository, 'create').mockResolvedValue(mockStory);

      const expectedResponse = {
        status: 201,
        message: new CreateOnlyStory(mockStory),
      };

      const response = await StoriesService.createStory(
        mockStory.title,
        mockStory.description,
        mockUser.username
      );

      expect(UsersService.findUser).toHaveBeenCalledWith(mockUser.username);
      expect(StoriesRepository.create).toHaveBeenCalledWith(
        mockStory.title,
        mockStory.description,
        mockUser.id
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an error if the repository call fails', async () => {
      const mockStory = storiesDB[0];
      const mockUser = usersDB[0];
      const mockError = new Error('Internal server error');
      jest
        .spyOn(UsersService, 'findUser')
        .mockResolvedValue({ message: mockUser });
      jest.spyOn(StoriesRepository, 'create').mockRejectedValue(mockError);

      await expect(
        StoriesService.createStory(
          mockStory.title,
          mockStory.description,
          mockUser.username
        )
      ).rejects.toThrow(mockError);
    });
  });

  describe('updateStoryById', () => {
    it('should successfully update the story by id', async () => {
      const id = '1';
      const title = 'Title';
      const description = 'Description';
      jest.spyOn(StoriesRepository, 'updateStory').mockResolvedValue([1]);
      const expectedResponse = { status: 200, message: 'Story updated!' };

      const response = await StoriesService.updateStoryById(
        id,
        title,
        description
      );

      expect(StoriesRepository.updateStory).toHaveBeenCalledWith(
        id,
        title,
        description
      );
      expect(response).toEqual(expectedResponse);
    });

    it('should throw an HTTP404NotFoundError when the story does not exist', async () => {
      const id = '1';
      const title = 'Title';
      const description = 'Description';
      jest.spyOn(StoriesRepository, 'updateStory').mockResolvedValueOnce([0]);

      await expect(
        StoriesService.updateStoryById(id, title, description)
      ).rejects.toThrow(HTTP404NotFoundError);
    });
  });

  describe('deleteStoryById', () => {
    it('should delete a story with a given id', async () => {
      const id = '1';

      jest.spyOn(StoriesRepository, 'deleteStory').mockResolvedValueOnce(1);

      const result = await StoriesService.deleteStoryById(id);

      expect(StoriesRepository.deleteStory).toHaveBeenCalledWith(id);
      expect(result).toEqual({ status: 202, message: 'Story removed!' });
    });

    it('should throw an HTTP404NotFoundError when the story does not exist', async () => {
      const id = 'nonexistentuser';
      jest.spyOn(StoriesRepository, 'deleteStory').mockResolvedValueOnce(0);

      await expect(StoriesService.deleteStoryById(id)).rejects.toThrow(
        HTTP404NotFoundError
      );
    });
  });
});
