---
title: Git aliases
date: '2024-03-11'
tags: ['git', 'productivity']
draft: false
summary: Some useful git aliases I use
---

This is a short post about the git aliases I have defined in my [dotfiles repository](https://www.github.com/marcelblijleven/dotfiles).

## Defining aliases

For most of my aliases I use the `git config --global alias.{name}` option, but for some of the more frequently used ones I also have a 
shell alias because they are shorter. Whenever you add an alias through the git configuration, that alias will be stored in "$HOME/.gitconfig"

## Aliases

### Adding files to git

For adding files to git I only use a shell alias. This way I can add a file using `ga <filename>`.

```shell
alias ga="git add"
```

### Viewing the repository status

Since I use `git status` a lot I've created the alias `gs`. This shows me all the modified, deleted or added files in the repository.
The `-s` flag makes the output shorter.

```shell
alias gs="git status -s"
```

### Viewing the branches

Sometimes I want to see which branches I have locally and remotely, which is why I've created the alias `git branches`.
The `-v` flag makes the output more verbose so you'll see the latest commit too. The `-a` flag inclused branches from the remote.

```shell
git config --global alias.branches 'branch -va'
```

### Committing

#### Regular commits

For a regular commit I use either `gc` or `git c`:

```shell
git config --global alias.c 'commit'
alias gc="git c"
```

This will open your editor so that you can provide a nice commit message, but since this can be distracting I normally use the `-m` flag
to provide a commit message in-line.

```shell
git config --global alias.cm 'commit -m'
alias gcm="git cm"
```

Example usage: `gcm "feat: add user metrics to dashboard"`

#### Amending

When you want to add currently staged files to an existing commit, you can use the alias `git amend`.

```shell
git config --global alias.amend 'commit --amend'
```

#### Temporarily committing everything

If you want to temporarily commit everything so that you can come back later, you can use save points with the alias `git save`.

```shell
git config --global alias.save '!git add -A && git commit -m \"WIP\"'
```

This will add everything with changes and commit it with the commit message "WIP". When you're ready to 
continue work, you can undo this commit using the alias `git undo`.

```shell
git config --global alias.undo 'reset HEAD~1 --mixed'
```

This reverts the last commit, which is your save point. The `--mixed` flag also unstages your files (this is the default
behaviour).

### Switching branches

Switching to an existing branch with the alias `git co`.

```shell
git config --global alias.co 'checkout'
alias gco="git co"
```

Switching to a new branch by adding the `-b` flag for the alias `git cob`.

```shell
git config --global alias.cob 'checkout -b'
alias gco="git cob"
```

### Updating the local branch

This alias will update the local branch and rebase local commits on top of any incoming commits. The `--prune` flag removes any 
remote-tracking references that no longer exist on the remote. This alias is called `git update`. 

```shell
git config --global alias.update 'pull --rebase --prune'
alias gup="git update"
```


### Pretty things

#### Logs with graph

This will print the commits with a pretty graph using `git logp`.

```shell
git config --global alias.logp "log --graph --pretty=format:'%Cred%h%Creset %an: %s - %Creset %C(yellow)%d%Creset %Cgreen(%cr)%Creset' --abbrev-commit --date=relative"
```

Example output:

```shell
* 3d7103b Marcel Blijleven: style: move tags below title -   (5 weeks ago)
*   97de6f6 Marcel Blijleven: Merge pull request #18 from marcelblijleven/feature/page-component-object-model -   (5 weeks ago)
|\
| * 56d805d Marcel Blijleven: blog: add post about page components -   (5 weeks ago)
| * 5fa346a Marcel Blijleven: chore: update mdx components -   (5 weeks ago)
|/
* cb02c70 Marcel Blijleven: sync: auto sync coffee -   (6 weeks ago)
* 8ce0f41 Marcel Blijleven: sync: auto sync coffee -   (6 weeks ago)
*   769f994 Marcel Blijleven: Merge pull request #17 from marcelblijleven/feature/discriminating-unions -   (6 weeks ago)
|\
| * 1df5938 Marcel Blijleven: chore: update tag data -   (6 weeks ago)
| * ebfa3c4 Marcel Blijleven: blog: add blog post about discriminating unions -   (6 weeks ago)
| * a141c12 Marcel Blijleven: style: increase space below headings -   (6 weeks ago)
* | 827a777 Marcel Blijleven: sync: auto sync coffee -   (7 weeks ago)
* | 3b026bf Marcel Blijleven: sync: auto sync coffee -   (7 weeks ago)
|/
* 2d6d063 Marcel Blijleven: chore: add badge component -   (8 weeks ago)
```

#### Better diff

This will print the diff with color, without + and - using `git bdiff`.

```shell
git config --global alias.bdiff '!git diff --color | sed \"s/^\\([^-+ ]*\\)[-+ ]/\\\\1/\" | less -r'
```

