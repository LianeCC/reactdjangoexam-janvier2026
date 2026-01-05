from django.db import models

class Category(models.Model):
    """
    Model representing a category for todo items
    """
    name = models.CharField(
        max_length=100,
        unique=True,
        blank=False,
        verbose_name="Nom de la catégorie"
    )
    
    class Meta:
        verbose_name = "Catégorie"
        verbose_name_plural = "Catégories"
        ordering = ['name']

    def __str__(self):
        return self.name
    
class Task(models.Model):
    """
    Model representing a task in a todo list
    """
    description = models.TextField(
        blank=False,
        verbose_name="Description"
    )
    is_completed = models.BooleanField(
        default=False,
        verbose_name="Terminée"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date de création"
    )
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='tasks',
        verbose_name="Catégorie"
    )
    
    class Meta:
        verbose_name = "Tâche"
        verbose_name_plural = "Tâches"
        ordering = ['-created_at']
    
    def __str__(self):
        status = "✓" if self.is_completed else "○"
        return f"{status} {self.description[:50]} ({self.category.name})"