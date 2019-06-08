#!/bin/bash

inotifywait -mr /home/worlds/players/ -e create -e moved_to |
  while read path action file; do
    echo "The file '$file' appeared in directory '$path' via '$action'"
    python3 main.py $path $file
  done
