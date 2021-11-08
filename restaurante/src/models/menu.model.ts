import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Menu extends Entity {
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
  item: string;

  @property({
    type: 'number',
    required: true,
  })
  costo: number;

  @property({
    type: 'string',
  })
  categoria?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Menu>) {
    super(data);
  }
}

export interface MenuRelations {
  // describe navigational properties here
}

export type MenuWithRelations = Menu & MenuRelations;
