import { RequestSource } from './RequestSource';

export class Query {
  private source?: RequestSource;

  getSource(): RequestSource | undefined {
    return this.source;
  }

  setSource(source: RequestSource): void {
    this.source = source;
  }
}
