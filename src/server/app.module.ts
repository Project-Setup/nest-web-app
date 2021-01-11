import { Module } from '@nestjs/common';
import { ViewMdodule } from './modules/view/view.module';

@Module({
  imports: [ViewMdodule],
  controllers: [],
  providers: [],
})
export class AppModule {}
