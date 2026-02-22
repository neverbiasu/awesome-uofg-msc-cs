# ITECH_Lab_Week3_2025-26

Week 3 – Work through *Tango with Django* Chapters 5\-6

# How to use your lab time   
\(to make the most out of it\)

Labs work best when you treat them as practice time, not reading time\.

- *Before the lab*, read the relevant Tango with Django chapters/sections, at your own pace\. This way, you know what you are trying to build\.
- *During the lab*, focus on doing the exercises, running your project, and trying things out\. This is the best time to ask questions, because our teaching assistants can help you quickly when something doesn’t work\.
- *After the lab*, go through the checklist and tick what you have covered\. If you didn't finish something, that's fine \- just make sure you revisit it\! If anything still feels unclear, ask on Padlet or bring your question to the next lab\.

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 5–6\. Your main goal is to work through the book at your own pace and make steady progress\.  
  
Before you start:

- Confirm you have completed Chapters 1\-4 \- your lab work for Week 2\.

## Chapter 5:

- This chapter covers models in Django, and links well to Database Modelling and ERDs\. Make sure you have completed Chapter 1, and revisit the lecture material from Week 1\. 
- In this chapter, you will learn how to create models \(entities\) and how to specify fields \(attributes\) in Django\. Get to grips with Primary and Foreign Keys, and how to specify relationships in Django\. Figure out how to write a population script for your database\.
- Complete the exercises associated with Chapter 5, run the provided tests and commit to GitHub\.

## Chapter 6:

- In this chapter, you will learn how to link models, views, and templates together\! By the end of the chapter, you should also understand the concept of slugs and how to map URLs that are based on items in a database\.
- Complete the exercises associated with Chapter 6, run the provided tests and commit to GitHub\.  


Week 3 Checklist

- I can explain \(briefly\) what Django’s ORM does and why we use models instead of writing SQL directly\.
- I can identify Rango’s core data requirements \(Category and Page, and their one\-to\-many relationship\)\.
- I checked the DATABASES setting and understand that we are using SQLite for development\.
- I added db\.sqlite3 to \.gitignore \(and understand why database files shouldn’t be committed\)\.
- I created the Category and Page models in rango/models\.py with appropriate field types \(CharField, URLField, IntegerField, ForeignKey\)\.
- I implemented str\(\) for both models and can explain why it’s useful \(debugging/admin display\)\.
- I can describe what ForeignKey \+ on\_delete=models\.CASCADE means in this context\.
- I ran migrations successfully and understand what each command is for\.
- I can create a superuser and log into /admin/\.
- I registered Category and Page in admin\.py and confirmed they appear in the admin interface\.
- I used the Django shell to create/query model instances \(at least once\) and understand why it’s useful for debugging\.
- I created a population script \(populate\_rango\.py\), ran it, and verified the database is populated via the admin interface\.
- I used get\_or\_create\(\) and can explain what problem it solves \(avoids duplicates\)\.
- I completed the Chapter 5 exercises \(added likes/views to Category, updated population script, and recreated/replicated the database if needed\)\.
- I ran the Chapter 5 unit tests, noted any failures, and removed the test file when done\.
- I can describe the “data\-driven page” workflow \(query model → pass to context → template renders → URL maps to view\)\.
- I updated index\(\) to query the Category model \(ordered and limited results\) and passed the category list into the template context\.
- I updated index\.html to display categories using template control structures \(\{% if %\}, \{% for %\}\) and handled the “no data” case\.
- I added a slug field to Category and understand why we use slugs in URLs \(readable \+ safe\)\.
- I can explain how slugify works and how/when the slug value gets set \.
- I migrated the slug change and re\-ran the population script so existing categories get slugs\.
- I updated the admin interface so the slug is prepopulated from the name field\.
- I made the slug unique and understand why uniqueness matters for URL lookups\.
- I created a category detail view \(show\_category\) that takes a slug parameter and handles “category not found” safely\.
- I created category\.html and displayed pages for a category \(including a sensible message when no pages exist\)\.
- I added a parameterised URL pattern for category pages in rango/urls\.py\.
- I updated index\.html so category names link to their category pages using the slug\.
- I completed the Chapter 6 exercises \(top viewed pages on the index page, headings, link back to index from category page\)\.
- I ran the Chapter 6 unit tests, noted any failures, and removed the test file when done\.

