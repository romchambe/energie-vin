import {
  PipeTransform, Injectable, ParseIntPipe, ArgumentMetadata, Optional,
} from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe implements PipeTransform {
  defaultValue?: number;

  constructor(@Optional() options?: { defaultValue?: number }) {
    if (options) {
      this.defaultValue = options?.defaultValue;
    }
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<number | undefined> {
    if (value === undefined) {
      return this.defaultValue;
    }
    const intValue = await new ParseIntPipe().transform(value, metadata);

    return intValue;
  }
}
