import Worldcmd

def DoCMD(cmd):
	if cmd.split()[0] == 'help':
		Worldcmd.help()
	elif cmd.split()[0] == 'LoadKeys':
		Worldcmd.LoadKeys()
	elif cmd.split()[0] == 'GenKeys':
		Worldcmd.GenKeys()
	elif cmd.split()[0] == 'Encrypt':
		Worldcmd.Encrypt(cmd.split()[1])
	else:
		print('Not a command')	

def GetCMD():
	return input('>')

# Main routine
# ------------
print('Worlds Tool Kit')
while True:
	DoCMD(GetCMD())
