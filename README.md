# A Social Recipe Application

## Description

A fully functional React application where you can add, edit, delete, like, comment and share recipes. Email authentication and OAuth for account creation and keep track of your favorite recipes. Optimized for all devices and viewports.

## Build Process

This application was built using React.js and Google Firebase. The initial dataset was a trove of old recipes passed down from my grandma that lived on a ancient piece of recipe software. They were extracted and converted into .pdf and .doc files a few years back by a relative. Initially it took about 1-2 weeks to complete

### Initial Dataset

By far, the most challenging part of this project was parsing the data to display it correctly and consistently. Because of its age and origin it was full of inconsitent spacing, formatting and random text artifacts. This made it nearly impossible to extract the data from the PDF and word documents. Once extracted to the best of my ability I uploaded it to Google Firebase using the Firebase CLI. I then had to create some interesting regex to parse the data into seperate steps and ingredients as the source was all basically paragraphs of text. I used the same process to fetch recipes from the database using params. There were so many edge cases here, which made this one of the most difficult and time consuming aspects of the project.

### Database Structure

A quick note on the structure of the database. I have two collections (users and recipes). Recipes consists of documents for each Category and each Category has a collection recipes. This allowed me to categorize the recipes and also access all of the recipes via the subcollection.

### State Management and Search

I didn't use any third party state management for this project. It was all done using useContext. Initially I was loading all of the recipes from the database. Mainly so I could implement a search function, but also to populate specific categories of recipes and sorting methods. Even with all the recipes the TTL was still very good, but obviously this is not optimal and wouldn't work at scale, especially once each recipe had multiple images associated with it. Also, the search function I created was no where near as good and rich as it needed to be. I updated my useEffects to only query the specific data I need, e.g all the recipes in a specific category when navigating to that category page and implemented Algolia to handle the search and filtering functionality. The only hurdle here was they don't allow you to monitor entire subcollections for changes to update the search index. Still need to find a solution here.

### Hurdles

Some of the biggest pain points for me were having to deal with all of the "x is null' errors that arise when you are trying to render props before the state has loaded. Usually this can be solved by adding a conditional return, however you cannot use a conditional return before a useEffect, so if your useEffect is using say auth.currentUser, but it runs before the server returns the current user data it will throw an error. React has a experimental hook useStatus that hopefully will be available soon in production that is supposed to solve this.

For example the below will throw the above referenced error.

```
useEffect(() => {
    let userRecipes = [];
    currentUserData.recipes.forEach((recipe) => {
      const fetchUserRecipes = async () => {
        try {
          const userRecipeRef = collectionGroup(db, "recipes");
          const q = query(
            userRecipeRef,
            where("title", "==", recipe.toUpperCase())
          );

          const querySnapshot = await getDocs(q);
          userRecipes.push(querySnapshot);
        } catch (error) {}
      };
      fetchUserRecipes();
    });
    setUserRecipes(userRecipes);
  }, [currentUserData]);

  if (!currentUserData) {
    return;
  }
```

However, this will also throw an error as you cannot have a conditional render before a useEffect hook

```
if (!currentUserData) {
    return;
  }

useEffect(() => {...
```

### Images

Obviously images are important for a food app and ideally you would have at least one for each recipe, which is a lot of photos. Given the initial data set there aren't many photos for individual recipes, so most have a stock image. Unfortunate, but not much to be done there. I used a cloud function to resize and convert the images to webp server side. Implemented lazy loading and pagination as well.

### Security

Security is always a concern, especially when you have user inputs that render to the dom. Here I used regex and a packaged called

There are protected routes for the profile and edit pages and auth checks

Aside from that having well written rules in Firestore is a good way to make sure your data stays secure.

### Optimization

### SEO

I used React Helmet to include a header on each page for SEO. Uploaded a sitemap to Google Source Console
