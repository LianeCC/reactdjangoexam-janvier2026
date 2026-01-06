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
    <div>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
             <div
              onClick={() => !loadingTaskId && handleToggleComplete(task)}
              className={`w-5 h-5 flex-shrink-0 border-2 rounded cursor-pointer transition-all ${
                task.is_completed
                  ? 'bg-blue-500 border-blue-500'
                  : 'bg-white border-gray-300 hover:border-blue-400'
              } ${loadingTaskId === task.id ? 'opacity-50 cursor-not-allowed' : ''}`}
            />

            <span
              className={`flex-1 text-base text-center ${
                task.is_completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800'
              }`}
            >
              {task.description} ({task.category_name})
            </span>
            <button
              onClick={() => handleDelete(task.id)}
              disabled={loadingTaskId === task.id}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
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