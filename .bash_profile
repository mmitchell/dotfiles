# Prompt
PS1="\w ::: "

# Load the shell dotfiles, and then some:
# * ~/.env_vars can be used for other settings you don’t want to commit.
for file in ~/.{env_vars}; do
	[ -r "$file" ] && source "$file"
done
unset file

# Make sublime the defult editor
export PATH="/Applications/Sublime Text 2.app/Contents/SharedSupport/bin:$PATH"
export EDITOR='subl -w'

# Use global terminal colors
export CLICOLOR=1
export LSCOLORS=GxFxCxDxBxegedabagaced

# Add postgres to path
PATH="/Applications/Postgres.app/Contents/MacOS/bin:$PATH"

# MacPorts Installer addition on 2011-10-11_at_10:15:54: adding an appropriate PATH variable for use with MacPorts.
export PATH=/usr/local/bin:/opt/local/bin:/opt/local/sbin:$PATH
# Finished adapting your PATH environment variable for use with MacPorts.

# Ruby Version Manager
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm" # Load RVM into a shell session *as a function*
