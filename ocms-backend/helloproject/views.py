from django.shortcuts import render
from django.http import HttpResponse
# from rest_framework.views import APIView
# from rest_framework.response import Response

# from drfapp.serializers import userSerializer
# from drfapp.models import student
# from rest_framework.permissions import IsAuthenticated

# class TesView(APIView):

#     permission_classes = (IsAuthenticated,)

#     def get(self, request, *args, **kwargs):
#         qs = student.objects.all()
#         serializer = studentSerializer(qs, many = True)
#         return Response(serializer.data)
#     def post(self, request, *args, **kwargs):
#         serializer = studentSerializer(data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors)

def home(request):
    return HttpResponse('<h2>This is my API</h2>')