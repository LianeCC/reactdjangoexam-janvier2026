from rest_framework import serializers
from .models import Category, Task
from django.db.models import Q

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model including a count of associated tasks.
    """
    tasks_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'tasks_count']
        read_only_fields = ['tasks_count']
    
    def get_tasks_count(self, obj):
        return obj.tasks.count()
    
    def validate_name(self, value):
        """"
        Validate that the category name is not empty or just whitespace.
        """
        if not value.strip():
            raise serializers.ValidationError("Le nom de la catégorie ne peut pas être vide")
        cleaned_name = value.strip()
        instance_id = self.instance.id if self.instance else None
        
        if Category.objects.filter(
            name__iexact=cleaned_name
        ).exclude(id=instance_id).exists():
            raise serializers.ValidationError("Une catégorie avec ce nom existe déjà."
            )
        
        return cleaned_name

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
        read_only_fields = ['created_at', 'category_name']
    
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

    