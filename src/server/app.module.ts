import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ViewMdodule } from '~server/modules/view/view.module';
import { UsersModule } from '~server/modules/user/users.module';
import loadSecretsFromFolders from '~server/modules/config/loadSecret';
import loadEnvByKey from '~server/modules/config/loadEnv';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [
            loadSecretsFromFolders('secrets'),
            loadEnvByKey('MYSQL_HOST', 'MYSQL_PORT', 'MYSQL_DATABASE'),
          ],
          isGlobal: true,
        }),
      ],
      useFactory: (configService: ConfigService): MysqlConnectionOptions => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST') || 'localhost',
        port: configService.get<number>('MYSQL_PORT') || 3306,
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [`${__dirname}/**/*.entity.{ts,js}`],
        synchronize: !(process.env.NODE_ENV === 'production'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ViewMdodule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
