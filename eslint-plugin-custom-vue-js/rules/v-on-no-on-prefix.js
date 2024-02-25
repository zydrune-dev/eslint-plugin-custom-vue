module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow the use of the `on` prefix in v-on directive event names',
        },
        fixable: 'code',
        schema: [],
        messages: {
            noOnPrefix: 'v-on directive name "{{name}}" should not start with the `on` prefix'
        }
    },
    create(context) {
        return context.parserServices.defineTemplateBodyVisitor({
            // Event handler for VDirectiveKey nodes in <template>
            'VDirectiveKey'(node) {
                // Check if the directive is a v-on directive
                if (node.name.name === 'on' && node.argument) {
                    const eventName = node.argument.name;

                    if (eventName.startsWith('on-') || eventName.startsWith('on')) {
                        context.report({
                            node: node.argument,
                            messageId: 'noOnPrefix',
                            data: {
                                name: eventName
                            },
                            fix(fixer) {
                                const newEventName = eventName.replace(/^on-?/, ''); // Remove both 'on-' and 'on' prefixes
                                return fixer.replaceText(node.argument, newEventName);
                            }
                        });
                    }
                }
            }
        });
    }
};
