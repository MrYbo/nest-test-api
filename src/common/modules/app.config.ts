import { join } from 'path';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { ConfigModule } from '@nestjs/config';

export class AppConfigModule {
  static footRoot() {
    return ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AppConfigModule.loader],
    });
  }

  private static loader() {
    const env = process.env.NODE_ENV || 'development';
    const defaultPath = join(__dirname, '/../../config/default.yaml');
    const envPath = join(__dirname, `/../../config/${env}.yaml`);

    let defDoc;
    let envDoc;

    try {
      defDoc = yaml.load(readFileSync(defaultPath, 'utf8')) || {};
      envDoc = yaml.load(readFileSync(envPath, 'utf8')) || {};
    } catch (e) {
      console.log(e);
    }

    return { ...defDoc, ...envDoc };
  }
}
