import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewMdodule } from '~server/modules/view/view.module';
import { UsersModule } from '~server/modules/user/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.mysql.local',
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST') || 'localhost',
        port: configService.get<number>('MYSQL_PORT') || 3306,
        username: configService.get('MYSQL_USERNAME'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DATABASE'),
        entities: [`${__dirname}/**/*.entity.{ts,js}`],
        synchronize: true,
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
