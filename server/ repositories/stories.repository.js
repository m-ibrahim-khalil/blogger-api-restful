'use strict';
const Story = require('../models/Story');

class StorysRepository {

  constructor() {}

  async findAll(limit, offset) {
    try{
        const stories = await Story.findAndCountAll({limit, offset, include: 'author'});
        return stories;
      } catch(err){
        throw err;
      }
  }

  async findById(id) {
    try{
        const story = await Story.findOne({
          where: { 
            id: id
           },
           include: 'author'
        });
        return story;
      } catch(err){
        throw err;
      }
  }

  async findByAuthorId(authorId, limit, offset) {
    try{
        const stories = await Story.findAndCountAll({
          where: { 
            authorId: authorId
           },
           include: 'author',
           limit, 
           offset
        });
        return stories;
      } catch(err){
        throw err;
      }
  }

  async create(title, description, authorId) {
    try{
        const story = await Story.create({title: title, description: description, authorId: authorId});
        return story;
      } catch(err){
        throw err;
      }
  }

  async updateStory(id, title, description){
    try{
      const data = await Story.update({ title: title, description: description }, {
        where: {
          id: id
        }
      });
      return data;
    } catch(err){
      throw err;
    }
  }

  async deleteStory(id) {
    try{
        const data = await Story.destroy({
          where: {
            id: id
          }
        });
        return data;
      } catch(err){
        throw err;
      }
  }
}

module.exports = new StorysRepository();