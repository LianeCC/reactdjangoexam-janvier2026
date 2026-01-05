from rest_framework import serializers
from .models import Category, Task

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model including a count of associated tasks.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'task_count']
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    
    def validate_name(self, value):
        """"
        Validate that the category name is not empty or just whitespace.
        """
        if not value.strip():
            raise serializers.ValidationError("Le nom de la catégorie ne peut pas être vide ou contenir uniquement des espaces.")
        return value

class TaskSerializer(serializers.ModelSerializer):
    """
    Serializer for Task model including nested Category representation.
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Task
        fields = [
            'id', 
            'description', 
            'is_completed', 
            'created_at', 
            'category',
            'category_name'
        ]
        read_only_fields = ['created_at']
    
    def validate_description(self, value):
        """
        Ensuring the description is not empty or just whitespace.
        """
        if not value or not value.strip():
            raise serializers.ValidationError(
                "La description ne peut pas être vide."
            )
        return value.strip()
    
    def validate_category(self, value):
        """
        Ensuring a category is associated with the task.
        """
        if not value:
            raise serializers.ValidationError(
                "Une catégorie doit être associée à la tâche."
            )
        return value

    