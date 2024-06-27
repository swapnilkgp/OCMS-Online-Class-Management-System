from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import userSerializer
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from .models import *
from datetime import datetime
import random
import re
import smtplib
import pytz

class signup(APIView):
    def post(self, request, *args, **kwargs):
        serializer = userSerializer(data=request.data)
        if serializer.is_valid():
            email = request.data['email']
            users = list(user.objects.filter(email=email))
            if len(users) > 0:
                return Response(0)
            serializer.save()
            return Response({'userID': serializer.data['userID'], 'username': request.data['username']})
        return Response(None)

class signin(APIView):
    def post(self, request, format=None):
        try:
            User = user.objects.get(
                username=request.data['username'], password=request.data['password'])
        except:
            return Response(None)
        serializer = userSerializer(User)
        return Response({'userID': serializer.data['userID'], 'username': request.data['username']})

class otp(APIView):
    def post(self, request, format=None):
        email = request.data['email']
        if not email:
            return Response(None)
        if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
            return Response(None)
        OTP = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login('ocmsswlab@gmail.com', 'chdydabwheyntwgp')
        msg = 'Your verification code is ' + OTP
        server.sendmail('ocmsswlab@gmail.com', email, msg)
        server.quit()
        return Response(OTP)

class createcourse(APIView):
    def post(self, request, *args, **kwargs):
        courseno = request.data['courseno']
        coursename = request.data['coursename']
        userID = request.data['userID']
        try:
            professor = user.objects.get(userID=userID)
        except:
            return Response(None)
        course_obj = course.objects.create(
            courseno=courseno,
            coursename=coursename,
            professor = professor
        )
        course_obj.save()
        return Response(course_obj.coursecode)

class joincourse(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        userID = request.data['userID']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        if givenuser in givencourse.students.all():
            return Response(False)
        givencourse.students.add(givenuser)
        return Response(True)

class makeTA(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        userID = request.data['userID']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        givencourse.TAs.add(givenuser)
        givencourse.students.remove(givenuser)
        givencourse.save()
        return Response(True)

class getcourses(APIView):
    def post(self, request, *args, **kwargs):
        userID = request.data['userID']
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        studcourses = givenuser.courses_learnt.all()
        profcourses = givenuser.courses_taught.all()
        TAcourses = givenuser.courses_instructed.all()
        target1 = [{'coursename': i.coursename, 'courseno': i.courseno, 'coursecode': i.coursecode, 'logo': i.logo}
                   for i in studcourses]
        target2 = [{'coursename': i.coursename, 'courseno': i.courseno, 'coursecode': i.coursecode, 'logo': i.logo}
                   for i in profcourses]
        target3 = [{'coursename': i.coursename, 'courseno': i.courseno, 'coursecode': i.coursecode, 'logo': i.logo}
                   for i in TAcourses]
        return Response(target1 + target2 + target3)

class getcourseinfo(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        target = {'coursename': givencourse.coursename,
                  'courseno': givencourse.courseno, 'logo': givencourse.logo}
        return Response(target)

class getmessages(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        msgs = list(givencourse.messages.all())
        sorted_messages = sorted(msgs, key=lambda msg: msg.senttime)[::-1]
        target = [{'id': i.msgID, 'sender': i.sender.username, 'time': i.senttime.time(
        ), 'date': i.senttime.date(), 'msg': i.msg, 'logo':i.sender.userlogo} for i in sorted_messages]
        return Response(target)

class sendmessage(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        userID = request.data['sender']
        msg = request.data['msg']
        datestr = request.data['date']
        timestr = request.data['time']
        try:
            date = datestr.split('-')
            day = int(date[0])
            month = int(date[1])
            yrs = int(date[2])
            time = timestr.split(':')
            hrs = int(time[0])
            mins = int(time[1])
        except:
            return Response(False)
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        message_obj = message.objects.create(
            msg=msg,
            sendercourse=givencourse,
            sender=givenuser,
            senttime=datetime(yrs, month, day, hrs, mins, 0)
        )
        message_obj.save()
        return Response({'id': message_obj.msgID})

class uploadvideo(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)

        caption = request.data['caption']
        video_file = request.FILES['file']
        datestr = request.data['date']
        timestr = request.data['time']
        try:
            date = datestr.split('-')
            day = int(date[0])
            month = int(date[1])
            yrs = int(date[2])
            time = timestr.split(':')
            hrs = int(time[0])
            mins = int(time[1])
        except:
            return Response(False)
        Video_obj = video.objects.create(
            sendercourse=givencourse,
            senttime=datetime(yrs, month, day, hrs, mins, 0),
            caption=caption,
            video_file=video_file
        )
        Video_obj.save()
        return Response(Video_obj.videoID)

class getvideoinfo(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        allvideos = list(givencourse.videos.all())
        target = [{'id': i.videoID, 'time': i.senttime.time(
        ), 'date': i.senttime.date(), 'caption': i.caption} for i in allvideos]
        return Response(target)

class getvideo(APIView):
    def post(self, request, *args, **kwargs):
        videoID = request.data['id']
        givenvideo = video.objects.get(videoID=videoID)
        return Response({'link': "http://127.0.0.1:8000/media/" + givenvideo.video_file.name, 'caption': givenvideo.caption})

class uploadassignment(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        assgn_file = request.FILES['file']
        caption = request.data['caption']
        instruction = request.data['instructions']
        maxmarks = request.data['maxmarks']
        deadlinedate = request.data['deadlinedate']
        deadlinetime = request.data['deadlinetime']
        try:
            ddate = deadlinedate.split('-')
            deadlineyrs = int(ddate[0])
            deadlinemonth = int(ddate[1])
            deadlineday = int(ddate[2])
            dtime = deadlinetime.split(':')
            deadlinehrs = int(dtime[0])
            deadlinemins = int(dtime[1])
        except:
            return Response(False)
        assgn_obj = assignment.objects.create(
            file=assgn_file,
            caption=caption,
            instruction=instruction,
            maxmarks=maxmarks,
            deadline=datetime(deadlineyrs, deadlinemonth,
                              deadlineday, deadlinehrs, deadlinemins, 0),
            sentcourse=givencourse,
        )
        assgn_obj.save()
        return Response(assgn_obj.assignmentID)

class getassignmentinfo(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        userID = request.data['userID']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        datestr = request.data['date']
        timestr = request.data['time']
        try:
            date = datestr.split('-')
            day = int(date[0])
            month = int(date[1])
            yrs = int(date[2])
            time = timestr.split(':')
            hrs = int(time[0])
            mins = int(time[1])
        except:
            return Response(False)
        currenttime = pytz.UTC.localize(datetime(yrs, month, day, hrs, mins, 0))
        allassignments = list(givencourse.assignments.all())
        upcoming = []
        pastdue = []
        completed = []
        pending = []
        Done = []
        for i in allassignments:
            if currenttime<i.deadline:
                pending.append(i)
            else:
                Done.append(i)
            if solution.objects.filter(sentuser = givenuser, sentassignment = i).exists():
                completed.append(i)
            else:
                if currenttime<i.deadline:
                    upcoming.append(i)
                else:
                    pastdue.append(i)
        upcomingtarget = [{'caption': i.caption, 'id': i.assignmentID, 'time': i.deadline.time(
        ), 'date': i.deadline.date()} for i in upcoming]
        pastduetarget = [{'caption': i.caption, 'id': i.assignmentID, 'time': i.deadline.time(
        ), 'date': i.deadline.date()} for i in pastdue]
        completedtarget = [{'caption': i.caption, 'id': i.assignmentID, 'time': i.deadline.time(
        ), 'date': i.deadline.date()} for i in completed]
        pendingtarget = [{'caption': i.caption, 'id': i.assignmentID, 'time': i.deadline.time(
        ), 'date': i.deadline.date()} for i in pending]
        donetarget = [{'caption': i.caption, 'id': i.assignmentID, 'time': i.deadline.time(
        ), 'date': i.deadline.date()} for i in Done]

        return Response({'U':upcomingtarget,'P':pastduetarget,'C':completedtarget, 'P1':pendingtarget, 'C1':donetarget})

class getassignment(APIView):
    def post(self, request, *args, **kwargs):
        assgnID = request.data['id']
        try:
            givenassignment = assignment.objects.get(assignmentID=assgnID)
        except:
            return Response(None)
        return Response({'link': "http://127.0.0.1:8000/media/" + givenassignment.file.name,'filename': givenassignment.file.name, 'caption': givenassignment.caption, 'instructions': givenassignment.instruction, 'maxmarks':givenassignment.maxmarks, 'deadlinedate':givenassignment.deadline.date(),'deadlinetime':givenassignment.deadline.time()})

class submitsolution(APIView):
    def post(self, request, *args, **kwargs):
        file = request.FILES['file']
        userID = request.data['userID']
        assignmentID = request.data['assignmentID']
        try:
            givenassignment = assignment.objects.get(assignmentID = assignmentID)
            givenuser = user.objects.get(userID = userID)
        except:
            return Response(None)
        datestr = request.data['date']
        timestr = request.data['time']
        try:
            date = datestr.split('-')
            day = int(date[0])
            month = int(date[1])
            yrs = int(date[2])
            time = timestr.split(':')
            hrs = int(time[0])
            mins = int(time[1])
        except:
            return Response(False)
        if solution.objects.filter(sentuser = givenuser, sentassignment = givenassignment).exists():
            givensoln = solution.objects.filter(sentuser = givenuser, sentassignment = givenassignment)
            givensoln.delete()
        soln_obj = solution.objects.create(
            sentuser = givenuser,
            sentassignment = givenassignment,
            file = file,
            senttime=datetime(yrs, month, day, hrs, mins, 0),
        )
        soln_obj.save()
        return Response(soln_obj.solutionID)
    
class checkuser(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        userID = request.data['userID']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        if givencourse.professor == givenuser:
            return Response('P')
        elif givencourse.TAs.filter(userID = userID).exists():
            return Response('T')
        elif givencourse.students.filter(userID = userID).exists():
            return Response('S')
        else:
            return Response(None)
        
class teammembers(APIView):
    def post(self, request, *args, **kwargs):
        coursecode = request.data['coursecode']
        try:
            givencourse = course.objects.get(coursecode=coursecode)
        except:
            return Response(None)
        students = givencourse.students.all()
        professor = givencourse.professor
        TAs = givencourse.TAs.all()
        target1 = [{'id': i.userID, 'name': i.username,'logo': i.userlogo}
                   for i in students]
        target2 = [{'id': i.userID, 'name': i.username,'logo': i.userlogo}
                   for i in TAs]
        target3 = [{'id': professor.userID, 'name': professor.username,'logo': professor.userlogo}]
        return Response({'P':target3, 'T':target2, 'S':target1})

class givegrade(APIView):
    def post(self, request, *args, **kwargs):
        score = request.data['score']
        userID = request.data['userID']
        review = request.data['review']
        solutionID = request.data['solutionID']
        try:
            givenuser = user.objects.get(userID = userID)
        except:
            return Response(None)
        try:
            givensolution = solution.objects.get(solutionID = solutionID)
        except:
            return Response(None)
        if grade.objects.filter(soln = givensolution).exists():
            prevgrade = grade.objects.filter(soln = givensolution)
            prevgrade.delete()
        givengrade = grade.objects.create(
            score = score,
            TA = givenuser,
            soln = givensolution,
            review = review
        )
        givengrade.save()
        return Response(givengrade.gradeID)

class checkasgnstatus(APIView):
    def post(self, request, *args, **kwargs):
        assignmentID = request.data['assignmentID']
        userID = request.data['userID']
        datestr = request.data['date']
        timestr = request.data['time']
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        try:
            givenasgn = assignment.objects.get(assignmentID=assignmentID)
        except:
            return Response(None)
        try:
            date = datestr.split('-')
            day = int(date[0])
            month = int(date[1])
            yrs = int(date[2])
            time = timestr.split(':')
            hrs = int(time[0])
            mins = int(time[1])
        except:
            return Response(False)
        currenttime = pytz.UTC.localize(datetime(yrs, month, day, hrs, mins, 0))
        isLive = True
        isCompleted = True
        if currenttime<givenasgn.deadline:
            isLive = True
        else:
            isLive = False
        flag = False
        if solution.objects.filter(sentuser = givenuser, sentassignment = givenasgn).exists():
            givensoln = solution.objects.filter(sentuser = givenuser, sentassignment = givenasgn).first()
            if grade.objects.filter(soln = givensoln).exists():
                givengrade = grade.objects.filter(soln = givensoln).first()
                flag = True
            isCompleted = True
        else:
            isCompleted = False
        if flag:
            return Response({'isLive':isLive, 'isCompleted':isCompleted,'isGraded':flag, 'score':givengrade.score, 'review':givengrade.review, 'TA':givengrade.TA.username})
        else:
            return Response({'isLive':isLive, 'isCompleted':isCompleted,'isGraded':flag, 'score':"", 'review':"", 'TA':""})

class getsolutionfile(APIView):
    def post(self, request, *args, **kwargs):
        assignmentID = request.data['assignmentID']
        userID = request.data['userID']
        try:
            givenuser = user.objects.get(userID=userID)
        except:
            return Response(None)
        try:
            givenasgn = assignment.objects.get(assignmentID=assignmentID)
        except:
            return Response(None)
        if solution.objects.filter(sentuser = givenuser, sentassignment = givenasgn).exists():
            givensoln = solution.objects.filter(sentuser = givenuser, sentassignment = givenasgn).first()
        else:
            return Response(None)
        return Response({'name':givensoln.file.name, 'link': "http://127.0.0.1:8000/media/" + givensoln.file.name})
    
class getsolution(APIView):
    def post(self, request, *args, **kwargs):
        solutionID = request.data['solutionID']
        try:
            givensoln = solution.objects.get(solutionID=solutionID)
        except:
            return Response(None)
        if grade.objects.filter(soln = givensoln).exists():
            givengrade = grade.objects.filter(soln = givensoln).first()
            return Response({'username':givensoln.sentuser.username, 'link': "http://127.0.0.1:8000/media/" + givensoln.file.name, 'date':givensoln.senttime.date(), 'time':givensoln.senttime.time(), 'filename':givensoln.file.name, 'score':givengrade.score, 'review':givengrade.review})
        else:
            return Response({'username':givensoln.sentuser.username, 'link': "http://127.0.0.1:8000/media/" + givensoln.file.name, 'date':givensoln.senttime.date(), 'time':givensoln.senttime.time(), 'filename':givensoln.file.name, 'score':"", 'review':""})
    
class getsolutioninfo(APIView):
    def post(self, request, *args, **kwargs):
        assignmentID = request.data['assignmentID']
        try:
            givenasgn = assignment.objects.get(assignmentID=assignmentID)
        except:
            return Response(None)
        solns = list(givenasgn.givensolutions.all())
        target = [{'id': i.solutionID, 'username': i.sentuser.username, 'time': i.senttime.time(
        ), 'date': i.senttime.date()} for i in solns]
        return Response({'solutions':target, 'caption':givenasgn.caption})

