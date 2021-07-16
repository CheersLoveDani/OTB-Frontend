# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Project 4: Overwatch Team Builder

## Approach

### Mockup

I planned the front end and back end structure of the project before starting to code. I whiteboarded out the front end pages and basic function and used a table diagram for the backend.

The main elements I wanted functional for an MVP were:

- User registration and log in
- Editing account and picking heroes
- Creating a team
- Joining a team
- Displaying a nice page for each team
- Scalability for different devices

I wanted the design to be clean and great to use. I did a mock up considering device scaling from the beginning:
![](ScreenCaps\Whiteboard-1.png)
![](ScreenCaps\Whiteboard-2.png)

The backend was designed to be function and easy to use:
![](ScreenCaps\Backend.png)

### Planning

My plan was to work primarily on the backend at first since I planned it out carefully in the whiteboarding phase. The back end was made in Django, the beginning was mainly setting up the Django project and admin panel. I then moved on to the Heroes db model using PostgreSQL.
![](ScreenCaps\Hero-Model.png)

I then moved on to the Team model and the custom User model.
![](ScreenCaps\Team-Model.png)
![](ScreenCaps\User-Model.png)

That was the back end mostly done, one other major thing to do was to set up serialized fields so that requests to the api could get nested information. For example when getting a Team also get the User and the Users selected Heroes.

![](ScreenCaps\Serializer.png)

After the backend was up and working I started work on the frontend. I decided to learn and implement a new CCS React framework called Chakra-UI so I started with setting up a React app and installing Chakra-UI. I then moved on to creating my nav bar which would be present on all pages of the site.
![](ScreenCaps\NavBar.png)

After this I add page routes with React Router Dom and added the other pages of the site.

![](ScreenCaps\Profile-Page.png)
![](ScreenCaps\Register-Page.png)
![](ScreenCaps\Team-Page.png)
![](ScreenCaps\Teams-Page.png)

## Challenges

### Overall

Most of the challenges involved with making this site was extra features after the MVP. I would say that the end vision of what I would like to do with it in the future is a lot more complex than what I could complete on my own in the time frame, not that it was a small amount. I would like to revisit and rebuild this site in the future and give myself more time with it.

### Bugs

Deployment of this project came up with some errors on the back end at first. The problem i was having was that I was forgetting a .env file which doesn't get uploaded to github since it is ignored. At one point I had reset the folder and forgotten to add back the .env file.

## What I learnt

I found the main two things I learnt from making this site was project time management and planning was very important and significantly improved what I could get done in my time frame. Also I picked up Chakra-UI as a helpful skill which I will be sure to use in future projects.
