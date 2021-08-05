# <img src='https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png'> Project 4: Overwatch Team Builder

## Overview

For our fourth and final project at GA we were tasked with making a full stack web app using React for the front end and Django for the back end. We had the option of working in groups or solo and for this one I decided to do a solo project to really round out my skills and make sure I was up to scratch in all areas.

### Links

https://overwatch-team-builder.netlify.app/ <-- Try it here!

https://github.com/sirdantheawesome/OTB-Frontend <-- Frontend

https://github.com/sirdantheawesome/OTB-Backend <-- Backend

## The Brief

- Make a website using Django-React full stack.
- Work in small groups of up to three or solo.
- Complete the project in one week.
- Deploy the project online and connect the front end to the back end.

## Approach

### Mockup

I planned the front end and back end structure of the project before starting to code. I whiteboarded out the front end pages and basic function and used a table diagram for the backend.

The main elements I wanted functional for an MVP were:

- User registration and log in.
- Editing account and picking heroes.
- Creating a team.
- Joining a team.
- Displaying a nice page for each team.
- Scalability for different devices.

I wanted the design to be clean and great to use. I did a mock up considering device scaling from the beginning:
<img src='ScreenCaps\Whiteboard-1.png'>
<img src='ScreenCaps\Whiteboard-2.png'>

The backend was designed to be functional and easy to use:
<img src='ScreenCaps\Backend.png'>

### Planning

My plan was to work primarily on the backend at first since I planned it out carefully in the whiteboarding phase. The back end was made in Django, the beginning was mainly setting up the Django project and admin panel. I then moved on to the Heroes db model using PostgreSQL.

```py
from django.db import models

class Hero(models.Model):
    name = models.CharField(max_length=50)
    img_large = models.URLField()
    img_banner = models.URLField()

    DPS = 'DPS'
    TANK = 'TANK'
    SUPPORT = 'SUPPORT'
    ROLE_CHOICES = [
        (DPS, 'dps'),
        (TANK, 'tank'),
        (SUPPORT, 'support')
    ]

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=DPS
    )

    def __str__(self):
        return self.name

```

I then moved on to the Team model and the custom User model.

```py
from django.db import models

class Team(models.Model):
    name = models.CharField(max_length=50)
    private = models.BooleanField()
    icon = models.URLField()

    owner = models.ForeignKey(
        'jwt_auth.User',
        related_name='owner_users',
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )

    dps_1 = models.ForeignKey(
        'jwt_auth.User',
        related_name='dps1_users',
        on_delete=models.CASCADE,
        blank=True,
        null=True
    )
    dps_2 = models.ForeignKey(...)

    tank_1 = models.ForeignKey(...)
    tank_2 = models.ForeignKey(...)

    support_1 = models.ForeignKey(...)
    support_2 = models.ForeignKey(...)

    def __str__(self):
        return f'{self.name}'

```

```py

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.CharField(max_length=50)
    battletag = models.CharField(max_length=50)
    sr = models.IntegerField(
        default=2500,
        validators=[MinValueValidator(0), MaxValueValidator(5000)]
    )

    DPS = 'DPS'
    TANK = 'TANK'
    SUPPORT = 'SUPPORT'
    ROLE_CHOICES = [
        (DPS, 'dps'),
        (TANK, 'tank'),
        (SUPPORT, 'support')
    ]
    mainrole = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=DPS
    )

    dps_1 = models.ForeignKey(
        'heroes.Hero',
        related_name='dps1_heroes',
        blank=True,
        null=True,
        help_text='Must be unique, must be dps',
        on_delete=models.SET_NULL
    )
    dps_2 = models.ForeignKey(...)
    dps_3 = models.ForeignKey(...)

    tank_1 = models.ForeignKey(...)
    tank_2 = models.ForeignKey(...)
    tank_3 = models.ForeignKey(...)

    support_1 = models.ForeignKey(...)
    support_2 = models.ForeignKey(...)
    support_3 = models.ForeignKey(...)

```

That was the back end mostly done, one other major thing to do was to set up serialized fields so that requests to the api could get nested information. For example when getting a Team also get the User and the Users selected Heroes.

```py
class PopulatedUserSerializer(ModelSerializer):
    dps_1 = HeroSerializer()
    dps_2 = HeroSerializer()
    dps_3 = HeroSerializer()

    tank_1 = HeroSerializer()
    tank_2 = HeroSerializer()
    tank_3 = HeroSerializer()

    support_1 = HeroSerializer()
    support_2 = HeroSerializer()
    support_3 = HeroSerializer()

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'battletag',
            'sr',
            'mainrole',
            'dps_1',
            'dps_2',
            'dps_3',
            'tank_1',
            'tank_2',
            'tank_3',
            'support_1',
            'support_2',
            'support_3',
        )
```

After the backend was up and working I started work on the frontend. I decided to learn and implement a new CCS React framework called Chakra-UI so I started with setting up a React app and installing Chakra-UI. I then moved on to creating my nav bar which would be present on all pages of the site.
<img src='ScreenCaps\NavBar.png'>

After this I add page routes with React Router Dom and added the other pages of the site.

<img src='ScreenCaps\Profile-Page.png'>
<img src='ScreenCaps\Register-Page.png'>
<img src='ScreenCaps\Team-Page.png'>
<img src='ScreenCaps\Teams-Page.png'>

## What I learnt

I found the main two things I learnt from making this site was project time management and planning was very important and significantly improved what I could get done in my time frame. Also I picked up Chakra-UI as a helpful skill which I will be sure to use in future projects.

### Challenges

Most of the challenges involved with making this site was extra features after the MVP. I would say that the end vision of what I would like to do with it in the future is a lot more complex than what I could complete on my own in the time frame, not that it was a small amount. I would like to revisit and rebuild this site in the future and give myself more time with it.

### Bugs

Deployment of this project came up with some errors on the back end at first. The problem I was having was that I was forgetting a .env file which doesn't get uploaded to GitHub since it is ignored. At one point I had reset the folder and forgotten to add back the .env file.

##

One of the biggest wins was thoroughly planning enough that I barely had to edit my back end after the initial version of it. Also more in general the App functions very well and feels good to use. Showing it to my friends they quickly made accounts and started using the app without me having to explain how any of it worked.
