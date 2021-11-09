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
import {Estadios} from '../models';
import {EstadiosRepository} from '../repositories';

export class EstadiosController {
  constructor(
    @repository(EstadiosRepository)
    public estadiosRepository : EstadiosRepository,
  ) {}

  @post('/estadios')
  @response(200, {
    description: 'Estadios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Estadios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadios, {
            title: 'NewEstadios',
            exclude: ['id'],
          }),
        },
      },
    })
    estadios: Omit<Estadios, 'id'>,
  ): Promise<Estadios> {
    return this.estadiosRepository.create(estadios);
  }

  @get('/estadios/count')
  @response(200, {
    description: 'Estadios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Estadios) where?: Where<Estadios>,
  ): Promise<Count> {
    return this.estadiosRepository.count(where);
  }

  @get('/estadios')
  @response(200, {
    description: 'Array of Estadios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estadios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Estadios) filter?: Filter<Estadios>,
  ): Promise<Estadios[]> {
    return this.estadiosRepository.find(filter);
  }

  @patch('/estadios')
  @response(200, {
    description: 'Estadios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadios, {partial: true}),
        },
      },
    })
    estadios: Estadios,
    @param.where(Estadios) where?: Where<Estadios>,
  ): Promise<Count> {
    return this.estadiosRepository.updateAll(estadios, where);
  }

  @get('/estadios/{id}')
  @response(200, {
    description: 'Estadios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Estadios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Estadios, {exclude: 'where'}) filter?: FilterExcludingWhere<Estadios>
  ): Promise<Estadios> {
    return this.estadiosRepository.findById(id, filter);
  }

  @patch('/estadios/{id}')
  @response(204, {
    description: 'Estadios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estadios, {partial: true}),
        },
      },
    })
    estadios: Estadios,
  ): Promise<void> {
    await this.estadiosRepository.updateById(id, estadios);
  }

  @put('/estadios/{id}')
  @response(204, {
    description: 'Estadios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadios: Estadios,
  ): Promise<void> {
    await this.estadiosRepository.replaceById(id, estadios);
  }

  @del('/estadios/{id}')
  @response(204, {
    description: 'Estadios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadiosRepository.deleteById(id);
  }
}
