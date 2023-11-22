import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AppDummy } from './app.dummy';
import { AppJapanService } from './app.japan.service';
import { ConfigModule } from '@nestjs/config';
import { ExperienceModule } from './experience/experience.module';
import { UserContactsDetailsModule } from './user_contacts_details/user-contacts-details.module';
import ormConfig from './config/orm.config'
import ormConfigProd from './config/orm.config.prod';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ormConfig], expandVariables: true, }),
    TypeOrmModule.forRootAsync({ useFactory: process.env.NODE_ENV !== "production" ? ormConfig : ormConfigProd }),
    EventModule,
    UserModule,
    ExperienceModule,
    UserContactsDetailsModule,
    SchoolModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppJapanService
  }, {
    provide: "APP_NAME",
    useValue: "Nest event backend"
  },
  {
    provide: "MESSAGE",
    inject: [AppDummy],
    useFactory: (app) => `${app.dummy()} Factory`
  }, AppDummy],

})
export class AppModule { }
