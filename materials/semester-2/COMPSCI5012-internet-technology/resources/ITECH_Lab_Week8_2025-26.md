# ITECH_Lab_Week8_2025-26

Week 8 – Work through *Tango with Django* Chapters 14\-17

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 14–17\. Your main goal is to work through the book at your own pace and make steady progress\.  
  
Before you start:

- Confirm you have completed Chapters 1\-13 \- your lab work for Weeks 1\-7\.

## Chapters 14\-15:

- These two chapters will help you make Rango more cohesive and interactive, by tying together features that you have already built, and adding a few new ones\.
- The key themes you will explore are: i\) how to track page clicks/views, how to integrate search into category pages, and how to bring back/expand user profile features \(especially if you lost them when switching to django\-registration\-redux\)\.
- Follow Chapter 14 and use Chapter 15 when you get stuck — it’s effectively the “hints \+ model solutions” chapter\.

## Chapter 16:

- This chapter introduces the basics of JavaScript using the jQuery framework\. A few lines of jQuery can enapsulate hundreds of lines of pure JavaScript\. JQuery also provides a suite of APIs that are mainly focused on manipulating HTML elements\. 
- In this chapter, you will use jQuery within Rango, explaining how to interpret basic jQuery code, and providing several examples\.
- Complete the exercises associated with Chapter 16, run the provided tests and commit to GitHub\.

## Chapter 17:

- This chapter covers AJAX in Django with JQuery, and you will work towards incorporating AJAX requests into Rango\. You will also be using the jQuery framework, as introduced in Chapter 16\. 
- Complete the exercises associated with Chapter 16, run the provided tests and commit to GitHub\.

Week 8 Checklist

- I implemented __page click tracking__ using a goto\_url\(\) view \(/rango/goto/\) that increments Page\.views and redirects to the real URL\.
- I updated category\.html to use the __goto__ link format \(\{% url 'rango:goto' %\}?page\_id=\{\{ page\.id \}\}\) and display page view counts\.
- I updated show\_category\(\) so pages are ordered by __most viewed__ \(order\_by\('\-views'\)\)\.
- I moved __search into category pages__: form \+ results live in category\.html, and show\_category\(\) handles POST search queries\.
- I restricted category search so __only logged\-in users__ can use/see it \(\{% if user\.is\_authenticated %\} around the search UI\)\.
- I restored __UserProfile creation__ via a second\-step form and handled image upload with multipart/form\-data\.
- I added a __profile page__that shows a user’s details and only lets users edit __their own__ profile\.
- I added a __list profiles__ page visible only to logged\-in users\.
- I downloaded __jquery\-3\.3\.1\.min\.js__ \(full version\), saved it in static/js/ and updated base\.html to load the local jQuery \{% static "js/jquery\-3\.3\.1\.min\.js" %\}
- I created static/js/rango\-jquery\.js and referenced it __after__ jQuery in base\.html\.
- I added an __id__ \(e\.g\., about\-btn\) to a button in about\.html and attached a jQuery \.click\(\.\.\.\) handler in rango\-jquery\.js\.
- I tried at least one selector example using \#id, \.class, a tag selector like $\('p'\)
- I implemented one small DOM manipulation \(e\.g\., addClass/removeClass, \.css\(\.\.\.\)\)\.
- I used the browser __Developer Tools Console__ to check for errors and confirmed changes with a __hard refresh__ when needed\.
- I created static/js/rango\-ajax\.js and included it in base\.html __after__ jQuery \(and I did a hard refresh when testing\)\.
- In category\.html, I added id="like\_count" and a Like Category button with id="like\_btn" \+ data\-categoryid \(only visible to logged\-in users\)\.
- I implemented LikeCategoryView \(login required\) to read category\_id, increment likes, and return HttpResponse\(category\.likes\), and I added the like\_category/ URL\.
- In rango\-ajax\.js, clicking \#like\_btn sends $\.get\(\.\.\.\), updates \#like\_count, and hides the button\.
- In base\.html, I added the sidebar search input \(\#search\-input\) and wrapped the category list in a container with id="categories\-listing"\.
- I added get\_category\_list\(\) and CategorySuggestionView, mapped suggest/, and returned rango/categories\.html with the categories context\.
- In rango\-ajax\.js, typing in \#search\-input triggers $\.get\('/rango/suggest/', \.\.\.\) and replaces \#categories\-listing with the returned HTML\.
- I ran the provided unit tests for Chapters 14–17 \(where applicable\), fixed failures, and committed/pushed my work to GitHub\.

