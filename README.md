# json-schema-from-path
A utility to get the sub-schema from a JSON-schema from the path in an object

Supports schemas that use:

- `properties` (type object)
- `additionalProperties` (type object)
- `patternProperties` (type object)
- `items` (type array)
- paths that use either `/` or `.` as separators

```javascript
var getSchemaFromPath = require("json-schema-from-path");

var someSchema = {
	properties: {
		foo: {
			properties: {
				bar: {
					type: "string"
				}
			}
		}
	}
};

var mypath = "foo/bar";

var theSchema = getSchemaFromPath(someSchema, path);

theSchema === someSchema.properties.foo.properties.bar

```

If a schema object doesn't exist for the given path, `null` is returned.