import { useState, useEffect, useCallback } from 'react'
import { API_BASE_URL } from './config'
import CategoryForm from './components/CategoryForm'
import CategoryFilter from './components/CategoryFilter'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [categories, setCategories] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (err) {
      console.error('Erreur chargement catégories:', err);
    }
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      let url = `${API_BASE_URL}/tasks/`;
      if (selectedCategoryFilter) {
        url += `?category_id=${selectedCategoryFilter}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (err) {
      console.error('Erreur chargement tâches:', err);
    }
  }, [selectedCategoryFilter]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError('');
      try {
        await Promise.all([loadCategories(), loadTasks()]);
      } catch {
        setError('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [loadCategories, loadTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleCategoryAdded = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black/80 flex items-center justify-center">
        <p className="text-lg text-gray-600">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/80 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Ma To-Do List par Catégories
        </h1>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <CategoryForm onCategoryAdded={handleCategoryAdded} />
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategoryFilter}
          onCategoryChange={setSelectedCategoryFilter}
        />
        <TaskForm 
          categories={categories}
          onTaskAdded={handleTaskAdded}
        />
        <TaskList 
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </div>
  )
}

export default App