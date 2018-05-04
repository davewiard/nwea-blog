# NWEA Blog Project

This is a project demonstrating the submission and retrieval of blog post
entries. Refer to the [https://github.com/nwea-techops/blogpostapi](blogpostapi)
repository on GitHub for deailts of the project.

## How To Use

### Clone Repository

Clone this repository into your own environment. Ensure the entire repository
content sits at the root of the web server. This is the simplest way to ensure
requests to /post and /posts are handled correctly. In Apache parlance, you
can create a vhost to listen on your port of choice with a DocumentRoot pointing
to your clone of this repository.

Ensure that your copy of blog.db **and** the containing **db** directory have
write permissions by your web server's service user. I learned the hard way that
PHP's PDO driver requires both of these to have write permissions for INSERT
operations to succeed. I don't understand why PDO require write permissions
on the containing directory but it does.

### Configure Web Server

You will need to have your web server configured to accept inbound PHP requests
and have it configured to load index.php when no file name is provided in the
URL. This will allow requests to /post and /posts to be handled correctly.

Ensure your PHP web server module has PDO support enabled. Mine initially did
not and I had to rebuild PHP.

## Development Timeline

### Thursday, April 12, 2018

#### 12:15 PM

I got a phone call and email from a recruiter asking if I'd be interested in a
6-month contract DevOps Engineer position with NWEA. After some discussion I
decided to go ahead with it. There were a few questions surrounding his ability
to represent me as I had recently been represented for a different NWEA position
by a different recruiter with a different firm. After that was all worked out
and after he spoke to the hiring manager with the client to determine if my
skillset really matched what they were looking for we got the representation
consent form filled out.

#### 1:45 PM

At about 1:45 PM I started looking into the project description and what it
would require. It is a somewhat trivial exercise but demonstrative of full-stack
development skills, nonetheless.

I read the entire project outline and started brainstorming ideas for how to
implement the project. I decided on the following:

* Bootstrap 4 for the presentation layer
* JavaScript/jQuery for the client-side data handling
* jQuery/AJAX promises for the data retrieval
* PHP back-end for handling all database interactions and data transformations

As my workstation is running Gentoo Linux with Apache already configured and
running it was an obvious choice. PHP was chosen for the back-end API because
Apache was already configured to handle inbound PHP requests to index.php files
without any modification or configuration changes needed. I considered Python
but I didn't want to take the time to configure Apache for Python when PHP was
already setup and ready to use.

I initially started by getting the base UI framework in place. I put together
the Bootstrap navbar, jumbotron, and input form first. Then I moved on to the
card-based blog entries. After I was happy with how the the card-based entries
looked I moved on to setting up some dummy JSON data that I could use as input
for the dynamically-rendered cards.

#### 2:30 PM

It was around to 2:30 PM when I decided to utilize a JavaScript template
framework instead of hard-wiring the HTML into my JavaScript. I picked json2html
and figured out the basics of rendering the HTML using my dummy input data.

#### 2:45 PM

I started working on the back-end PHP whipping up a simple database connection
using the built-in SQLite3 API but quickly realized that it didn't have the
capability of fetching all the records in a single result set in a format that
was easily converted to JSON. I would have to loop through each row and add it
to an array. I didn't like that so I decided to try the PDO interface. My
version of PHP didn't have PDO support compiled in so I added the "pdo" USE flag
and recompiled PHP. This took about 8 minutes. At the end of the build process
I had to restart Apache for the changes to take effect.

#### 3:30 PM

I now had a fully-functioning GET interface that could return the results to
the browser in JSON format but once the browser got the data it couldn't do
anything with it. I needed to adjust my templating code to now take place in the
AJAX .then() instead of stand-alone against the dummy data. I switched that code
easily enough and had a card being rendered with data pulled from the database.
I added a couple records to my copy of the blog.db manually so I could verify
that my code was indeed pulling all the records and displaying them properly in
the browser. I removed the hard-coded cards that I had originally set in place
for getting the UI behaving properly.

#### 4:00 PM

I re-read the project requirements and realized that I had not checked in any
code yet and that my endpoints were not pointing at the requested /post and
/posts paths.

So I set out to reconfigure Apache to redirect requests to my "php" directory
to the requested /post and /posts paths. I also renamed my original api.php to
index.php so it could be picked up automatically without the file name.

#### 4:30 PM

I began to document my timeline and thought process here, which I had planned to
do anyway, but to a lesser extent. After I had written up a lot of this document
I had to take a break. The rest of my family would be home and it would be time
for dinner.

#### 7:15 PM

I was able to break away for a few minutes to set up my GitHub repository initialize
my local repository.

#### 8:15 PM
I was able to step away for a minute or two again to add, commit, and push all my
files up to GitHub and update this timeline. I deliberately did not commit this
timeline as I felt it was incomplete and needed more content before I could
commit and push to GitHub.

#### 9:20 PM

I took a few minutes to adjust the content of this timeline and finally push the
first version of README.md to GitHub and call it a night. The POST handler and
some JavaScript/PHP cleanup are due in the morning.

### Monday, April 23, 2018

#### 10:30 AM

I got started on this project once again after more than a week away from it. I
started by revamping the PHP back-end code by adding a simple class-oriented
structure and replacing the monolithic top-to-bottom code with a class.

#### 11:15 AM

I finished the change to the PHP GET methods and got the PHP POST methods worked
out. The parsing of the POST request and subsequent population of the the class
properties was done and tested on the command-line.

#### 13:30

After lunch break I got back to working on this some more and had a bit of trouble
working out why the POST requests seemed to be failing silently. After much digging
I found a PDO method setAttribute() that allowed me to finally get an error message
back from my INSERT statement execution instead of a simple "false" value indicating
the INSERT failed. The blog.db file was not writable. Oops! In addition, I found that
the parent directory also needed to be writable for some reason. I'm still not sure
why...

#### 8:30 PM

I decided to come back to this project and get more of my code checked into GitHub.
I cleaned up the code and removed commented code and debugging statements before
committing and pushing my changes up to GitHub repo. I decided to add some quick
Android-style snackbar messages when a blog post was successfully submitted. At the
same time, I revamped the JavaScript code a little to make it more snackbar-friendly
and also added some checks to prevent submitting blank title and body texts.

#### 9:00 PM

After adding several test messages I started testing the responsiveness and paying
greater attention to the overall look-and-feel of the page. It just didn't look right
when there were multiple blog posts side-by-side so I switched it to always display
the posts in a single column which now looks much better. It is still using responsive
framework/techniques.

#### 9:30 PM

Split php/index.php into two separate files, one each for GET and POST functionality.
Adjusted my Apache setup to point to the new post and posts directories properly.
Fixed issue with post_id field not being used properly on blog post retrieval.

### Tuesday, April 24, 2018

#### 4:30 PM

I made adjustments to the directory structure for the database file permissions. This
required minor adjustments to the PHP source and updated documentation, as well.
