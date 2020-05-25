#!/bin/bash

cat << "EOF"
                                            ,--,                             
                    ,----..              ,---.'|                             
           .---.   /   /   \  ,-.----.   |   | :       ,---,      .--.--.    
          /. ./|  /   .     : \    /  \  :   : |     .'  .' `\   /  /    '.  
      .--'.  ' ; .   /   ;.  \;   :    \ |   ' :   ,---.'     \ |  :  /`. /  
     /__./ \ : |.   ;   /  ` ;|   | .\ : ;   ; '   |   |  .`\  |;  |  |--`   
 .--'.  '   \' .;   |  ; \ ; |.   : |: | '   | |__ :   : |  '  ||  :  ;_     
/___/ \ |    ' '|   :  | ; | '|   |  \ : |   | :.'||   ' '  ;  : \  \    `.  
;   \  \;      :.   |  ' ' ' :|   : .  / '   :    ;'   | ;  .  |  `----.   \ 
 \   ;  `      |'   ;  \; /  |;   | |  \ |   |  ./ |   | :  |  '  __ \  \  | 
  .   \    .\  ; \   \  ',  / |   | ;\  \;   : ;   '   : | /  ;  /  /`--'  / 
   \   \   ' \ |  ;   :    /  :   ' | \.'|   ,/    |   | '` ,/  '--'.     /  
    :   '  |--"    \   \ .'   :   : :-'  '---'     ;   :  .'      `--'---'   
     \   \ ;        `---`     |   |.'              |   ,.'                   
      '---"                   `---'                '---'                     
                                                                             

Setting up the worlds enviornment. All scripts are prefixed
with wor_, you show now have access with wor_<tab><tab>
EOF

PATH=$PATH:$(pwd)/scripts

# Create a folder required for the engine
mkdir Worlds-Engine/items 2> /dev/null 
