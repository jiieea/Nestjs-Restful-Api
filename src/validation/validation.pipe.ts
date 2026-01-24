import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  constructor(private zodType: ZodType) {}
  transform(value: any, metadata: ArgumentMetadata): any {
    if (metadata.type == 'body') {
      return this.zodType.parse(value);
    }
    return value;
  }
}
