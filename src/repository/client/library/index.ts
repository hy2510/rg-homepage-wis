import { getTodo } from './todo/todo'
import { postTodoAdd } from './todo/todo-add'
import { deleteTodo } from './todo/todo-delete'
import { deleteTodoAll } from './todo/todo-delete-all'
import { getFavorite } from './favorite/favorite'
import { postFavoriteAdd } from './favorite/favorite-add'
import { deleteFavorite } from './favorite/favorite-delete'
import { deleteFavoriteAll } from './favorite/favorite-delete-all'
import { getNewBooks } from './new-books'
import { getBookInfo } from './book-info/book-info'

const Library = {
  todos: getTodo,
  addTodos: postTodoAdd,
  deleteTodos: deleteTodo,
  deleteAllTodos: deleteTodoAll,
  favorites: getFavorite,
  addFavorites: postFavoriteAdd,
  deleteFavorites: deleteFavorite,
  deleteAllFavorites: deleteFavoriteAll,
  newBooks: getNewBooks,
  bookInfo: getBookInfo,
}
export default Library
