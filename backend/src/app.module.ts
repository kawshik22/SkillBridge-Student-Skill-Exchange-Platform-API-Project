import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SkillsModule } from './skills/skills.module';
import { RequestsModule } from './requests/requests.module';
import { SessionsModule } from './sessions/sessions.module';
import { MailModule } from './mail/mail.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SkillsModule,
    RequestsModule,
    UsersModule,
    AuthModule,
    SkillsModule,
    SessionsModule,
    AdminModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    MailModule,
  ],
})
export class AppModule {}

