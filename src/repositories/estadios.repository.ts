import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Estadios, EstadiosRelations} from '../models';

export class EstadiosRepository extends DefaultCrudRepository<
  Estadios,
  typeof Estadios.prototype.id,
  EstadiosRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Estadios, dataSource);
  }
}
