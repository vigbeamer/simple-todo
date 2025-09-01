import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { CheckCircle, Circle, Trash2, Plus, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

type FilterType = 'all' | 'pending' | 'completed';

const AllTodos: React.FC = () => {
  const { todos, toggleTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: todos.length },
    { key: 'pending', label: 'Pending', count: todos.filter(t => !t.completed).length },
    { key: 'completed', label: 'Completed', count: todos.filter(t => t.completed).length }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Tasks</h1>
          <p className="text-gray-600">Manage and organize your todo list</p>
        </div>
        <Link
          to="/add"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-1 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              filter === key
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-3">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all' 
                ? 'Get started by creating your first task'
                : `You don't have any ${filter} tasks at the moment`
              }
            </p>
            {filter === 'all' && (
              <Link
                to="/add"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Task</span>
              </Link>
            )}
          </div>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="mt-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  {todo.completed ? (
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${
                    todo.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {todo.title}
                  </h3>
                  {todo.description && (
                    <p className={`text-sm mt-1 ${
                      todo.completed ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {todo.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-2">
                    Created {todo.createdAt.toLocaleDateString()} at {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>

                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-600 transition-colors p-1"
                  title="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllTodos;