# ember-cli-deploy-json-config

> An ember-cli-deploy plugin that pushes container images to your container registry.

[![](https://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/plugins/ember-cli-deploy-json-config.svg)](http://ember-cli-deploy.github.io/ember-cli-deploy-version-badges/)

This plugin creates and uploads a container image to a container registry. For more information on docker please refer to [Docker's Website][4].

## What is an ember-cli-deploy plugin?

A plugin is an addon that can be executed as a part of the ember-cli-deploy pipeline. A plugin will implement one or more of the ember-cli-deploy's pipeline hooks.

For more information on what plugins are and how they work, please refer to the [Plugin Documentation][1].

## Prerequisites

The following properties are expected to be present on the deployment `context` object:

- `distDir`                     (provided by [ember-cli-deploy-build][2])
- `project.root`                (provided by [ember-cli-deploy][3])
- `revisionKey`                 (provided by [ember-cli-deploy-revision-data][5])

**The plugin also assumes that the user is logged into their container registry. It will error out otherwise.**

## ember-cli-deploy Hooks Implemented

For detailed information on what plugin hooks are and how they work, please refer to the [Plugin Documentation][1].

- `configure`
- `didPrepare`
- `upload`

These hooks are flexible. Feel free to make changes to this plugin's index.js if different hooks are preferred.

## Configuration Options

For detailed information on how configuration of plugins works, please refer to the [Plugin Documentation][1].
This plugin will cause the deployment pipeline to abort if any of the necessary configurations are left empty.

### name

The default behavior for name is to use the revision key from the [ember-cli-deploy-revision-data][5] plugin.
If an alternative naming scheme is preferred simply set the name in deploy.js.
**If neither is set the deploy pipline will abort.**

### repo

This is the url of the container registry you wish to push to.

### pathToProject

This is the location of the project that you want to build a container image from

### All Together

An example of a completed config:

```
ENV["docker"] = {
  name: 'newImage!',  
  repo:'images.company.com/something/something',
  pathToProject:'/path/to/project',
  }
```

[1]: http://ember-cli.github.io/ember-cli-deploy/plugins "Plugin Documentation"
[2]: https://github.com/ember-cli-deploy/ember-cli-deploy-build "ember-cli-deploy-build"
[3]: https://github.com/ember-cli/ember-cli-deploy "ember-cli-deploy"
[4]: https://docs.docker.com/ "Docker's Website"
[5]: https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data "ember-cli-deploy-revision-data"
