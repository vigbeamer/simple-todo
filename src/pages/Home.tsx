import React from 'react';
import { Link } from 'react-router-dom';
import { useTodos } from '../hooks/useTodos';
import { CheckCircle, Clock, Plus, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { todos } = useTodos();
  
  const completedTodos = todos.filter(todo => todo.completed);
  const pendingTodos = todos.filter(todo => !todo.completed);
  const completionRate = todos.length > 0 ? Math.round((completedTodos.length / todos.length) * 100) : 0;

  const recentTodos = todos
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your tasks and productivity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-emerald-600">{completedTodos.length}</p>
            </div>
            <div className="h-12 w-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
            </div>
            <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <div className="text-indigo-600 font-bold text-lg">{completionRate}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link 
          to="/add" 
          className="group bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Add New Task</h3>
              <p className="text-blue-100">Create a new todo item</p>
            </div>
            <div className="flex items-center space-x-2">
              <Plus className="h-6 w-6" />
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link 
          to="/all" 
          className="group bg-white border-2 border-gray-200 rounded-xl p-6 transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-blue-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">View All Tasks</h3>
              <p className="text-gray-600">Manage your todo list</p>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 group-hover:text-blue-600 transition-colors">
              <Clock className="h-6 w-6" />
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Tasks */}
      {recentTodos.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h3>
          <div className="space-y-3">
            {recentTodos.map((todo) => (
              <div 
                key={todo.id} 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`h-3 w-3 rounded-full ${todo.completed ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                <div className="flex-1">
                  <p className={`font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                    {todo.title}
                  </p>
                  {todo.description && (
                    <p className="text-sm text-gray-500 mt-1">{todo.description}</p>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {todo.createdAt.toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
          <Link 
            to="/all" 
            className="inline-flex items-center space-x-2 mt-4 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>View all tasks</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;