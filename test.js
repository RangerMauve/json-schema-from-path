var assert = require("assert");

var getSchemaFromPath = require("./");

var tests = [{
	schema: {type: "string"},
	path: "",
	realPath: []
}, {
	schema: {properties: {foo: {type: "string"}}},
	path: "foo",
	realPath: ["properties", "foo"]
}, {
	schema: {properties: {foo: {items: {properties: { bar: {type: "string"}}}}}},
	path: "foo/0/bar",
	realPath: ["properties", "foo", "items", "properties", "bar"]
}, {
	schema: {properties: {foo: {items: {properties: { bar: {type: "number"}}}}}},
	path: "foo.0.bar",
	realPath: ["properties", "foo", "items", "properties", "bar"]
}, {
	schema: {additionalProperties: {type: "string"}},
	path: "foo",
	realPath: ["additionalProperties"]
}, {
	schema: {patternProperties: {".*": {type: "string"}}},
	path: "foo",
	realPath: ["patternProperties", ".*"]
}, {
	schema: { properties: { foo: { type: "string" } } },
	path: "/foo/",
	realPath: ["properties", "foo"]
}, {
	schema: {properties: {example: {oneOf: [{title: 'target', properties: {target: {type: 'string', value: 'hello world'}}}]}}},
	path: "example.target",
	realPath: ["properties", "example", "oneOf", 0, 'properties', 'target']
}, {
	schema: {properties: {result:null, example: {oneOf: [{title: 'target', properties: {target: {type: 'string', value: 'hello world'}}}]}}},
	path: "example.notFound",
	realPath: ["properties", "result"]
}]

tests.forEach(function(test, index) {
	var schema = test.schema;
	var path = test.path;
	var realPath = test.realPath;
	assert.deepStrictEqual(
		getSchemaFromPath(schema, path),
		pluck(schema, realPath),
		"Failed test " + index
	);
});

function pluck(object, path) {
	var clone = path.slice();
	var result = object;
	while(clone.length) {
		var next = clone.shift();
		result = result[next];
	}
	return result;
}