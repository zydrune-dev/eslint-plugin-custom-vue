# eslint-plugin-custom-vue

The base code code for custom eslint rule that disallows using `on-` prefix for event names in vue template

Edit plugins and rules inside .eslintrc.json to use
```
{
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:vue/vue3-essential"
    ],
    "parser": "vue-eslint-parser",
    "plugins": [
        "vue",
        "custom-vue"
    ],
    "rules": {
        "custom-vue/v-on-no-on-prefix": "error"
    }
}
```

Resources:
https://github.com/vuejs/vue-eslint-parser/tree/master?tab=readme-ov-file#-usage-for-custom-rules--plugins
