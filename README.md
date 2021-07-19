# [Postbook](https://elated-williams-fb7045.netlify.app/)

## Summary

This was a full stack application made with a React frontend and with a Django backend. This is a social media clone,a lot of inspiration was taken from Twitter and Facebook. The main goal was to get all the basic functions of a social media app within the timeframe of this project, which was a little over a week.

## Brief

- **Build a full-stack application** by making your own backend and your own front-end
- **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers. **ALLOW** time for this.
- **Be deployed online** so it's publicly accessible.

- [Postbook](#postbook)
  - [Summary](#summary)
  - [Brief](#brief)
  - [Technologies Used](#technologies-used)
  - [Approach Taken](#approach-taken)
  - [Screenshots](#screenshots)
  - [Bugs](#bugs)
  - [Future Features](#future-features)
  - [Key Learnings](#key-learnings)

## Technologies Used

- HTML5
- SASS
- JavaScript
- React
- Django
- Python
- PostgreSQL
- Git & Github
- Heroku
- Netlify

## Approach Taken

I started by making an ERD diagram for my database models. The general idea is that each post has an owner and that is the user who made the post, attachments and comments have a post id to reference which post they belong to. Some of the tables in the diagram were not created as they were part of stretch goals I could not get to.
![ERD diagram](./readme-assets/ERD.png)

Then I wrote the models for the post object and all the other models, I have put the post model below as an example.

```python
class Post(models.Model):
    content = models.TextField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(null=True, auto_now=True)
    user = models.ForeignKey(
        'jwt_auth.User',
        related_name='posts',
        on_delete=models.CASCADE
    )
    liked_by = models.ManyToManyField(
        'jwt_auth.User',
        blank=True
    )

    def __str__(self):
        return f'{self.content}'
```

Also the serializers for the post object.

## Screenshots 

Login
![Login](./readme-assets/login.PNG)
Register
![Register](./readme-assets/register.PNG)
Home
![home](./readme-assets/home.PNG)
Profile
![Profile](./readme-assets/profile.PNG)

## Bugs

- When a logged out user is not taken to the login page, instead it goes to a blank page and the page needs to be refreshed. This bug was related to react component unmount which I could not solve until the end of the project.
- Like counters will bug out sometimes.

## Future Features 

- Add a page for you.
- Remove posts made by the user from the feed.
- Add messaging.
- Improve the user journey.

## Key Learnings

I learnt a lot during this project as it was my first solo full stack project. Working solo I had a lot more flexibility when making decisions and although I started out with estimates for the project to get to the MVP stage in 4 days it took a lot longer than expected. This was mainly due to the fact that I had used bulma in the last 2 projects and writing just CSS again took some time alongside other issues I faced in the backend. Overall I learnt the importance of having a project timeline and a clear plan with daily tasks which I did not use.

