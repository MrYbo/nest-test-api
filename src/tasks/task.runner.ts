import { Command, CommandRunner, Option } from 'nest-commander';

@Command({
  name: 'hello',
  options: {
    isDefault: true,
  },
})
export class TaskRunner extends CommandRunner {
  constructor() {
    super();
  }

  async run(
    passedParam: string[],
    options?: Record<string, number>,
  ): Promise<void> {
    console.log(options);
  }

  @Option({
    flags: '-n, --number [number]',
    description: 'A integer',
  })
  parseNumber(val: string): number {
    return Number(val);
  }
}
