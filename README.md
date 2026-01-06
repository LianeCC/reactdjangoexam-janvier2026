# To-Do List par Catégories - React + Django

Application full-stack de gestion de tâches par catégories développée avec React (frontend) et Django REST Framework (backend).

## Installation et Lancement

### Prérequis
- Python 3.8+
- Node.js 16+
- npm ou yarn

### Backend Django

1. Ouvrez un terminal et allez dans le dossier backend :
```bash
cd backend
```

2. Créez et activez l'environnement virtuel :
```bash
# Création
py -m venv venv

# Activation (Windows)
venv\Scripts\activate

# Activation (Mac/Linux)
source venv/bin/activate
```

3. Installez les dépendances :
```bash
pip install -r requirements.txt
```

4. Appliquez les migrations :
```bash
py manage.py migrate
```

5. Créez un superuser pour accéder à l'admin Django :
```bash
py manage.py createsuperuser
```

6. Lancez le serveur :
```bash
py manage.py runserver
```

Le backend sera accessible sur `http://localhost:8000/`
L'admin Django sur `http://localhost:8000/admin/`

### Frontend React

1. Ouvrez un **nouveau terminal** et allez dans le dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:5173/`

## Fonctionnalités

- Créer, lire, mettre à jour et supprimer des catégories
- Créer, lire, mettre à jour et supprimer des tâches
- Associer une tâche à une catégorie
- Marquer une tâche comme terminée/non terminée
- Filtrer les tâches par catégorie
- Validation des données côté backend et frontend
- Gestion des erreurs avec messages en français
- Persistance des données dans SQLite
- Interface responsive avec Tailwind CSS

## Technologies utilisées

**Backend :**
- Django 4.2.7
- Django REST Framework 3.14.0
- django-cors-headers 4.3.0
- SQLite

**Frontend :**
- React 18
- Vite 7
- Tailwind CSS 3
- Fetch API