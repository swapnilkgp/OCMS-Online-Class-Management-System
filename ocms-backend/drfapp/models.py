from django.db import models
import uuid
import shortuuid

# Create your models here.

class user(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.TextField()
    userID = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    userlogo = models.CharField(max_length=1, default="")
    def __str__(self):
        return f"{self.username} ({self.userID})"

    def save(self, *args, **kwargs):
        if not self.userlogo:
            self.userlogo = self.username[0].upper()
        super().save(*args, **kwargs)


class course(models.Model):
    courseno = models.CharField(max_length=100)
    coursename = models.TextField()
    coursecode = models.CharField(max_length=11, unique=True, primary_key=True)
    professor = models.ForeignKey(user, on_delete = models.CASCADE, related_name = 'courses_taught')
    TAs = models.ManyToManyField(user, related_name = 'courses_instructed')
    students = models.ManyToManyField(user, related_name = 'courses_learnt')
    logo = models.CharField(max_length = 2, default="")

    def save(self, *args, **kwargs):
        if not self.logo:
            self.logo = self.coursename[:2].upper()
        if not self.coursecode:
            uuid_value = uuid.uuid4()
            short_uuid = shortuuid.ShortUUID().encode(uuid_value)
            self.coursecode = short_uuid[:3]+'-' + \
                short_uuid[3:6]+'-'+short_uuid[6:9]
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.coursename} ({self.coursecode})"


class message(models.Model):
    sender = models.ForeignKey(
        user, on_delete=models.CASCADE, related_name='yourmessages')
    msg = models.TextField()
    senttime = models.DateTimeField()
    sendercourse = models.ForeignKey(
        course, on_delete=models.CASCADE, related_name='messages')
    msgID = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)

    def __str__(self):
        return f"{(self.sender).username} ({self.msgID})"


class video(models.Model):
    video_file = models.FileField()
    caption = models.CharField(max_length=100)
    senttime = models.DateTimeField()
    sendercourse = models.ForeignKey(
        course, on_delete=models.CASCADE, related_name='videos')
    videoID = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    def __str__(self):
        return f"{(self.caption)} ({self.videoID})"


class assignment(models.Model):
    file = models.FileField()
    caption = models.CharField(max_length=100)
    instruction = models.TextField()
    deadline = models.DateTimeField()
    assignmentID = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    maxmarks = models.CharField(max_length = 5)
    sentcourse = models.ForeignKey(
        course, on_delete=models.CASCADE, related_name='assignments')
    def __str__(self):
        return f"{(self.caption)} ({self.assignmentID})"


class solution(models.Model):
    file = models.FileField()
    sentassignment = models.ForeignKey(
        assignment, on_delete=models.CASCADE, related_name='givensolutions')
    sentuser = models.ForeignKey(
        user, on_delete=models.CASCADE, related_name='solutions')
    senttime = models.DateTimeField()
    solutionID = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    def __str__(self):
        return f"{(self.sentuser.username)} ({self.solutionID})"

class grade(models.Model):
    score = models.CharField(max_length = 5)
    TA = models.ForeignKey(user, on_delete=models.CASCADE, related_name='checked_solutions')
    review = models.TextField()
    soln = models.ForeignKey(solution, on_delete=models.CASCADE, related_name='grade')
    gradeID = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    def __str__(self):
        return f"{(self.soln.sentuser.username)} ({self.TA.username}) ({self.gradeID})"
