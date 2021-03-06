'use strict';
const Database = use('Database')
const MealType = use('App/Models/MealType');
const MenuItem = use('App/Models/MenuItem');
const MenuCategory = use('App/Models/MenuCategory');
const formatMenu = require('../../Utils/MenuFormater');

class ApiController {

  async getMenu(){
    try{
      const menu = await Database
      .select('*',
              'menu_items.name as name',
              'menu_items.id as id',
              'menu_categories.name as category',
              'meal_types.name as type')
      .from('menu_items')
      .innerJoin('meal_types', 'menu_items.type_id', 'meal_types.id')
      .innerJoin('menu_categories', 'menu_items.category_id', 'menu_categories.id');
      return formatMenu(menu)
    } catch (e){
      console.log(e)
    }
  }

  async createMenuItem({request, response, auth}){
      try{
        const menuItem = await MenuItem.create(request.all())
        response.send(menuItem)
      }catch(e){
        console.log(e)
        return response.status(500).send()
      }
  }

  async updateMenuItem({request, response, auth}){
      try {
        const menuItem = request.all()
        await MenuItem
          .query()
          .where('id', menuItem.id)
          .update({...menuItem})
      } catch (e) {
        console.log(e)
        return response.status(500).send()
      }
  }

  async deleteMenuItem({request, response, auth}){
      try {
        const { id } = request.all()
        const menuItem = await MenuItem.find(id)
        if (menuItem) {
          await menuItem.delete()
          return response.status(200).send()
        }
      } catch (e) {
        console.log(e)
        return response.status(500).send()
      }
    }
}

module.exports = ApiController;
