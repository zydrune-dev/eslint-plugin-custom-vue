import { AST } from 'vue-eslint-parser';
import { TSESLint} from '@typescript-eslint/utils';
import type {TSESTree} from "@typescript-eslint/utils/dist/ts-estree";

type messageId = 'noOnPrefix';
const rule: TSESLint.RuleModule<messageId> = {
    defaultOptions: [],
    meta: {
        type: 'suggestion',
        docs: {
            description: 'disallow the use of the `on` prefix in v-on directive event names',
        },
        fixable: 'code',
        schema: [],
        messages: {
            noOnPrefix: 'v-on directive name "{{eventName}}" should not start with the `on` prefix'
        }
    },
    create: (context: TSESLint.RuleContext<messageId, []>) => {
        const parserServices = context.sourceCode.parserServices as any; // Using 'any' due to lack of type information in 'vue-eslint-parser'
        if (!parserServices || typeof parserServices.defineTemplateBodyVisitor !== 'function') {
            return {};
        }
        return parserServices.defineTemplateBodyVisitor({
            // Event handler for VDirectiveKey nodes in <template>
            'VDirectiveKey'(node: AST.VDirectiveKey) {
                // Check if the directive is a v-on directive
                if (node.name.name === 'on' && node.argument && 'name' in node.argument) {
                    const eventName = node.argument.name;
                    const argument = node.argument as any as TSESTree.Node;

                    if (eventName.startsWith('on-') || eventName.startsWith('on')) {
                        context.report({
                            node: argument,
                            messageId: 'noOnPrefix',
                            data: {
                                eventName,
                            },
                            fix(fixer) {
                                const newEventName = eventName.replace(/^on-?/, ''); // Remove both 'on-' and 'on' prefixes
                                return fixer.replaceText(argument, newEventName);
                            }
                        });
                    }
                }
            }
        });
    }
};

export default rule;
