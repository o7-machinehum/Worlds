#!/bin/bash

# FTP Code
##  https://likegeeks.com/ftp-server-linux/
## We want FTP to be in passive mode. Meaning the connections are initiated by the client.

# sudo apt install vsftpd

systemctl start vsftpd # start the service
systemctl enable vsftpd # Enable it to run at boot time

cp vsftpd.conf /etc/ # Copy the configuration file
