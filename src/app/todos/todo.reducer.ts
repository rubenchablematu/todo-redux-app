import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarTodos, toggle, toggleAll } from './todo.actions';

export const estadoInicial: Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a thanos'),
    new Todo('Comprar traje de ironman'),
    new Todo('Robar el escudo del capitan america')
];

export const todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo( texto )]),

  on( borrar, ( state, { id }) => state.filter ( todo => todo.id !== id)),

  on( limpiarTodos, ( state ) => state.filter ( todo => !todo.completado)),

  on(toggle, (state, { id }) => {
    return state.map( todo => {
      if(todo.id === id){
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }

    })  
  }),
  on(editar, (state, { id, texto }) => {
    return state.map( todo => {
      if(todo.id === id){
        return {
          ...todo,
          texto: texto
        }
      }else{
        return todo;
      }

    })  
  }), 
  on(toggleAll, (state, { completado }) => {
    return state.map( todo => {
        return {
          ...todo,
          completado: completado
        }
    })  
  }),   
);