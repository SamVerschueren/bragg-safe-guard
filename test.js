'use strict';
const test = require('ava');
const isPromise = require('is-promise');
const m = require('.');

const invoke = (guard, body) => {
	const ctx = {
		body
	};

	if (Array.isArray(body)) {
		ctx.body = body.map(x => ({...x}));
	} else if (!isPromise(body)) {
		ctx.body = {...body};
	}

	guard(ctx);

	return ctx.body;
};

test('simple properties', t => {
	const body = {
		foo: 'bar',
		unicorn: 'rainbow'
	};

	t.deepEqual(invoke(m('unicorn'), body), {foo: 'bar'});
	t.deepEqual(invoke(m('foo', 'unicorn'), body), {});
});

test('dot properties', t => {
	const body = {
		foo: {
			bar: 'baz',
			unicorn: 'rainbow'
		}
	};

	t.deepEqual(invoke(m('foo.bar'), body), {foo: {unicorn: 'rainbow'}});
});

test('arrays', t => {
	const body = [
		{
			foo: 'bar',
			unicorn: 'rainbow'
		},
		{
			foo: 'baz',
			hello: 'world'
		}
	];

	t.deepEqual(invoke(m('foo'), body), [
		{unicorn: 'rainbow'},
		{hello: 'world'}
	]);

	t.deepEqual(invoke(m('hello'), body), [
		{foo: 'bar', unicorn: 'rainbow'},
		{foo: 'baz'}
	]);
});

test('promise', async t => {
	const body = Promise.resolve({
		foo: 'bar',
		unicorn: 'rainbow'
	});

	t.deepEqual(await invoke(m('foo'), body), {unicorn: 'rainbow'});
});
