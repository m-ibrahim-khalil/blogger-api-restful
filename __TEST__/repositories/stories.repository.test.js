const { StoriesRepository } = require('../../server/ repositories');
const { Story } = require('../../server/models');
const { storiesDB } = require('../testDB');

class TestStory {
  constructor(story) {
    this.title = story.title;
    this.description = story.description;
    this.authorId = story.authorId;
    this.id = '6';
  }
}

describe('Testing Stories Repository: ', () => {
  describe('Testing findAllStories function: ', () => {
    it('should return a list of stories: ', async () => {
      // Arrange
      const size = 3;
      const skip = 0;
      jest
        .spyOn(Story, 'findAndCountAll')
        .mockImplementation(({ limit, offset }) =>
          storiesDB.slice(offset, offset + limit)
        );

      // Act
      const response = await StoriesRepository.findAll(size, skip);

      // Assert
      expect(Story.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: size,
          offset: skip,
        })
      );
      expect(response.length).toBe(size);
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
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
      jest.spyOn(Story, 'findAndCountAll').mockRejectedValueOnce(expectedError);

      // Act & Assert
      await expect(StoriesRepository.findAll(limit, offset)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe('Testing findById function: ', () => {
    it('should return a Story by id: ', async () => {
      const id = '1';
      const expectedData = { ...storiesDB[0] };
      jest.spyOn(Story, 'findOne').mockResolvedValueOnce(expectedData);

      const response = await StoriesRepository.findById(id);

      expect(Story.findOne).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id },
        })
      );
      expect(response).toEqual(expectedData);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const id = '1';
      const expectedError = new Error('Database error');
      jest.spyOn(Story, 'findOne').mockRejectedValueOnce(expectedError);

      await expect(StoriesRepository.findById(id)).rejects.toThrow(
        expectedError
      );
    });
  });

  describe('Testing findByAuthorId function: ', () => {
    it('should return a list of stories of a given authorId: ', async () => {
      const authorId = '1';
      const size = 3;
      const skip = 0;
      jest
        .spyOn(Story, 'findAndCountAll')
        .mockResolvedValueOnce([storiesDB[0]]);

      const response = await StoriesRepository.findByAuthorId(
        authorId,
        size,
        skip
      );

      expect(Story.findAndCountAll).toHaveBeenCalledWith(
        expect.objectContaining({
          limit: size,
          offset: skip,
          where: {
            authorId,
          },
        })
      );
      expect(response).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
            authorId,
            id: expect.any(String),
          }),
        ])
      );
    });

    it('should throw an error if there is an error in the database query', async () => {
      const authorId = '1';
      const limit = 3;
      const offset = 0;
      const expectedError = new Error('Database error!');
      jest.spyOn(Story, 'findAndCountAll').mockRejectedValueOnce(expectedError);
      await expect(
        StoriesRepository.findByAuthorId(authorId, limit, offset)
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing Create Story function: ', () => {
    it('should create an Story and return a Story body: ', async () => {
      const title = 'Test';
      const description = 'Hello World!';
      const authorId = '1234';
      const expectedStory = { title, description, authorId };
      jest
        .spyOn(Story, 'create')
        .mockImplementation((story) => new TestStory(story));
      const response = await StoriesRepository.create(
        title,
        description,
        authorId
      );
      expect(Story.create).toHaveBeenCalledTimes(1);
      expect(Story.create).toHaveBeenCalledWith({
        title,
        description,
        authorId,
      });
      expect(response).toEqual(expect.objectContaining(expectedStory));
    });

    it('should throw an error if there is an error in the database query', async () => {
      const title = 'Test';
      const description = 'Hello World!';
      const authorId = '1234';
      const expectedError = new Error('Database error');
      jest.spyOn(Story, 'create').mockRejectedValueOnce(expectedError);

      await expect(
        StoriesRepository.create(title, description, authorId)
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing updateStory function: ', () => {
    it('should update a story by id and return 1', async () => {
      const id = '1';
      const title = 'Test Update';
      const description = 'Hello World update!';
      jest.spyOn(Story, 'update').mockResolvedValueOnce([1]);

      const story = await StoriesRepository.updateStory(id, title, description);

      expect(Story.update).toHaveBeenCalledWith(
        { title, description },
        { where: { id } }
      );
      expect(story[0]).toBe(1);
    });

    it('should return 0 if the story does not exist: ', async () => {
      const id = 'not_exist_id';
      const title = 'Test Update';
      const description = 'Hello World update!';
      jest.spyOn(Story, 'update').mockResolvedValueOnce([0]);

      const story = await StoriesRepository.updateStory(id, title, description);

      expect(Story.update).toHaveBeenCalledWith(
        { title, description },
        { where: { id } }
      );
      expect(story[0]).toBe(0);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const id = '1';
      const title = 'Test Update';
      const description = 'Hello World update!';
      const expectedError = new Error('Database error');
      jest.spyOn(Story, 'update').mockRejectedValueOnce(expectedError);

      await expect(
        StoriesRepository.updateStory(id, title, description)
      ).rejects.toThrow(expectedError);
    });
  });

  describe('Testing deleteStory function: ', () => {
    it('should delete a story by id: ', async () => {
      const id = '1';
      jest.spyOn(Story, 'destroy').mockResolvedValueOnce(1);

      const story = await StoriesRepository.deleteStory(id);

      expect(Story.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(story).toBe(1);
    });

    it('should return 0 if the story does not exist', async () => {
      const id = '1';
      jest.spyOn(Story, 'destroy').mockResolvedValueOnce(0);

      const story = await StoriesRepository.deleteStory(id);

      expect(Story.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(story).toBe(0);
    });

    it('should throw an error if there is an error in the database query', async () => {
      const id = '1';
      const expectedError = new Error('Database error');
      jest.spyOn(Story, 'destroy').mockRejectedValueOnce(expectedError);

      await expect(StoriesRepository.deleteStory(id)).rejects.toThrow(
        expectedError
      );
    });
  });
});
