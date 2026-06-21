# ITECH_Lab_Week9_2025-26

Week 9 – Work through *Tango with Django* Chapters 18\-19

# Own Study/Lab Work Outline

This week’s lab is based on *Tango with Django*, Chapters 18–19\. This week’s lab work concludes the book with testing and deployment\.  
  
Before you start:

- Confirm you have completed Chapters 1\-17 \- your lab work for Weeks 1\-8\.

## Chapter 18:

- This chapter provides you the basics of automated testing in Django\. I
- You will go through the very basics of testing with Django, following a similar structure to the Django Tutorial with some additional notes\. 
- Complete the exercises in Chapter 18\.

## Chapter 19:

- This chapter will introduce you to how to deploy your Project\!
- You will go through a step\-by\-step guide to deploy your Django application on PythonAnywhere\. PythonAnywhere is an online IDE and web hosting service, geared towards hosting Python applications\. The service provides in\-browser access to the server\-based Python and Bash command line interfaces\. 

Week 9 Checklist

- I can run the Django test suite for my app \(python manage\.py test rango\) and I understand that Django creates a temporary test database for tests\.
- I created at least one model test in rango/tests\.py using django\.test\.TestCase, and my test methods start with test\_ and include clear assertions\.
- I wrote a test to ensure Category\.views cannot be negative, updated the Category\.save\(\) logic to enforce this, and confirmed the test passes\.
- I wrote a test to confirm Category\.slug is created correctly \(lowercase with hyphens\) and confirmed it passes\.
- I wrote at least one view test using Django’s test client \(self\.client\.get\(\.\.\.\)\) and reverse\('rango:index'\), and checked response status codes and page content \(assertContains\)\.
- I used \(or created\) helper functions in tests \(e\.g\., add\_category\(\.\.\.\)\) to keep tests DRY and easy to read\.
- I understand that each test runs with a clean database state unless I create objects inside that test\.
- I ran coverage for my project \(coverage run \.\.\. then coverage report\) and used the report to identify which modules need more tests\.
- I completed the chapter exercises \(e\.g\., adding last\_visit to Page and writing tests that it’s not in the future and updates on clickthrough\)\.
- I created a PythonAnywhere account and can find my app URL \(<username>\.pythonanywhere\.com\)\.
- I created/activated a virtual environment on PythonAnywhere and installed the same packages/versions as my local setup\.
- I cloned my Git repository on PythonAnywhere and navigated to the folder containing manage\.py\.
- I ran migrations and created a superuser on PythonAnywhere, then ran my population script to load sample data\.
- I set the correct PythonAnywhere “Source code” path and “Virtualenv” path in the Web tab\.
- I updated the WSGI configuration to point to my Django project settings and confirmed the app loads\.
- I set ALLOWED\_HOSTS correctly for my PythonAnywhere domain and turned DEBUG off for deployment\.
- I configured static file mappings on PythonAnywhere \(Django admin static \+ my project /static/\) and confirmed CSS/images load\.
- I kept secret keys and API keys out of Git and ensured they exist on PythonAnywhere\.
- I know where to look for deployment issues \(PythonAnywhere access/error/server logs\) and I reloaded the web app after changes\.

