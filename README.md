# Serverless Pretty Output Plugin

This plugin will pretty print any JSON in the output of a serverless command.

## Installation

`npm install serverless-pretty-output --save-dev`

Then inside your project's `serverless.yml` file add following entry to the plugins section: `serverless-pretty-output`. If there is no plugin section you will need to add it to the file.

It should look something like this:

```YAML
plugins:
  - serverless-pretty-output
```

This plugin uses `jq` to format JSON and uses `'.'` as the default filter. You can set your own filter with the following option in `serverless.yml`:

```YAML
custom:
  jsonOutputFilter: ".message"
```