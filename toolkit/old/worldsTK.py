#!/usr/bin/python3

import worldcmd

def DoCMD(cmd):
	if cmd.split()[0] == 'help':
		worldcmd.help()
	elif cmd.split()[0] == 'LoadKeys':
		worldcmd.LoadKeys()
	elif cmd.split()[0] == 'GenKeys':
		worldcmd.GenKeys()
	elif cmd.split()[0] == 'Encrypt':
		worldcmd.Encrypt(cmd.split()[1])
	else:
		print('Not a command')	

def GetCMD():
	return input('>')

# Main routine
# ------------
print('Worlds Tool Kit')
while True:
	DoCMD(GetCMD())
