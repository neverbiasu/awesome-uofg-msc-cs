# ITECH_Lab_Week7_2025-26

Week 7 – Work through *Tango with Django* Chapters 11\-13

# How to use your lab time   
\(to make the most out of it\)

Labs work best when you treat them as practice time, not reading time\.

- *Before the lab*, read the relevant Tango with Django chapters/sections, at your own pace\. This way, you know what you are trying to build\.
- *During the lab*, focus on doing the exercises, running your project, and trying things out\. This is the best time to ask questions, because our teaching assistants can help you quickly when something doesn’t work\.
- *After the lab*, go through the checklist and tick what you have covered\. If you didn't finish something, that's fine \- just make sure you revisit it\! If anything still feels unclear, ask on Padlet or bring your question to the next lab\.

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 11–13\. Your main goal is to work through the book at your own pace and make steady progress\.  
  
Before you start:

- Confirm you have completed Chapters 1\-10 \- your lab work for Weeks 1\-6\.

## Chapter 11:

- This chapter replaces your “manual” login/registration code with django\-registration\-redux, an external Django app that provides common authentication features out\-of\-the\-box\. This also gives you practice installing, configuring, and integrating third\-party packages into your project\.
- Complete the exercises associated with Chapter 11, run the provided tests and commit to GitHub\.

## Chapter 12:

- In this chapter, you will improve the look and feel of Rango by using Bootstrap 4\. Bootstrap is a popular CSS/JavaScript toolkit that helps you build responsive page layouts and consistent UI components such as navbars, sidebars, forms, and cards\.
- We mentioned Bootstrap back in Week 3: it adds JavaScript\-powered UI behaviour \(e\.g\., the navbar toggle/collapse\), so you can directly link it to DOM manipulation \+ event handling, which we discussed in Week 6\. This chapter will reinforce your understanding of the client\-side environment: loading external JS/CSS assets and using DevTools to see how the browser applies scripts to make pages interactive\.
- Complete the exercises associated with Chapter 12, run the provided tests and commit to GitHub\.

## Chapter 13:

- In this chapter, you will learn how to integrate an external web service into your Django app using a real API\. You will implement search functionality, by connecting Rango to the Bing Search API via a small Python wrapper, and then build a simple search page that accepts a query, sends it to Bing, and displays results in a template\.
- This introduces you to a new concept: the idea of web apps as clients of other services: your server becomes a “client” of Bing, and you practice working with HTTP requests/responses, JSON data, and API keys safely\.
- Complete the exercises associated with Chapter 13, run the provided tests and commit to GitHub\.

  


Week 7 Checklist

- I installed django\-registration\-redux, added 'registration' to INSTALLED\_APPS, and ran migrations if needed\.
- I added the /accounts/ URL include in the project\-level urls\.py using the simple backend \(registration\.backends\.simple\.urls\)\.
- I added the required registration settings in settings\.py\.
- I created the templates/registration/ directory and added the required templates \(login\.html, logout\.html, registration\_form\.html, registration\_closed\.html\), extending rango/base\.html\.
- I updated base\.html links to use the registration\-redux URL names \(auth\_login, auth\_logout, registration\_register\), including a next= redirect on logout if required\.
- I removed or commented out my old manual authentication code \(register/user\_login/user\_logout views, their URL mappings, and any unused templates\), and cleaned up redundant imports\.
- I completed the Chapter 11 exercise to add password change functionality and added a link in base\.html that only appears when the user is logged in\.
- I added the Bootstrap base template, favicon, and switched templates so the Bootstrap version is now base\.html\.
- I updated the categories sidebar template to use Bootstrap nav/list styling and show the active category clearly\.
- I updated index\.html to use a jumbotron header and a two\-column Bootstrap layout for categories/pages, and improved lists using list\-group classes\.
- I updated other templates \(including add\_category/add\_page and registration templates\) so form pages use Bootstrap classes and look consistent\.
- I created bing\_search\.py and installed requests, and I can run a query through run\_query\(\) successfully\.
- I created bing\.key in the project root, added \*\.key to \.gitignore, and confirmed I did not commit my API key\.
- I created search\.html, added the search\(\) view, created the /rango/search/ URL mapping, and added a Search link to the navbar \(visible to all users\)\.
- I completed the Chapter 13 exercise to keep the query visible in the search box after results are displayed\.
- I ran the provided unit tests for Chapters 11–13 \(where applicable\), fixed failures, and committed/pushed my work to GitHub\.

