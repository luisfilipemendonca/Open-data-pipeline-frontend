import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import * as ts from 'typescript';

const OPENAPI_URL = 'http://localhost:8000/openapi.json';
const API_TYPES_FILE = 'src/types/api.d.ts';
const OUTPUT_FILE = 'src/types/api-schemas.ts';

const response = await fetch(OPENAPI_URL);

if (!response.ok) {
  throw new Error(`Failed to fetch OpenAPI: ${response.status}`);
}

const openapi = await response.json();
const schemas = Object.keys(openapi?.components?.schemas ?? {});

if (schemas.length === 0) {
  throw new Error('No schemas found in OpenAPI components.');
}

const program = ts.createProgram([API_TYPES_FILE], {
  noEmit: true,
  skipLibCheck: true,
  strict: true,
});

const checker = program.getTypeChecker();

const sourceFile = program
  .getSourceFiles()
  .find((file) => resolve(file.fileName) === resolve(API_TYPES_FILE));

if (!sourceFile) {
  throw new Error(`Could not find ${API_TYPES_FILE}.`);
}

const componentsDeclaration = sourceFile.statements.find(
  (statement): statement is ts.InterfaceDeclaration =>
    ts.isInterfaceDeclaration(statement) && statement.name.text === 'components',
);

if (!componentsDeclaration) {
  throw new Error('Could not find components interface.');
}

const componentsSymbol = checker.getSymbolAtLocation(componentsDeclaration.name);

if (!componentsSymbol) {
  throw new Error('Could not resolve components interface.');
}

const componentsType = checker.getDeclaredTypeOfSymbol(componentsSymbol);
const schemasSymbol = checker.getPropertyOfType(componentsType, 'schemas');

if (!schemasSymbol) {
  throw new Error('Could not find components.schemas.');
}

const schemasType = checker.getTypeOfSymbolAtLocation(schemasSymbol, componentsDeclaration);

const schemaNames = new Set(schemas);

function serializeType(type: ts.Type, visited = new Set<ts.Type>()): string {
  // Primitive types
  if (type.flags & ts.TypeFlags.String) return 'string';
  if (type.flags & ts.TypeFlags.Number) return 'number';
  if (type.flags & ts.TypeFlags.Boolean) return 'boolean';
  if (type.flags & ts.TypeFlags.Null) return 'null';
  if (type.flags & ts.TypeFlags.Undefined) return 'undefined';
  if (type.flags & ts.TypeFlags.Void) return 'void';
  if (type.flags & ts.TypeFlags.Any) return 'any';
  if (type.flags & ts.TypeFlags.Unknown) return 'unknown';
  if (type.flags & ts.TypeFlags.Never) return 'never';

  // Literal types
  if (type.flags & ts.TypeFlags.StringLiteral) {
    return JSON.stringify((type as ts.StringLiteralType).value);
  }

  if (type.flags & ts.TypeFlags.NumberLiteral) {
    return String((type as ts.NumberLiteralType).value);
  }

  if (type.flags & ts.TypeFlags.BooleanLiteral) {
    return (type as ts.Type & { intrinsicName: string }).intrinsicName;
  }

  // Union types
  if (type.isUnion()) {
    return type.types.map((item) => serializeType(item, visited)).join(' | ');
  }

  // Intersection types
  if (type.isIntersection()) {
    return type.types.map((item) => `(${serializeType(item, visited)})`).join(' & ');
  }

  // Arrays
  if (checker.isArrayType(type)) {
    const elementType = checker.getTypeArguments(type as ts.TypeReference)[0];

    const arrayType = elementType ? serializeType(elementType, visited) : 'unknown';

    return `(${arrayType})[]`;
  }

  // Tuples
  if (checker.isTupleType(type)) {
    const typeArguments = checker.getTypeArguments(type as ts.TypeReference);

    return `[${typeArguments.map((item) => serializeType(item, visited)).join(', ')}]`;
  }

  // Circular references
  if (visited.has(type)) {
    const referencedName = type.aliasSymbol?.name ?? type.getSymbol()?.name;

    if (referencedName && schemaNames.has(referencedName)) {
      return `components["schemas"]["${referencedName}"]`;
    }

    return 'unknown';
  }

  // Objects
  if (type.flags & ts.TypeFlags.Object) {
    const nextVisited = new Set(visited);
    nextVisited.add(type);

    const properties = checker.getPropertiesOfType(type);

    const propertyDefinitions = properties.map((property) => {
      const declaration = property.valueDeclaration;

      const propertyDeclaration = property.valueDeclaration;

      if (!sourceFile) {
        throw new Error(`Could not find ${API_TYPES_FILE}.`);
      }

      const propertyType = checker.getTypeOfSymbolAtLocation(
        property,
        propertyDeclaration || sourceFile,
      );

      const optional = Boolean(property.flags & ts.SymbolFlags.Optional);

      const readonly =
        declaration &&
        ts.canHaveModifiers(declaration) &&
        ts
          .getModifiers(declaration)
          ?.some((modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword);

      // Optional properties already have the ? marker.
      // Remove undefined from their value type.
      const valueType =
        optional && propertyType.isUnion()
          ? propertyType.types.filter((item) => !(item.flags & ts.TypeFlags.Undefined))
          : [propertyType];

      const serializedType = valueType.map((item) => serializeType(item, nextVisited)).join(' | ');

      return `  ${readonly ? 'readonly ' : ''}${JSON.stringify(property.name)}${optional ? '?' : ''}: ${serializedType};`;
    });

    // Index signatures (e.g. Record<string, unknown>)
    const stringIndexType = checker.getIndexTypeOfType(type, ts.IndexKind.String);

    if (stringIndexType) {
      propertyDefinitions.push(`  [key: string]: ${serializeType(stringIndexType, nextVisited)};`);
    }

    return `{\n${propertyDefinitions.join('\n')}\n}`;
  }

  // Fallback for unsupported or special types
  return checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);
}

const aliases = schemas.map((schemaName) => {
  const schemaSymbol = checker.getPropertyOfType(schemasType, schemaName);

  if (!schemaSymbol) {
    throw new Error(`Could not resolve schema: ${schemaName}`);
  }

  const schemaType = checker.getTypeOfSymbolAtLocation(
    schemaSymbol,
    schemaSymbol.valueDeclaration ?? componentsDeclaration,
  );

  return `export type ${schemaName} = ${serializeType(schemaType)};`;
});

const content = `// Auto-generated. Do not edit manually.

${aliases.join('\n\n')}
`;

await mkdir('src/types', { recursive: true });
await writeFile(OUTPUT_FILE, content);

console.log(`Generated ${schemas.length} API types.`);
