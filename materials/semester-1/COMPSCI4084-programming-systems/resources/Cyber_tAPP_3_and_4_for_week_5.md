# Cyber_tAPP_3_and_4_for_week_5

__Cyber tAPPs Week 5 \(Class 7 & 8\)__

Instructions: Work on problem 1 on your own to apply the concepts you learned in the pre\-reading material to solve problems\. Then discuss your code with your team members and present one solution as a team\. Follow the same process for problems\. Swap your team's solution with another team for feedback\. 

__Text File Processing__

__Problem 1 __

You want the __top attacking IP__ from security\.log where ALERT lines contain IPv4 addresses\.  
A student runs:

grep "ALERT" security\.log | uniq \-c | sort \-nr | head \-1

They get strange counts\.

1. Explain __precisely__ why the counts are wrong\.
2. Rewrite the __correct one\-liner__ that prints only the most frequent IP address and its count\.

__Problem __

You have created this security log file:

cat > security1\.log << "EOF"

\[2025\-08\-26 09:15:23\] ALERT: Failed login from 192\.168\.1\.20 on host WIN\-SEC01 user=admin

\[2025\-08\-26 09:20:05\] INFO: User guest logged in from 10\.0\.0\.5 on host WEB\-SRV01

\[2025\-08\-26 09:22:44\] ALERT: Failed login from 172\.16\.0\.12 on host DB\-SRV03 user=root

\[2025\-08\-26 10:05:00\] ALERT: Failed login from 203\.0\.113\.77 on host MAIL\-SRV02 user=admin

\[2025\-08\-26 09:30:01\] INFO: User alice logged in from 192\.168\.1\.45 on host WIN\-CLT07

\[2025\-08\-26 10:05:00\] ALERT: Failed login from 203\.0\.113\.77 on host MAIL\-SRV02 user=admin

\[2025\-08\-26 09:45:33\] ALERT: Suspicious activity from 203\.0\.113\.77 on host MAIL\-SRV02

\[2025\-08\-26 10:05:00\] ALERT: Failed login from 203\.0\.113\.77 on host MAIL\-SRV02 user=admin

\[2025\-08\-26 09:50:17\] INFO: User bob logged in from 192\.168\.1\.100 on host WIN\-CLT09

\[2025\-08\-26 10:05:00\] ALERT: Failed login from 203\.0\.113\.77 on host MAIL\-SRV02 user=admin

\[2025\-08\-26 10:00:55\] ALERT: Failed login from 198\.51\.100\.23 on host APP\-SRV05 user=admin

EOF

You think that the log file contains the IP address which is the source of a brute\-force attack \(the top with the highest count\)\. 

1. Write a one\-line command to show the top attacker\.
2. Now, write a command to show the top 3 attackers\.

__Problem:__

If this code is run, there will be no output\. Why?

![](data:image/png;base64,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)

Now, write a command to show the top 3 attackers\.

__Problem 2 __

Scenario: You are tasked to list unique usernames involved in alerts \(format: user=alice\)\. The output should be alphabetically sorted without duplicates\.  


Reorder to a single correct pipeline:

A\. grep \-oE 'user=\[A\-Za\-z0\-9\_\]\+' security\.log

B\. cut \-d'=' \-f2

C\. sort

D\. grep "ALERT" security\.log

E\. uniq

Write the final pipeline line\.

__Problem 4 __

Given this output:

   3 192\.168\.1\.20

   1 172\.16\.0\.12

   1 198\.51\.100\.23

Circle the __single__ command that most likely produced it:

a\)

grep "ALERT" security\.log | grep \-Eo '\(\[0\-9\]\{1,3\}\\\.\)\{3\}\[0\-9\]\{1,3\}' | sort | uniq \-c

b\)

grep \-c "ALERT" security\.log

c\)

grep "ALERT" security\.log | sort \-n | uniq

d\)

grep \-Eo '\(\[0\-9\]\{1,3\}\\\.\)\{3\}\[0\-9\]\{1,3\}' security\.log | head \-3

Explain why the chosen command fits the output formatting\.

__Problem 5 __

Incident responders ask: “Across __all rotated logs__ in /var/log/app/ \(e\.g\., auth\.log, auth\.log\.1, auth\.log\.2\.gz\), which __username__ attempted the __most failed logins__ \(lines contain Failed password for user=<name>\)?”  
Constraints:

- You must search __recursively__\.
- You must __support compressed \.gz logs__\.
- Output should be __“COUNT USERNAME”__ with the __top__ result only\.

Write a __single pipeline__ using standard tools \(zgrep or grep \-a \+ zcat/gunzip \-c, etc\.\) that satisfies the constraints\. Indicate any assumptions\.

__Catching Bugs with Compiler Warnings & Secure Coding Practices__

__Problem 1 — Debugging Warning__

int z = 0;

if \(z = 10\) \{ printf\("z is 10\\n"\); \}

Compiler warning: *“using the result of an assignment as a condition”*\.

What’s wrong?

Fix it\.

__Problem 2__

int x, y=5, z;

z = x \+ y;

Why is the result unpredictable? What warning flag would expose this?

__Problem 3 __

Why is it good practice to always compile with \-Wall \-Wextra \-Werror in security\-sensitive__ __code?

__Problem 4 __

Student code:

char buf\[10\];

strcpy\(buf, input\);

Why is this unsafe?

Suggest a secure rewrite\.

