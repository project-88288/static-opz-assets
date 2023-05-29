# Template Scaffolding 
A solution that allows you to clone any url that holds a zip under it and do basic template manipulations like replace values defined between two placeholders.

## Example
This library accepts the following object:

```TS
export interface TemplateScaffoldingOptions {
  /**
   * Any remote url is acceptable it only require a
   * zipped file to be downloaded.
   */
  remoteUrl: string;

  /**
   * This option allows to use a sub folder from cloned 
   * repository instead of directly the repository root 
   * folder. Define the path from inside the repo.
   * 
   * If this value is not defined the full repo will be used.
   */
  subFolder?: string;

  /**
   * How to store data locally
   */
  localOptions?: LocalOptions;

  /**
   * How to replace placeholders
   */
  replace?: ReplaceOptions;
}

export interface LocalOptions {
  /**
   * Path where data will be stored. THis path can be 
   * both relative or absolute, if the path is not 
   * defined the data will be stored in '.' directory.
   */
  folderUrl?: string;
}

export interface ReplaceOptions {
  /**
   * If property is not defined "{{" will be assigned
   */
  prefix?: string;

  /**
   * If property is not defined "}}" will be assigned
   */
  suffix?: string;

  /**
   * Data to replace. Normally this should look something like;
   * {
   *      "key": "value",
   *      "key": "value",
   *      ...
   * }
   */
  entries: object;
}
```