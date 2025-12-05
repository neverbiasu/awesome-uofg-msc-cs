# ProgSD_Mock_Final_Lab_Exam_

# Programming and Systems Development  
Final Lab Exam – Mock Unix \- __Total Marks:__ 40

__Unix Exam Mock paper __\(there is no past paper because it is the first time we have the Unix Exam\.__ Note: A typical exam paper will also include some examples of expected outputs\)__  


You should create a single bash script file and write the commands for each task in the same bash script file\. You should name the file your\_name\_unix\_task\.sh \(fill in your own name\)\. It is expected that once the bash script file is run, it will automatically perform all the tasks\.

##  Orientation & File Processing \(Total marks:14\)

You are provided with a file named __server\_access\.log__ containing connection records\.

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

__Important__

- Do *all* work in a directory called __unix\_practice__ under your home directory\.
- Use the exact filenames and formats specified\.
- Only use sudo where explicitly stated\.
- Some tasks want __only command outputs__, others want __command \+ output__ \(read carefully\)\.

\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-\-

### Task 1a: Navigation and Basic Redirection

1. Download and copy the file __server\_access\.log __to your home directory in the Linux remote server: __10\.224\.160\.71\. __ __\[1 mark\]__
2. Create a directory named __unix\_practice__, move the log file into it, and inside create a file called __student\_record\.txt__ containing exactly three lines:

Name: YourName

ID: YourStudentID

Example: ![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAvCAYAAAC40LUXAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA4fSURBVHhe7Z1RaBxV24Cf7///Sp3WVmNGaHW1xuqwtjZgg+6AmBUvmi2kVcjWC8lWghBTghfmYjfSSrwxm4sUIiW6N6W2FGwSr5RuoUhXqe4qaWVr27DWKjJQL8a2VOgQ8OL/Lr45h5nZs5tNmob0yzxw0J7z7mTm7HnPed93znn3X2vXrv1/QkJCfPxPsCIkJCRUjJAQJaFihIQo+Fc9H6Ojo4NMJhOs9hGPx+X/53I5DMPwtVuWxdWrVzlx4gQzMzO+toWg6zqdnZ288sorRCIRALLZLKdOnQqKAmCaJrt372bbtm1omgZAuVwmn88rPxONRtm7dy9PPfUUuq6D+wxnzpzh8OHDQXF0XWf79u3cunWLYrEIQDqdJpFIUKlU6O3t9cmr+kigkvdimiY7duxgw4YNGIZBPp9nZGREthcKBZ98Lfr6+uR3oes6AwMDVc978eJF37VXGnVXjFu3blGpVKhUKliWBYDjOLKuUqkEPwKAbduyPRKJEI/HGR0dxTTNoOi8ME2TyclJUqmUVIp69PT0MDw8TCwWA3fg2bZNa2srmUyGjo6OKvnR0VFisRi6rkv5SCRCKpWiv7/fJy8+k8lk2L17d7CpLpZl+fqxUqnw559/BsXAHby5XI7h4WHi8TiGYWBZFrZtB0WhxrWFrGVZPqU4ePCg73ktyyISiZBIJMhms4ErrxzqKkaxWKS3t5fe3l6OHz8ObseKulqz2/T0tGxPJpOUSiU0TePAgQNyVloI69evx3EcSqUSg4ODNRVT8MwzzwAwNTXFzp07ffcDkEgkAp8ATdMoFAokk0kpn8/nAXjxxReD4mzcuBGAmzdvBpvqcvz4cV8/9vb2MjQ0FBSTg9cwDGzb5ujRoySTSbq7u5UrGDWuPTs7C8CZM2ekXGdnJ5FIBNu25fN2d3czPj4OQCwWIxqNSvmVRF3FWAxs2yaTyVCpVNA0jZ6enqBIw5w7d46dO3eSyWSk2VKPTCZDNpvl0KFDvnphcjz99NO++sOHD9PX18fQ0JBvNi6XywA8/PDDHun/0NTUBB6ZxWZgYIBIJEKlUmHfvn0cPny45kpRi2g0KlfYL7/8UtaLSerSpUu+a05MTMh/P/HEE7J+JXHXFUPw9ddfA7B161ZZVygU5iy5XE7Kz3dAAEo/QiB8Di8qP2jdunUAXLlyJdgkB9y5c+eCTXMSjUbp6OioOStHo1FisRiO47B///45n1+YTbdu3fLV79q1C1zlVSn8hg0bZB2uwui6juM4C3qu/waWTDHEEu71DYJ2sKrUsrvvBDHQ5zLFcP2at956C8dx+Pzzz31twkexbXvOQRskk8nwySefyP/mcrkqH+zVV18F4MKFC2zevJmxsTFOnjzJ5OQk2Wy2yiwVZlNwNW1rawPFqnbq1CkKhQKGYZDL5Uin06TTacbHx3Ech6mpqXk/138LS6YYqg4O2sGqorK77xQx4H7++edgE7gzdX9/P2NjYwwPD3PlyhUGBgaqBtzmzZsBuHbtmq++ESqVCvl8nlKphOM4GIZR5YM99thjAMzOznLgwAE2btzI9evX0XWdWCzG+Ph4lXIEMU1TynjNKMHQ0BDZbJampiYSiQSJRIIbN24wMDBQ04dZCSyZYiwXOjo6MAwDx3E4ceJEsBncwdTV1UVrayu4DrYwR7yIgTsfxThy5Ah9fX309vYyMjJCJpNh79692LaNpmm88cYbUvahhx4CYMuWLXz88cfS6R4cHMRxHHRd98mr2LFjByjMKMHQ0BCZTIbZ2Vny+TyFQoGmpiZGR0fvyB+811lRimGaJu+++y64A1Q1UHCd8Hg8TjKZZHx8nNnZWRKJRNXq9eijj4LCRKlHsVis8mNs22Z6ehoUAQFc59jrKxWLRb755hvwKGcttmzZAjXuMZ1OE4/HKZfLdHd3MzIywtDQEPv27eP27dukUqmqkPZKYckUY8+ePRAwqYKOtqp4ne87wTRNDhw4gKZpHD16lImJiaBIFbZtMzExwXvvvQfuy0yvoyz8pTfffJNcLieLsOkjkUjD9//7778DsHr16mCTDC97EfJiVVExlxnV0tICIMPRAq+iilVzpbFkiiHs+kuXLsm6oKOtKovhfKfTaYaHh6VSzNd29jrXInzpdZQjkQiGYcgiBqOmab633GNjYxQKBdLptKwTPPvsswC+5xXvRlSDUyUfZC4zKqQ2d10xdF0nm80q7fqgo60qQfNlPpimybFjx0gkEliWxeDgYF2lEGHKIP39/bJehC+LxSLxeFxZxAxcqVR8W2ZEuLetrc238pimyQsvvADA5cuXZf0vv/wCQHt7u08RvfKq1URQz4zCo3iJRML33KZp0t7eDjWCJiuBunulRKgSd/aLRCI4jiO3h+AOboHYB2TbNjdu3ACQM6YI/9UbmHPhvR/cmVrTNCzLwnEccH2H4J4l3C9Y3JOXH374Qd5Tf38/XV1dvuuJvwE0vNrU2iulu2+xhQkmwsWij0qlUtXetGPHjs1LXmCaJsPDwwAkk0nlAI9Go4yOjqJpmu97Fde3LIvu7u7Ap1YG/3vffffVnJK3bt3Ka6+9RnNzM+vXrwdg1apVNDc3y3LkyBEp39nZSXNzM2vWrJHtlmXx008/cfDgQU6fPu25+vzx3k9zczOrVq0Cd6uIqJuenubXX38F4KWXXpLOrPeevOXatWt89913AGzatIl169bR0tIi2//55x8uX77MkSNHmJyc9NxNbcTfvX79Ol999ZWsdxyHs2fP8sADD/Dggw/y+OOPyz76/vvv+fDDD33XATh79iyPPPIIa9as8cmfPn2ajz76KCguefvtt9m0aRPlcpkvvvgi2AzAX3/9xfnz52lubmbt2rVV95PNZuUEsdKou2KEhKxU7rqPERJyLxIqRkiIglAxQkIUhIoREqIgVIyQEAWhYoSEKAgVIyREQagYISEK6r7g826pCKaoEds/gvWCsbExufltamqq6tw1gVQyXhnvZ70pYrz3U4vgNoz5oEptYy1y+p/lSq1UScEUPSuFhlcM72a4RmhtbZXbCVRnDIJ4ZeaStz3peYKl3m7TRvFeP7KI6X+WM95USZVKZcVuBRE0rBjbtm1T7jxVIc5e/Pjjj1iWpdw27cW2bakMpmmiaZpy05vAm54nWO5kN67gbqX/Wc54UyX19vb6NoquRBpSDMuy0DSNzs7OYJMScVbg8uXLXL16FTzKomJ6ehpN0zBNk5dfflnWLQfsRUz/E3Lv0JBiXLx4Edu2lQnHVIhzABMTE/J8gVAWFeK8wPbt22lpaal5fmC+BE8DqkqjJ+xU6X8E6XSayclJ3zXrTQRB+WPHjt0zCicOWxUKBU6ePEkul6t57x0dHfJgVk9Pj3zmkydP1l3Zl0P/NKQYuCfvDMOomQNJEI1G0d10j3jS5ghlqUW5XOa5557DMAxl/qaFEPQ/VKVRn0SV/gc3KCEO+lTcFJeGYbBv3z7llxmUr7h+TCqVUp7sW27cvHlT3vft27cxDINUKlV3gmlpaSGVSjE7OytX3ng8rlSO5dI//xesqMWJEyeIx+Ps2rWrbnRGHGH97bffwOPICqWq9dkrV67Q1dUF7ik5YVKpaGtrU34RwWhU8N93gsrnMU1T5sUdHByUB6TEgaeuri7fwaY9e/YQi8WwbZsPPvhA9oU4j97e3r6gTINLSXAwR6NR3n//fQzDYM+ePcqz9IZhMD4+LttEBEycQhQsp/5peMWYmZnBsix50L8Wwon+9ttvZZ1QEqE0KsSRUdu2q/I3BdF1HcNzxlqUpUYob7lc9t3zoUOHcBwHTdN8WTaef/55cEOg3gmiWCxy4cIFNE1j+/btsv5eYGZmhosXLwLw5JNPBpvB9VG9CiPC++JkpGA59U/DioFrTui6XjeligjTegeK8BnqhWHFGepkMhlsqiKfz1eds55vOHkxEFk2VHmlRFRHJH3Gk9EjlUpV+Tpi5Vnu9PT0kMvlfPcuzofXotHQ73Lqn3kphkjBUmsQeh1ObzqZ119/HWpku7ibBDtXVVQmmQpV+p+FUiqVyOfzyvLHH38Exe8KpmnKPqiHSNODa0alUikM92cIvL7GYrIc+mdeimHbNqVSyfcjLF5E5EmkjVGZOfWiNYtN0NFWlUadb1X6H2EielcFgXDSvauJyMpx8+ZNRkZGlKWWD7bYeFd0VUBFZHH/+++/ZZ2YEAcHB+nu7pbvPBYrtL6c+mdeigFw/vx5mTEkiIg89fX1VZk5U1NTMEfYdrEJvvxTlaAzGaRe+h/hR7W2tvreivf398vMG97tMmJ2bm9vV0aslhph4r7zzju+F5c9PT3obrZz1XYfkWwCd+WZy+9slOXUPw1HpQQTExMkk8mqN8AiTGvbtlKrz507R1dX15xh20aoFZXCTUA212CfC+/1xWon0v8EncJSqUQsFmN4eFiGIsWkISYDwalTp4jFYsTjcVKplEzVg7vKXr16tea9e/cy1TJl58unn37K6Ogora2tfPbZZ1iWRVNTk/xuvRlgcFdgwzCkrHjWfD4vE0K3tbVx8ODBOQMoKu6kfxabea8YBMwJgTA1xJvuIMViEdu20XVduXTPh1pRKcMwqn7rYSF4r29ZFoVCoWb270wmQz6fl+8vIu6PvGSzWaW8yC4uZmvxd1QrsBdhri3mVo2ZmRkGBgZk0jbDzaJYLpfJZrNVodf9+/f7ZFevXk0+sMlQ13WZamkhLLR/Fpu6u2tDlg9iZ3G9JGshi8eCVoyQpef++++HBfzWX8jCCBXjHkGYiIu1jyykPqFi3GMsVRx/pRMqxj1EpVJRRvxCFp/Q+Q4JUfBvhU9UezuJbAEAAAAASUVORK5CYII=)

__\[2 marks\]__

1. Change directory into ~/unix\_practice\.  
__\[1 mark\]__
2. Display all files including hidden ones and redirect the listing to a file named __dir\_overview\.txt__\.  
__\[1 mark\]__
3. Show lines 11–20 \(inclusive\) of server\_access\.log using any appropriate command and redirect to __segment\.txt__\.  
__\[1 mark\]__

### Task 1b: Log Filtering and Counting

1. Extract all lines containing the word __FAILED__ \(case\-insensitive\) into __failed\_attempts\.txt__\.  
__\[2 marks\]__
2. From that file, extract only usernames \(use text tools or regex, assuming the username appears after user=\) and save to __usernames\.txt__\.  
__\[3 marks\]__
3. Count how many times each username appears, sorted from least to most frequent\.  
Save both the command and its output to __fail\_summary\.txt__\.  
__\[3 marks\]__

## Section 2: Users, Permissions, and Processes \(16 marks\)

### Task 2a: Ownership and Permissions

1. Create a text file named __maintenance\.log__\.  
__\[1 mark\]__
2. Give the file permissions rw\-r\-\-\-\-\-\.  
__\[1 mark\]__
3. Display details with ls \-l and redirect that output to __perm\_check\.txt__\.  
__\[1 mark\]__
4. Create a group __Netops__ and a user __analyst__ \(if they do not exist\)\.  
Append the exact command lines used to create both to __perm\_check\.txt__\.  
__\[3 marks\]__
5. Change ownership of __maintenance\.log__ to analyst:netops\.  
Then try appending a line to the file as your current user — capture the resulting message \(success or error\) and append to __perm\_check\.txt__\.  
__\[2 marks\]__

### Task 2b: Process Monitoring

1. Launch three background jobs:
	- ping \-i 2 localhost
	- sleep 1500
	- yes testing  
__\[1 mark\]__
2. List all active jobs with their PIDs and redirect to __job\_monitor\.txt__\. __\[1 mark\]__  
Identify and append the PID of the yes testing job to that same file\.  
__\[1 mark\]__
3. Suspend or terminate the yes process using a suitable command and log both the command and confirmation message into __job\_monitor\.txt__\.  
__\[2 marks\]__
4. Show that only the other two background jobs remain\.  
Include both the command and its output in __job\_monitor\.txt__\.  
__\[3 marks\]__

## Section 3: Archiving & File Investigation \(10 marks\)

You are provided with a compressed archive called __logs\_archive\.zip__\.

### Task 3a: File Investigation

1. Extract the archive into your __unix\_practice__ folder\.  
__\[2 marks\]__
2. Inside the extracted folder, identify file types using file \* and redirect output to __types\_report\.txt__\.  
__\[2 marks\]__
3. Search recursively within the extracted folder for any occurrence of the string __root@__ and redirect all matching lines \(with filenames\) into __root\_refs\.txt__\.  
__\[2 marks\]__
4. Display the first 16 bytes \(in hex\) of any file whose name includes “auth” and redirect both the command and its output to __auth\_hex\.txt__\.  
__\[2 marks\]__

### Task 3b: Compression

1. Create a compressed tarball of your unix\_practice directory named  
__studentID\_exam\_logs\.tar\.gz__ \(replace with your own ID\)\.  
__\[2 marks\]__

# Unix submission

Ensure your submission file is named exactly as it is supposed to \(i\.e\. __your\_name__\___unix\_task\.sh\)__ and that it contains the code for all of the Unix tasks\. It is expected that once the bash script file is run, it will automatically perform all the tasks\.

