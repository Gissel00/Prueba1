import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Menu} from '../models';
import {MenuRepository} from '../repositories';

export class MenuController {
  constructor(
    @repository(MenuRepository)
    public menuRepository : MenuRepository,
  ) {}

  @post('/menus')
  @response(200, {
    description: 'Menu model instance',
    content: {'application/json': {schema: getModelSchemaRef(Menu)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {
            title: 'NewMenu',
            exclude: ['id'],
          }),
        },
      },
    })
    menu: Omit<Menu, 'id'>,
  ): Promise<Menu> {
    return this.menuRepository.create(menu);
  }

  @get('/menus/count')
  @response(200, {
    description: 'Menu model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Menu) where?: Where<Menu>,
  ): Promise<Count> {
    return this.menuRepository.count(where);
  }

  @get('/menus')
  @response(200, {
    description: 'Array of Menu model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Menu, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Menu) filter?: Filter<Menu>,
  ): Promise<Menu[]> {
    return this.menuRepository.find(filter);
  }

  @patch('/menus')
  @response(200, {
    description: 'Menu PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {partial: true}),
        },
      },
    })
    menu: Menu,
    @param.where(Menu) where?: Where<Menu>,
  ): Promise<Count> {
    return this.menuRepository.updateAll(menu, where);
  }

  @get('/menus/{id}')
  @response(200, {
    description: 'Menu model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Menu, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Menu, {exclude: 'where'}) filter?: FilterExcludingWhere<Menu>
  ): Promise<Menu> {
    return this.menuRepository.findById(id, filter);
  }

  @patch('/menus/{id}')
  @response(204, {
    description: 'Menu PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Menu, {partial: true}),
        },
      },
    })
    menu: Menu,
  ): Promise<void> {
    await this.menuRepository.updateById(id, menu);
  }

  @put('/menus/{id}')
  @response(204, {
    description: 'Menu PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() menu: Menu,
  ): Promise<void> {
    await this.menuRepository.replaceById(id, menu);
  }

  @del('/menus/{id}')
  @response(204, {
    description: 'Menu DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.menuRepository.deleteById(id);
  }
}
