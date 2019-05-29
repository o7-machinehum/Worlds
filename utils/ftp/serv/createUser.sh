#!/bin/bash

player=$1 # First CLI argument is the playername
pw="test" # Change Later

useradd $player
echo -e "$pw\n$pw" | passwd $player
mkdir -p /var/ftp/$player
mkdir -p ~/players/$player/items
mkdir -p ~/players/$player/exp

mount --bind ~/players/$player /var/ftp/$player
usermod -d /var/ftp/$player/ $player

sudo chown -R $player:$player $player/
