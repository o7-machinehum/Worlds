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

sudo chown -R $player:$player ~/players/$player/

# NOTE: https://www.linuxquestions.org/questions/linux-newbie-8/500-oops-could-not-read-chroot-list-file-etc-vsftpd-chroot_list-4175426540/
