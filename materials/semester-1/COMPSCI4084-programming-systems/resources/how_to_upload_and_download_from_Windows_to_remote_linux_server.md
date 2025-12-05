# how_to_upload_and_download_from_Windows_to_remote_linux_server

# To download from the Linux server \(this is important – learn how to do this\):

Open your command line interface form the Windows computer, here is an example\. I have replaced my staff ID with your student ID

C:\\Users\\YOUR\_STUDENT\_ID>__scp \-r YOUR\_STUDENT\_ID@10\.224\.160\.71:~/mypackages C:\\Users\\YOUR\_STUDENT\_ID \\Desktop__  
The authenticity of host '10\.224\.160\.71 \(10\.224\.160\.71\)' can't be established\.  
ED25519 key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\.  
This key is not known by any other names\.  
Are you sure you want to continue connecting \(yes/no/\[fingerprint\]\)? __yes__  
Warning: Permanently added '10\.224\.160\.71' \(ED25519\) to the list of known hosts\.  
YOUR\_STUDENT\_ID@10\.224\.160\.71's password:  
  
C:\\Users\\__YOUR\_STUDENT\_ID__>scp \-r __YOUR\_STUDENT\_ID__@10\.224\.160\.71:~/mypackages C:\\Users\\__YOUR\_STUDENT\_ID__\\Desktop

  
mbb25j@10\.224\.160\.71's password:  
  
C:\\Users\\__YOUR\_STUDENT\_ID__>scp \-r __YOUR\_STUDENT\_ID__@10\.224\.160\.71:~/data\_analysis C:\\Users\\__ YOUR\_STUDENT\_ID__\\Desktop  
mbb25j@10\.224\.160\.71's password:

# To upload from Windows to the server:

Open your command line interface form the Windows computer, here is an example\. I have replaced my staff ID with your student ID\. I already had a folder called test\_upload\_folder, inside the folder, I have the “assessment\.docx file\.

To upload a folder

__scp \-r “C:\\Users\\YOUR\_STUDENT\_ID \\Desktop\\test\_upload\_folder” YOUR\_STUDENT\_ID@10\.224\.160\.71:~/testing/ __

To upload a single file:

__scp “C:\\Users\\YOUR\_STUDENT\_ID\\Desktop\\test\_upload\_folder\\assessment\.docx” YOUR\_STUDENT\_ID@10\.224\.160\.71:~/testing/ __

