import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Inventario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  Lote: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'object',
    required: true,
  })
  PartesId: object;

  @property({
    type: 'object',
    required: true,
  })
  Vehiculold: object;

  @property({
    type: 'number',
    required: true,
  })
  Cantidad: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Inventario>) {
    super(data);
  }
}

export interface InventarioRelations {
  // describe navigational properties here
}

export type InventarioWithRelations = Inventario & InventarioRelations;
