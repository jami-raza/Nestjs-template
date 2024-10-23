import { forwardRef, Module } from '@nestjs/common';
import { TimecardService } from './timecard.service';
import { TimecardController } from './timecard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timecard } from './entity/timecard.entity';
import { TimeCardBreakModule } from 'src/time-card_break/time-card_break.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Timecard]),
    forwardRef(()=> TimeCardBreakModule)
  ],
  providers: [TimecardService],
  controllers: [TimecardController],
  exports: [TimecardService]
})
export class TimecardModule {}
