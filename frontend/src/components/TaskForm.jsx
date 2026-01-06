import { useState } from 'react';
import { API_BASE_URL } from '../config';

function TaskForm({ categories, onTaskAdded }) {
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedCategory) {
      setError('Veuillez sélectionner une catégorie');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: taskDescription,
          category: parseInt(selectedCategory),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMsg = errorData.description 
          ? errorData.description[0] 
          : errorData.category 
          ? errorData.category[0]
          : 'Erreur lors de la création';
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      const newTask = await response.json();
      setTaskDescription('');
      setSelectedCategory('');
      onTaskAdded(newTask);
    } catch {
      setError('Erreur de connexion au serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          disabled={isLoading}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed min-w-[200px]"
        >
          <option value="">Sélectionner une catégorie</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {isLoading ? 'Ajout...' : 'Ajouter'}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}

export default TaskForm;