
module.exports = getSchemaFromPath;
getSchemaFromPath.default = getSchemaFromPath;

function getSchemaFromPath(schema, path) {
	if(!path) return schema;
	return getSchema(schema, path.split(/[\/\.]/));
}

function getSchema(schema, segments) {
	if(!schema) return null;
	if(!segments.length) return schema;
	var nextSegment = segments[0];
	var subSegments = segments.slice(1);
	var subSchema = null;
	if(schema.properties) {
		return getSchema(schema.properties[nextSegment], subSegments);
	} else if (schema.patternProperties) {
		var patterns = schema.patternProperties;
		for(var pattern in patterns) {
			if((new RegExp(pattern)).test(nextSegment)) {
				return getSchema(patterns[pattern], subSegments);
			}
		}
	}else if(schema.additionalProperties) {
		return getSchema(schema.additionalProperties, subSegments);
	} else if (schema.items) {
		return getSchema(schema.items, subSegments)
	} else {
		// There's no deeper schema defined
		return null;
	}
	return getSchema(subSchema, subSegments);
} 