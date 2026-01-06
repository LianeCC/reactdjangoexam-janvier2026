import { useState } from 'react';
import { API_BASE_URL } from '../config';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const [loadingTaskId, setLoadingTaskId] = useState(null);

  const handleToggleComplete = async (task) => {
    setLoadingTaskId(task.id);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${task.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_completed: !task.is_completed,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        onTaskUpdated(updatedTask);
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
    } finally {
      setLoadingTaskId(null);
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette tâche ?')) {
      return;
    }

    setLoadingTaskId(taskId);
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onTaskDeleted(taskId);
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
    } finally {
      setLoadingTaskId(null);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="p-2">
        <p className="text-left text-black">Aucune tâche à afficher.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <input
              type="checkbox"
              checked={task.is_completed}
              onChange={() => handleToggleComplete(task)}
              disabled={loadingTaskId === task.id}
              className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 cursor-pointer disabled:cursor-not-allowed"
            />
            <span
              className={`flex-1 text-base ${
                task.is_completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {task.description} <span className="text-gray-500">({task.category_name})</span>
            </span>
            <button
              onClick={() => handleDelete(task.id)}
              disabled={loadingTaskId === task.id}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
            >
              {loadingTaskId === task.id ? '...' : 'Supprimer'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;