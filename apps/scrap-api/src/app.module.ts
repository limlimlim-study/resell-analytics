import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SrcapModule } from './srcap/srcap.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SrcapModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
