# bragg-safe-guard [![Build Status](https://travis-ci.org/SamVerschueren/bragg-safe-guard.svg?branch=master)](https://travis-ci.org/SamVerschueren/bragg-safe-guard)

> Prevents leaking information outside the [bragg](https://github.com/SamVerschueren/bragg) context


## Install

```
$ npm install --save bragg-safe-guard
```


## Usage

```js
const bragg = require('bragg');
const safeGuard = require('bragg-safe-guard');

const app = bragg();

app.use(ctx => {
	ctx.body = {
		foo: 'bar',
		unicorn: 'rainbow',
		user: {
			name: 'Hello',
			password: 'world'
		}
	};
});

app.use(safeGuard('unicorn', 'user.password'));

app.use(ctx => {
	console.log(ctx.body);
	//=> {foo: 'bar', user: {name: 'Hello'}}
});

exports.handler = app.listen();
```


## API

### safeGuard(...properties)

Returns a bragg middleware function.

#### properties

Type: `string[]`

List of properties to be removed from the `body` before sending the response.


## Related

- [bragg](https://github.com/SamVerschueren/bragg) - AWS λ web framework


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
