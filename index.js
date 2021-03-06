'use strict';
const dotProp = require('dot-prop');
const isPromise = require('is-promise');

const guard = (input, props) => {
	if (Array.isArray(input)) {
		return input.map(x => guard(x, props));
	}

	if (typeof input === 'object') {
		for (const prop of props) {
			dotProp.delete(input, prop);
		}
	}

	return input;
};

module.exports = (...props) => {
	return ctx => {
		if (!ctx.body || props.length === 0) {
			return;
		}

		if (isPromise(ctx.body)) {
			ctx.body = ctx.body.then(x => guard(x, props)); // eslint-disable-line promise/prefer-await-to-then
		} else {
			ctx.body = guard(ctx.body, props);
		}
	};
};
