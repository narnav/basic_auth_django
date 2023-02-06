from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Student(models.Model):
    user =models.ForeignKey(User,on_delete=models.SET_NULL,null=True)

    id = models.BigAutoField(primary_key=True)
    sName = models.CharField(max_length=20)
    age = models.FloatField()


    def __str__(self):
        return self.sName