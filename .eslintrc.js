'use strict';

module.exports = {
	extends: 'airbnb-base',

	env: {
		node: true,
		es6: true
	},

	parserOptions: {
		sourceType: 'script'
	},

	rules: {
		strict: ['error', 'global'],
		'no-console': 0,
		'no-tabs': 0,
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'comma-dangle': ['error', 'never'],
		'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
		curly: ['error', 'multi-or-nest'],
		'space-before-function-paren': ['error', {
			anonymous: 'never',
			named: 'never',
			asyncArrow: 'always'
		}],
		'max-len': ['error', {
			code: 150,
			tabWidth: 1,
			comments: 200
		}],
		'spaced-comment': ['error', 'always', {
			exceptions: ['*']
		}],
		'keyword-spacing': ['error', {
			overrides: {
				if: {
					after: false
				},
				for: {
					after: false
				},
				while: {
					after: false
				},
				switch: {
					after: false
				},
				catch: {
					after: false
				}
			}
		}],
		'nonblock-statement-body-position': ['error', 'below', { overrides: { else: 'any' } }],
		'no-plusplus': 0,
		'padded-blocks': 0,
		'consistent-return': 0,
		'arrow-parens': ['error', 'as-needed'],
		'arrow-body-style': 0,
		'no-param-reassign': 0

		// 'object-curly-newline': ['error', {
		// 	ObjectExpression: { minProperties: 5, multiline: true, consistent: true },
		// 	ObjectPattern: { minProperties: 5, multiline: true, consistent: true }
		// }],
		// 'operator-linebreak': 0,
		// 'no-continue': 0,
		// 'prefer-spread': 0,
		// 'prefer-rest-params': 0,
		// 'class-methods-use-this': 0,
		// 'prefer-template': 0,
		// 'import/no-unresolved': 0,
		// 'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/tests/**/*.js'] }],
		// 'no-bitwise': 0,
		// 'no-underscore-dangle': ['warn', {
		// 	allowAfterThis: true,
		// 	allowAfterSuper: true,
		// 	allow: ['_call', '__rootpath', '_where']
		// }],
		// 'no-new': 0,
		// 'func-names': 0,
		// 'newline-per-chained-call': ['error', {
		// 	ignoreChainWithDepth: 2
		// }],
		// 'no-prototype-builtins': 0,
		// 'function-paren-newline': 0,
		// 'no-await-in-loop': 0,
	}
};
