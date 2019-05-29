#!/bin/bash
## Example ./moveItems.sh 192.168.10.35 turnip test *

HOST=$1
USER=$2
PASSWORD=$3
LOCAL='../../../Worlds-Engine/items'

ftp -inv $HOST <<EOF
user $USER $PASSWORD
cd items
mput $LOCAL/*
bye
EOF
