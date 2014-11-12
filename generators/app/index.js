'use strict';
var util = require('util'),
    path = require('path'),
    chalk = require('chalk'),
    yeoman = require('yeoman-generator'),
    yosay = require('yosay');

var vampdGenerator = module.exports = function vampdGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(vampdGenerator, yeoman.generators.Base);

vampdGenerator.prototype.vampdInit = function vampdInit() {
  var done = this.async(),
      prompts = [];

  prompts.push({
    type: 'string',
    name: 'machine_id',
    message: 'What is the machine name of your site?' + chalk.red('(Required)'),
    validate: function (answer) {
      if (answer === '') {
        return 'You must provide a Machine Name';
      } else {
        return true;
      }
    }
  });

  prompts.push({
    type: 'confirm',
    name: 'git',
    message: 'Do you have a git repo for your site?',
    default: true,
  });

  // Bind the initial prompts
  this.prompt(prompts, function (answers) {
    this.machineId = answers.machineId;
    this.git = answers.git;
    done();
  }.bind(this));
}

vampdGenerator.prototype.vampdGit = function vampdGit() {
  var done = this.async(),
      prompts = [];
  if (this.git) {
    // Ask gor the githost
    prompts.push({
      type: 'string',
      name: 'gitURI',
      message: 'What is the git host?',
      default: 'github.com'
    });
    // Ask for uri
    prompts.push({
      type: 'string',
      name: 'gitHost',
      message: 'What is the git uri?' + chalk.red('(Required)'),
      validate: function (answer) {
        if (answer === '') {
          return 'You must provide a git uri';
        } else {
          return true;
        }
      }
    });
    // What revision would you like to use
    prompts.push({
      type: 'string',
      name: 'gitRevision',
      message: 'What is the revision?',
      default: 'master',
      validate: function (answer) {
        if (answer === '') {
          return 'You must provide a revision, tag, branch, etc.';
        } else {
          return true;
        }
      }
    });

    this.prompt(prompts, function (answers) {
      if (this.git) {
        this.gitHost = answers.gitHost;
        this.gitURI = answers.gitURI;
        this.gitRevision = answers.gitRevision;
      }
      done();
    }.bind(this));
  }
};
  // configuring: function () {
  //   var settings = {
  //     windows: this.win,
  //     home: this.home,
  //     vm: this.vm
  //   };

  //   this.config.set(settings);
  // },

  // writing: function () {
  //   this.template('Vagrantfile', 'Vagrantfile');
  // },

  // install: function () {
  //   if (!this.options['skip-install'] && !this.options['skip-setup']) {
  //     sh.run('vagrant box update');
  //     sh.run('vagrant up');
  //   }
  // }
// });
