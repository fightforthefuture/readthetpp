# Read the TPP

This project is licensed into the
[public domain][01] and free to use for any purpose. Read this doc for
instructions on contributing. Please also submit an
Issue or Pull Request if you notice something wrong in the TPP text. Errors or
ugliness may have popped up during the process of turning the entire TPP into
Markdown.

## Help us add annotations!

The site is still very much a work in progress and everyone is welcome to
contribute. To add an annotation, simply select a block of text in one of
the [chapters](https://www.readthetpp.com) and click on the annotate icon
that pops up. This functionality is powered by [Genius](http://genius.com/).

## Development

### Frameworks and libraries

* [Jekyll][02]
* [Grunt.js][03]
* [Liquid templating language][04]

### Installing & running the server

* Install/switch to Ruby 2.2.2 (i recommend [rbenv][05])
* `gem install bundler` if it’s not already installed
* `npm install` to install packages,
* `npm start` to run grunt (compiles assets, then watches for changes and
compiles those too.)

### Deploying

This site is automatically deployed using [a shell script][06] and
[travis-ci][07]. To set up a fork, follow these steps:

* Edit `CNAME` to reflect your domain and TLD.
* Enable Travis-CI for your github repo
* In Travis settings, create an env var called `GH_REF` with a value of
github.com/USERNAME/REPO.git
* Create a Personal Access Token at <https://github.com/settings/tokens>
* In Travis settings, create an env var called `GH_TOKEN` and paste in your
token, taking care that "Display value in build log" is set to off.

_(note: if you do not yet have a CNAME, remove `cp ../CNAME ./CNAME` from
deploy-ghpages.sh)_

### Code structure

#### The TPP chapters and site content

All of the TPP chapters and site content are stored as Markdown files in `site`!

#### JavaScript:

`site/_js/main.js` contains the main page logic.
This all compiles down to `dist/js/core.js` via grunt, which also uglifies it.
If you’re adding a javascript file, make sure to add its path to the files
array around L169 of `Gruntfile.js`

#### CSS / Less:

```
app/_less
├── base
│   ├── common.less
│   └── variables.less
├── components
│   ├── CTA.less
│   ├── animation.less
│   ├── histogram.less
│   └── typography.less
├── core.less
├── lib
│   └── reset.less
└── partials
    ├── content.less
    ├── footer.less
    ├── header.less
    ├── nav.less
    └── share.less
```

* All Less files compiled and minified to `dist/css/core.css`
* When in doubt, make a new Less file and import it in `core.less`—there’s no
real performance hit as a result of good organization
* Don’t worry about browser prefixes. Grunt handles that too.


[01]: http://unlicense.org/
[02]: http://jekyllrb.com/docs/home/
[03]: http://gruntjs.com/getting-started
[04]: https://github.com/Shopify/liquid/wiki/Liquid-for-Designers
[05]: https://github.com/rbenv/rbenv
[06]: https://github.com/fightforthefuture/bigsurveillance/blob/master/deploy-ghpages.sh
[07]: https://travis-ci.org/fightforthefuture/bigsurveillance
