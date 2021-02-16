import Ajv, { AnySchemaObject } from 'ajv';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

import { ERC1155MetadataSchema } from './ERC1155MetadataSchema';

const readdir = promisify(fs.readdir);

const ajv = new Ajv();

export function createValidator<TData>(schema: AnySchemaObject) {
  const validator = ajv.compile(schema);

  return function validate(data: unknown): data is TData {
    const valid = validator(data);
    if (!valid) throw validator.errors;
    return true;
  };
}

const validate = createValidator(ERC1155MetadataSchema);

const loadAndValidate = async (file: string) => validate(await import(file));

const metadataDir = path.join(__dirname, '../../../public/metadata');

it('validates all metadatas', async () => {
  const files = await readdir(metadataDir);
  files.forEach((file) =>
    expect(loadAndValidate(path.join(metadataDir, file))).resolves.toBe(true),
  );
});
