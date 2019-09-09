'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MenuItem extends Model {
  category(){
    return this.belongsTo('App/Models/MenuCategory');
  }
}

module.exports = MenuItem
