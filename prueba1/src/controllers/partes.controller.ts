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
import {Partes} from '../models';
import {PartesRepository} from '../repositories';

export class PartesController {
  constructor(
    @repository(PartesRepository)
    public partesRepository : PartesRepository,
  ) {}

  @post('/partes')
  @response(200, {
    description: 'Partes model instance',
    content: {'application/json': {schema: getModelSchemaRef(Partes)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {
            title: 'NewPartes',
            exclude: ['id'],
          }),
        },
      },
    })
    partes: Omit<Partes, 'id'>,
  ): Promise<Partes> {
    return this.partesRepository.create(partes);
  }

  @get('/partes/count')
  @response(200, {
    description: 'Partes model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Partes) where?: Where<Partes>,
  ): Promise<Count> {
    return this.partesRepository.count(where);
  }

  @get('/partes')
  @response(200, {
    description: 'Array of Partes model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Partes, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Partes) filter?: Filter<Partes>,
  ): Promise<Partes[]> {
    return this.partesRepository.find(filter);
  }

  @patch('/partes')
  @response(200, {
    description: 'Partes PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {partial: true}),
        },
      },
    })
    partes: Partes,
    @param.where(Partes) where?: Where<Partes>,
  ): Promise<Count> {
    return this.partesRepository.updateAll(partes, where);
  }

  @get('/partes/{id}')
  @response(200, {
    description: 'Partes model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Partes, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Partes, {exclude: 'where'}) filter?: FilterExcludingWhere<Partes>
  ): Promise<Partes> {
    return this.partesRepository.findById(id, filter);
  }

  @patch('/partes/{id}')
  @response(204, {
    description: 'Partes PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Partes, {partial: true}),
        },
      },
    })
    partes: Partes,
  ): Promise<void> {
    await this.partesRepository.updateById(id, partes);
  }

  @put('/partes/{id}')
  @response(204, {
    description: 'Partes PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() partes: Partes,
  ): Promise<void> {
    await this.partesRepository.replaceById(id, partes);
  }

  @del('/partes/{id}')
  @response(204, {
    description: 'Partes DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.partesRepository.deleteById(id);
  }
}
