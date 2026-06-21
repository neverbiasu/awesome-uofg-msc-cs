# ITECH_Lab_Week6_2025-26

Week 6 – Work through *Tango with Django* Chapters 9\-10

# How to use your lab time   
\(to make the most out of it\)

Labs work best when you treat them as practice time, not reading time\.

- *Before the lab*, read the relevant Tango with Django chapters/sections, at your own pace\. This way, you know what you are trying to build\.
- *During the lab*, focus on doing the exercises, running your project, and trying things out\. This is the best time to ask questions, because our teaching assistants can help you quickly when something doesn’t work\.
- *After the lab*, go through the checklist and tick what you have covered\. If you didn't finish something, that's fine \- just make sure you revisit it\! If anything still feels unclear, ask on Padlet or bring your question to the next lab\.

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 9–10\. Your main goal is to work through the book at your own pace and make steady progress\.  
  
Before you start:

- Confirm you have completed Chapters 1\-8 \- your lab work for Weeks 1\-4\.

## Chapter 9:

- In this chapter, you will learn the basic user authentication mechanisms provided by Django\. In other words, you will learn how your app can tell the difference between anonymous users and logged\-in users\.
- Find out how to use the auth app, provided as part of a standard Django installation \(located in django\.contrib\.auth\)\. You will then be able to support registration and login/logout, as well as control what different users are allowed to do\. 
- Complete the exercises associated with Chapter 9, run the provided tests and commit to GitHub\.

## Chapter 10:

- In Chapter 9,  Django uses cookies and sessions for login and logout behind the scenes; in Chapter 10 you will look at what is actually happening under the hood\. Recall how in Lecture 4, we learned that HTTP is stateless\. Cookies and sessions are a practical mechanism to keep the “conversation state” across a sequence of client\-server messages\.
- By the end of Chapter 10, you will know how Django stores and retrieves cookie/session data, and how you can use it yourself for things like simple tracking and stateful behaviour\.
- Complete the exercises associated with Chapter 10 run the provided tests and commit to GitHub\.  


Week 6 Checklist

- I confirmed auth \+ sessions are enabled in settings\.py \(django\.contrib\.auth, django\.contrib\.contenttypes,django\.contrib\.sessions, and SessionMiddleware\), and ran migrations if I changed settings\.
- I understand why passwords must be hashed and that Django stores hashed passwords \(not plaintext\), and I know where password validators are configured\.
- I created a UserProfile model linked OneToOneField\(User\) with website and picture, added Pillow, registered it in admin\.py, and migrated\.
- I created UserForm \(with PasswordInput\) and UserProfileForm in forms\.py with correct Meta fields\.
- I implemented register\(\) to handle GET/POST, validate both forms, call user\.set\_password\(\.\.\.\), use commit=False for the profile, handle request\.FILES for the picture, and show a success state in the template\.
- I created register\.html with CSRF, multipart/form\-data, and form rendering, then added the /register/ URL mapping and a link to it\.
- I implemented user\_login\(\) using authenticate\(\) \+ login\(\), handled inactive/invalid cases, and redirected using reverse\(\) rather than hardcoded URLs\.
- I created login\.html with CSRF and matching name="username" / name="password", mapped /login/, and linked to it\.
- I implemented user\_logout\(\) using logout\(\) \+ redirect, mapped /logout/, and only show Login/Logout/Sign Up links appropriately in base\.html using \{% if user\.is\_authenticated %\}\.
- I restricted access to adding categories/pages \(and any “restricted” page\) using @login\_required, set LOGIN\_URL using the URL name \('rango:login'\), and made sure templates don’t show “Add Page/Add Category” links to anonymous users \(if required by the spec\)\.
- I converted the restricted view to a template \(restricted\.html\) that extends base\.html and has the correct title block\.
- I can explain the difference between cookies vs sessions, and why sessions are safer for sensitive data\.
- I verified cookies work \(test cookie or DevTools\), and then removed the test\-cookie code once confirmed\.
- I implemented a visit counter either with client\-side cookies \(request\.COOKIES \+ response\.set\_cookie\) or server\-side sessions \(request\.session\.get / request\.session\[\.\.\.\]\), and I didn’t mix the two without clearing old cookies first\.
- I updated the About page to display Visits: <count> using the session value, and removed visit\-display logic from index while keeping the counter increment call\.
- I know how session expiry works \(SESSION\_EXPIRE\_AT\_BROWSER\_CLOSE, SESSION\_COOKIE\_AGE\) and how to clear old sessions \(python manage\.py clearsessions\)\.
- I ran unit tests for Chapters 9 and 10, fixed failures, and removed the chapter test modules afterwards\.

