import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

// will register them on StyleDictionary object
// that is installed as a dependency of this package.
register(StyleDictionary);

const sd = new StyleDictionary({
  // make sure to have source match your token files!
  // be careful about accidentally matching your package.json or similar files that are not tokens
  source: ['tokens.json'],
  preprocessors: ['tokens-studio'], // <-- since 0.16.0 this must be explicit
  platforms: {
    css: {
      transformGroup: 'tokens-studio', // <-- apply the tokens-studio transformGroup to apply all transforms
      transforms: ['name/kebab'], // <-- add a token name transform for generating token names, default is camel
      buildPath: './src/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
    scss: {
      transformGroup: "scss",
      prefix: "sd",
      buildPath: "./src/scss/",
      files: [
        {
          destination: "_variables.scss",
          format: "scss/variables"
        }
      ],
      actions: ["copy_assets"]
    },
    android: {
      transforms: ["attribute/cti", "name/snake", "color/hex", "size/remToSp", "size/remToDp"],
      buildPath: "./src/android/src/main/res/values/",
      files: [
        {
          destination: "style_dictionary_colors.xml",
          format: "android/colors"
        }
      ]
    }
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
