<img src="https://raw.githubusercontent.com/amanmalali/pipui/master/images/pipui.png" width="200" height="100" />
pipUI is an open sourced graphical user interface for pip; the python package installer. This application lets you see which packages are already installed and allows you to search and install new ones. This application can be run on Windows and Linux systems alike and also supports virtual environments.
No more having to fumble through multiple pip commands to get a simple job done. 

# Description
In order to make things easier for the average user, we aim to create an open-sourced graphical interface for pip. Some of the main features of this project are mentioned below:
* Install packages system-wide or in a virtual environment.
* Lists all the packages currently installed in the system or virtual environment.
* Allows users to install/update/remove packages without having to write any pip commands
* Notifies users of any new updates for packages.
* Can auto generates a requirements.txt file with the click of a button
* Can install packages from a given requirements.txt file.

# Getting started:
The following instructions will guide you in setting up this application on your system.

## Prerequisites
* python 3.6+
* python-pip
* Virtualenv (Optional: for virtual environment support)

## Installation
pipUI works in both Windows and Linux operating systems.

To install pipUI for Linux:
* Download the .deb file from PLACEHOLDER
* Run ```$sudo dpkg --install package_name.deb```
* You can either launch it from the the command line ```$pipui``` or from the app launcher of your distro

To install pipUI for Windows:
* Download the executable from PLACEHOLDER
* Run the .exe application from the downloaded folder

# Screenshots
Basic application          |  Installing a new package
:-------------------------:|:-------------------------:
<img src="https://raw.githubusercontent.com/amanmalali/pipui/master/images/disp_img1.jpeg" width="500" height="500" />  |  <img src="https://raw.githubusercontent.com/amanmalali/pipui/master/images/disp_img3.jpeg" width="500" height="500" /> 

# Built with
* Python
* Electron
* Fast-Autocomplete
