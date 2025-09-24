import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

export async function ensureExists<T extends ObjectLiteral>(
  repo: Repository<T>,
  where: object,
  entityName = 'Entity',
): Promise<boolean> {
  const exists = await repo.exists({ where });
  if (!exists) {
    throw new NotFoundException(`${entityName} not found`);
  }
  return true;
}
