// URL de base de l'API Django
const API_BASE_URL = 'http://127.0.0.1:8000/api';

/**
 * Fonction pr gérer erreurs fetch
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: 'Une erreur est survenue'
    }));
    throw error;
  }
  
  // Pr DELETE qui retournent 204 No Content
  if (response.status === 204) {
    return null;
  }
  
  return response.json();
};

/**
 * API pr catégories
 */
export const categoryAPI = {
  // Récup toutes les catégories
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    return handleResponse(response);
  },

  // Créer nouvelle catégorie
  create: async (categoryData) => {
    const response = await fetch(`${API_BASE_URL}/categories/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });
    return handleResponse(response);
  },
};

/**
 * API pr les tâches
 */
export const taskAPI = {
  // Récup toutes les tâches (avec filtre)
  getAll: async (categoryId = null) => {
    let url = `${API_BASE_URL}/tasks/`;
    if (categoryId) {
      url += `?category_id=${categoryId}`;
    }
    const response = await fetch(url);
    return handleResponse(response);
  },

  // Créer nvelle tâche
  create: async (taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // MAJ tâche
  update: async (taskId, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  // Supp une tâche
  delete: async (taskId) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  },
};