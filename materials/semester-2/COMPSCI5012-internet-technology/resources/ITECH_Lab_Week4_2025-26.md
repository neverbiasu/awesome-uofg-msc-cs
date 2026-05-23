# ITECH_Lab_Week4_2025-26

Week 4 – Work through *Tango with Django* Chapters 7\-8

# How to use your lab time   
\(to make the most out of it\)

Labs work best when you treat them as practice time, not reading time\.

- *Before the lab*, read the relevant Tango with Django chapters/sections, at your own pace\. This way, you know what you are trying to build\.
- *During the lab*, focus on doing the exercises, running your project, and trying things out\. This is the best time to ask questions, because our teaching assistants can help you quickly when something doesn’t work\.
- *After the lab*, go through the checklist and tick what you have covered\. If you didn't finish something, that's fine \- just make sure you revisit it\! If anything still feels unclear, ask on Padlet or bring your question to the next lab\.

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 7–8\. Your main goal is to work through the book at your own pace and make steady progress\.  
  
Before you start:

- Confirm you have completed Chapters 1\-6 \- your lab work for Weeks 1 and 2\.

## Chapter 7:

- This chapter covers Forms and links well to the GET and POST requests that we will discuss during the lectures this week\. 
- Find out how to set up a Form by creating ModelForm classes and views and templates to display the form\. Make sure you know what a CSRF token is\!
- Complete the exercises associated with Chapter 7, run the provided tests and commit to GitHub\.

## Chapter 8:

- In this chapter, you will learn how to deal with repetition in Django – and an important principle named “DRY” \- *Don’t Repeat Yourself\! * 
- By the end of the chapter, you should know how to use relative URLs in your templates and how to specify template blocks\.
- Complete the exercises associated with Chapter 8 run the provided tests and commit to GitHub\.  


Week 4 Checklist

- I can explain what Django forms/ModelForms do \(generate HTML, validate input, show errors, convert data\)\.
- I created forms\.py and built CategoryForm and PageForm correctly \(Meta model set; fields/exclude used appropriately\)\.
- I used hidden/default fields sensibly \(e\.g\., views/likes/slug\) and understand when the model vs the form should set values\.
- I added CSRF protection in POST forms and understand GET vs POST\.
- I implemented add\_category \(GET shows form, POST validates/saves, then redirects\)\.
- I created add\_category\.html to render hidden \+ visible fields, help text, and errors\.
- I mapped the URL for adding a category and linked to it from the site\.
- I implemented add\_page for /category/<slug>/add\_page/, handling “missing category” safely\.
- I used form\.save\(commit=False\) to set page\.category before saving, then redirected using reverse\(\)\.
- I created add\_page\.html and added an “Add Page” link on the category page\.
- I replaced hardcoded links with \{% url %\} \(including parameterised URLs and form actions\)\.
- I created base\.html with title\_block and body\_block, and refactored all templates to \{% extends %\} it\.
- I made sure views use render\(request, \.\.\.\) so templates get request context\.
- I added a custom inclusion tag \(get\_category\_list\) \+ categories\.html, loaded it in base\.html, and restarted the server after tag edits\.
- I ran unit tests for Chapters 7 and 8, fixed issues, and removed the test modules afterward\.

