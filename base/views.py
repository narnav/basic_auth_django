from django.shortcuts import render
from .models import Student

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
 
        # Add custom claims
        token['username'] = user.username
        token['eeeeemail'] = user.email
        token['waga'] = "baga"

        return token
 
 
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
    
    # def create(self, validated_data):
    #     return Task.objects.create(**validated_data)

@api_view(['GET'])
def index(req):
    return Response ( "hello")


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_students(req):
#     usr= req.user
#     my_model= usr.student_set.all()
#     serializer = StudentSerializer(my_model, many=True)
#     return Response(serializer.data)


@permission_classes([IsAuthenticated])
class MyStudentView(APIView):
    def get(self, request):
        usr= request.user
        print (usr)
        my_model= usr.student_set.all()
        serializer = StudentSerializer(my_model, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        # usr =request.user
        # print(usr)
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def put(self, request, pk):
        my_model = Student.objects.get(pk=pk)
        serializer = StudentSerializer(my_model, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
    def delete(self, request, pk):
        my_model = Student.objects.get(pk=pk)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  