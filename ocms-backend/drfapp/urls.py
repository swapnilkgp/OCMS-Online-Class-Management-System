from django.contrib import admin
from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('signup/',signup.as_view()),
    path('signin/',signin.as_view()),
    path('otp/',otp.as_view()),
    path('createcourse/',createcourse.as_view()),
    path('joincourse/',joincourse.as_view()),
    path('getcourses/',getcourses.as_view()),
    path('getcourseinfo/',getcourseinfo.as_view()),
    path('getmessages/',getmessages.as_view()),
    path('sendmessage/',sendmessage.as_view()),
    path('uploadvideo/',uploadvideo.as_view()),
    path('getvideoinfo/',getvideoinfo.as_view()),
    path('getvideo/',getvideo.as_view()),
    path('uploadassignment/',uploadassignment.as_view()),
    path('getassignmentinfo/',getassignmentinfo.as_view()),
    path('getassignment/',getassignment.as_view()),
    path('submitsolution/',submitsolution.as_view()),
    path('makeTA/',makeTA.as_view()),
    path('checkuser/',checkuser.as_view()),
    path('teammembers/',teammembers.as_view()),
    path('givegrade/',givegrade.as_view()),
    path('getsolutionfile/',getsolutionfile.as_view()),
    path('getsolutioninfo/',getsolutioninfo.as_view()),
    path('getsolution/',getsolution.as_view()),
    path('checkasgnstatus/',checkasgnstatus.as_view()),
]

