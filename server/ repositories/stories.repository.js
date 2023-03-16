'use strict';
const Story = require('../models/Story');

class StorysRepository {

  constructor() {}

  async findAll() {
    try{
        const stories = await Story.findAll({include: 'author'});
        return stories;
      } catch(err){
        console.log(err.stack);
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
        console.log(err.stack);
        throw err;
      }
  }

  async findByAuthorId(authorId) {
    try{
        const stories = await Story.findAll({
          where: { 
            authorId: authorId
           },
           include: 'author'
        });
        return stories;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

  async create(title, description, authorId) {
    try{
        const story = await Story.create({title: title, description: description, authorId: authorId});
        return story;
      } catch(err){
        console.log(err);
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
      console.log(err.stack);
      throw err;
    }
  }

  async removeStory(id) {
    try{
        const data = await Story.destroy({
          where: {
            id: id
          }
        });
        return data;
      } catch(err){
        console.log(err.stack);
        throw err;
      }
  }

}

module.exports = new StorysRepository();