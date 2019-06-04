#!/usr/bin/python3
## Example ./moveItems.sh 192.168.10.35 turnip test fname

from ftplib import FTP
import sys
import pdb

filename = str(sys.argv[4])

ftp = FTP(str(sys.argv[1]))
ftp.login(user=str(sys.argv[2]), passwd=str(sys.argv[3]))
ftp.cwd('items') # change into user dir

with open(filename, 'rb') as fp:
    ftp.storlines('STOR ' + filename, fp)
