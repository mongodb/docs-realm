Realm Backend Tutorial
======================

Hi! My name is ...., and I'm one of the developer educators here at MongoDB. 

In this tutorial, I'll walk you through the first of the Realm tutorials -- the 
Backend for the Task Tracker app. This video follows the steps in the tutorial, 
so you can follow along as I walk through it.

There are 5 steps in this tutorial: we'll start by creating a free Atlas account,
set up a free Atlas cluster to hold our data, install and then configure the Realm 
command line tools, and finally upload a pre-configured backend Realm app. 

So let's get started.

.. <time tag 1> <see https://www.emergingedtech.com/2017/01/how-to-add-time-tags-to-youtube-video-jump-to-tagged-sections/>

First, open your browser and go to **account.mongodb.com**.
On the logon page, click "Sign Up". Of course, if you already have an Atlas 
account, you can skip ahead to the next section. On the next page, you can 
enter in your information, or -- if you already have a google account -- you can 
save time by logging in with that account. I'm going to go ahead and do that:

.. <time tag 2>

Now that we have an account, let's set up a cluster. An Atlas cluster is 
managed service that is hosted in Microsoft Azure, Google Cloud Platform, or 
Amazon Web Services. For this demo, we'll set up a free Atlas cluster in 
AWS.

In the "Shared" section, click ``Create``.
The default settings will create a cluster in an AWS M0 sandbox running on servers 
in Virginia. The cluster will run MongoDB version 4.4, and the name of the 
cluster will be "Cluster 0." You can leave everything on this page at the default 
settings and then click "Create Cluster". 

.. You'll note that I changed the location ... maybe I'll re-record this to keep it simple.

It takes 1-3 minutes to set up the cluster, after which the Atlas page refreshes.
While the cluster is being set up, we can install the Realm CLI -- the command-
line tools that we'll use to simplify the backend setup. 

.. <time tag 3>

First, open a terminal window.
Type in ``npm install -g mongodb-realm-cli`` and hit enter. This command uses 
``npm`` to globally install the Realm CLI, so you can run it from any location.
When the installation is complete, return to the Atlas web page.

When the cluster creation is complete, you will see Cluster 0 listed. Near the 
top of the page, find the ``Access Manager`` menu. Click on that, and then choose 
"Project Access". 
Click on the ``API Keys`` tab, and then click on this ``Create API Key`` button.

For the Description, let's add a name that will remind us -- and others -- why 
this key was created. I'll type in "API Key for Ream CLI". 

For Project Permissions, we want to give the CLI tools Project Owner permissions 
and remove the read-only permissions.

Click Next.

This next screen shows us the new key pair that's been created -- the public key 
and private key. We gave the CLI full control, which means we need to keep our 
secret key truly secret. This is the last time we'll see the private key, so copy 
it now and save it somewhere that you can find later...but not in public place
like a screencast that will be shared with the world.

Finally, click the ``Add Access List Entry``. This allows us to restrict access 
to one or more IP addresses, so even if someone got a hold of the private key, 
they won't be able to access your Cluster unless they are within the range of 
allowed API keys. 

In the dialog, click ``Use Current IP Address``, and you'll see your current IP 
address in the filled it. Click Save.

Note that this restricts access to the IP address you are on right now. If you 
will be working on this tutorial from multiple locations, you will want to specify 
a range of IP addresses by using CIDR notation. If you need to, pause this video 
and look up CIDR notation. A useful tool I've found is https://cidr.xyz/, in which 
you can enter the range of IP addresses you need to support and get the 
appropriate CIDR notation. 
.. *** Question for reviewers: is it OK to refer to a site we don't own??? I don't 
   feel great about it, but I also don't want to leave people confused and 
   wondering what to do. 

Click ``Save``, and then click ``Done``. You are now ready to use the CLI tools.

.. <time tag 4>

Switch back to your terminal window, and type in the ``realm-cli login`` command. 
I've chosen to copy-and-paste the command from the tutorial. And since 
I copied my keys into a VS Code window, I'll paste those in as I enter the 
command.

If you enter everything correctly, you'll see this nice message:
.. (on screen, no need to say it)

.. <time tag 5>

The last part of this tutorial is using these CLI tools to import a pre-built 
Realm backend app, greatly simplifying the time it takes to set it up. So let's 
download that app configuration and upload it to our Realm cluster.

First, we'll use ``git`` to download the app configuration. I'm going to make 
a new directory to store these files and switch to it.

From this directory, let's clone the git directory. This command is 
in the written part of the tutorial and it might be easier to copy-and-paste it 
from there, rather than try to copy from this screencast.

.. git clone https://github.com/mongodb-university/realm-tutorial-backend.git

We now have a directory named ``realm-tutorial-backend``. Let's switch to that, 
and we're ready to import this app to our cluster. 

Type ``realm-cli push``. When the push is complete, you'll see this message. 
Let's switch back to our browser. When the app has finished being created, you 
can click on this ``Realm`` tab, and you'll see we now have a new "tasktracker" 
realm app. You can click on the name to open the management console for the app.

.. <time tag 6>

Spend some time looking around. Here are a few things you can explore to make 
sure the app imported correctly:

- The Schema section of the Realm UI displays information about the structure 
  of the data stored in our linked Atlas cluster. We're using 2 objects in 
  this tutorial -- Tasks and Users. Click on each and you can see the data 
  structure defined for each type.

- In Authentication, you'll see the different ways that users can log into a 
  Realm app. For the  Task Tracker app, users can only log in via 
  "Email/Password" authentication.

- The Sync section shows us how Sync has been configured, and what the partition
  key is. You'll learn more about this as you build the front-end.

- The Functions section contains the Task Tracker app's executable backend logic.

- The Triggers section shows one trigger, which defines certain 
    criteria that, when met, execute a function.

Take a look at the last section of the tutorial for details on what you're seeing 
in each of these sections. 

You're now ready to work on a client-specific front end! 








