# ITECH_Lab_Week2_2025-26

Week 2 – Work through *Tango with Django* Chapters 1\-4 

# How to use your lab time   
\(to make the most out of it\)

Labs work best when you treat them as practice time, not reading time\.

- *Before the lab*, read the relevant Tango with Django chapters/sections, at your own pace\. This way, you know what you are trying to build\.
- *During the lab*, focus on doing the exercises, running your project, and trying things out\. This is the best time to ask questions, because our teaching assistants can help you quickly when something doesn’t work\.
- *After the lab*, go through the checklist and tick what you have covered\. If you didn't finish something, that's fine \- just make sure you revisit it\! If anything still feels unclear, ask on Padlet or bring your question to the next lab\.

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 1–4\. Your main goal is to work through the book at your own pace and make steady progress\.  
  
Before you start:

- Confirm there are no issues with the environment setup completed in Week 1\.
- Make sure you know how to use git and have a GitHub \(or other\) repository set up\.

Chapter 1:__* *__

- This chapter reinforces some of the material we covered in Lecture 1\. You should attempt to do the exercises\.

## Chapter 2:

- You can mostly skip Chapter 2, except for __Section 2\.6__ on testing\. Get the tests you can run on each chapter\.

## Chapter 3:

- Be aware that you have already created your Django project in Week 1, when you set up your environment\.
- In Sections 3\.3, 3\.4, and 3\.5, you will build your first Django app\! Make sure you understand the basics of creating views and mapping URLs\.
- Complete the exercises associated with Chapter 3, run the provided tests and commit to GitHub\.

## Chapter 4:

- In this chapter, you will learn how to create templates and serve up static and dynamic media files\.
- Complete the exercises associated with Chapter 4, run the provided tests and commit to GitHub\.
- When you run the tests be aware that often errors are generated if you named things a slightly different way\. The tests can fail if you named the rango image ‘rango\.JPG’ or ‘<someothername>\.jpg’ instead of ‘rango\.jpg’\. Practice effective debugging\!  


Week 2 Checklist

- I read Chapter 2\.6 on testing and understand why we use unit tests\.
- I can run a chapter test module \(copy/download the test file, place it in the rango app, and run it with manage\.py\)\.
- After tests pass, I delete the test module from my rango directory to avoid clutter\.
- I can activate my virtual environment and confirm Django is installed \(version check works\)\.
- I understand what a Django project is vs a Django app\.
- I know what manage\.py is used for \(e\.g\., runserver / migrate / test\)\.
- I can run the development server and explain what 127\.0\.0\.1:8000 means\.
- I created the rango app and added it to INSTALLED\_APPS\.
- I can explain what a view does \(request → response\) and identify where views live\.
- I can explain URL routing in Django \(project urls\.py vs app urls\.py, and what include\(\) does\)\.
- I created an about view and mapped it to /rango/about/\.
- I understand what named URLs are used for \(e\.g\., name='index'\)\.
- I ran the Chapter 3 tests \(where provided\) and noted any failures/errors\.
- I can explain why we use templates instead of returning HTML strings\.
- I set up a templates directory and understand why we use templates/rango/\.
- I know where template paths are configured in settings\.py \(TEMPLATES → DIRS\)\.
- I understand what the template context is \(dictionary passed from a view\)\.
- I can identify a template variable \(e\.g\., \{\{ boldmessage \}\}\) and where its value comes from\.
- I configured static files and can explain the difference between the static directory and the /static/ URL\.
- I can include a static image in a template using the Django static tag\.
- I understand why hard\-coded paths are a problem and what BASE\_DIR is for\.
- I can explain the difference between static files and media files\.
- I configured media and understand what MEDIA\_ROOT and MEDIA\_URL represent\.
- I ran the Chapter 4 tests \(where provided\) and noted any failures/errors\.

