import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';

export class AppRedisModule {
  private static factory(configService: ConfigService): RedisModuleOptions {
    const redisConfigs = configService.get('redis');
    console.log(redisConfigs);

    let config;
    if (Array.isArray(redisConfigs)) {
      config = [];
      for (const conf of redisConfigs) {
        config.push({
          host: conf.host,
          port: conf.port,
          keyPrefix: conf.keyPrefix,
        });
      }
    } else {
      config = {
        host: redisConfigs.host,
        port: redisConfigs.port,
        keyPrefix: redisConfigs.keyPrefix,
      };
    }

    return {
      commonOptions: {},
      readyLog: true,
      config,
    };
  }

  static forRootAsync() {
    return RedisModule.forRootAsync({
      useFactory: AppRedisModule.factory,
      inject: [ConfigService],
    });
  }
}
