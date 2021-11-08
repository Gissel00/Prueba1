import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Partes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  categoria: string;

  @property({
    type: 'string',
    required: true,
  })
  vehiculold: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Partes>) {
    super(data);
  }
}

export interface PartesRelations {
  // describe navigational properties here
}

export type PartesWithRelations = Partes & PartesRelations;
