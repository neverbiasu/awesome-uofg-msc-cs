# L9-Revision

COMPSCI5012 
Internet Technology (ITECH)
Revision Lecture

Reminders
CW5+CW6 deadline:
 
Today at 16.30 (in a few mins)
Delta submissions 
(individual contributions) for CW5 and CW6 will open tomorrow at 9:00 and will close on March 26, 17:30
This is our last face-to-face meeting

Exam: When, Where, How long
When
During April-May 2026 exam period 
(27 April – 22 May)
Exact date/time to be announced very soon
Where / How
Invigilated exam in lab
Closed books exam
A 2-page crib sheet will be provided (printed handout)
Will be 
available on Moodle 
early next week
How long
1 hour duration
Unless you have other provisions

Exam: What
Worth 20% of your 
coursemark
40 marks in total
Part A:
 5 MCQs for 10 marks
Part B: 
Open questions for 30 marks

Exam: Part A
Exam Part A includes 5 MCQs
Correct answer: +2 marks
Incorrect answer: -2/3 mark
Blank answer: 0 marks
4 possible answers, only one is correct!
You are used to this format from the quizzes!

Exam: Part A – MCQ example

Exam: Part B
Exam Part B includes 6-7 open-ended questions
No negative marks
Draws on what you learned during the group coursework and own-study materials
Contains a scenario (application requirements) which you are asked questions about. 
Read this carefully!
Asks you to write some code (1-2 lines of code, or fill in gaps)

Exam: Part B – Application scenario
A restaurant conglomerate would like to create a site to allow their customers to rate hamburgers eaten. Basically, the conglomerate asked your team to design, specify and develop a “Rate My Burger” application with the following minimum requirements: 
This site should allow registered customers to enter reviews, providing a rating and comments. 
The site should allow registered members of the conglomerate to add a new restaurant, where the member has to enter the restaurant's name, description, photo, address, city and postcode. 
For each new restaurant, the exact address of a location is provided through a web service provider (e.g. Google Maps). 
Burgers at each restaurant have a number of descriptors, which include the restaurant, the place where it can be eaten, numeric ratings (ratings from 1 to 10; 10 being the best), comments, and a photo. 
The site should let customers browse the most liked burgers and be able to see all the comments and ratings. 
The front page should display the latest added burgers and comments, the best burger of the month and show which burgers are near to the customer’s location. 

Exam: Part B - Questions
Reason on entities, relationships, cardinalities in the Entity-Relationship
Assume that in 
views.py
, you have created an 
add_burger
 
view. How do you define the URL mapping (in your 
urls.py
) to the 
add_burger
 
view using URL defined with a named URL pattern 
“
add_burger
” 
and with “
add_burger
/” URL? Hint: Use URL pattern matching 

Exam: Part B – Questions (
contd
)
Someone in your team has created the following template which is intended to allow users to add a new burger (
burger_form.html
) but your team member needs your help to complete the following: 
{% if reviews %} 
	<
ul
> 
		
<!-- (R1) -- >  
		
<div class="review"/> 
			{{
comment.text
}} 
			<
br
> 
			<div class="
profile_img
"> 
			{% if 
comment.user.picture
 %} 
				<
img
 
src
="/media/{{
<!-- (R2) -->
}}"/>
 
			
{% else %} 
				<
img
 
src
="{% static '
default.png
' %}"/> 
			{% endif %} 
		</div> 
		<div class="
review_right
"> 
			{{
comment.user
}}<
br
> 
			{{
comment.date
}} 
			
<!-- (R3) -- > 
			
{% 
endfor
 %} 
		</
ul
> 
{% else %} 
	<strong>No review currently in {{
burger.name
}}.</strong><
br
> 
{% endif %}
 
What do you need to insert 
at point R1
 such that the for-loop is complete?

Exam: What is covered
In short, everything
We assume you know and understand material covered in lectures
We also assume that you have completed the 
TwD
 book. You should know and understand how to write Python code for a Django app, especially models, templates, views.

Exam: Hints and Tips
Plan your time!
40 marks in 60 minutes
Marks for each question should give you an idea how long to spend on each question
Don’t spend ages on a question that is only worth 2 marks!
Carefully read the question (and MCQ answers!)
Make sure you answer all the questions before submitting!

Past exams
There is a past exam on Moodle under “Course Resources”
Note that this exam is a bit older, therefore there are more questions on both parts of the exam (mostly Part A)
It is good practice though!
There is a mock exam on Moodle under “Course Resources” that you can try out! 
This is in the same environment as your final exam

Questions?
Let’s move to Menti 


