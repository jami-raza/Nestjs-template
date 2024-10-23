import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimeCardBreak } from './entity/time-card_break.entity';
import { TimeCardBreakController } from './time-card_break.controller';
import { TimeCardBreakService } from './time-card_break.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([TimeCardBreak]),
  ],
  controllers: [TimeCardBreakController],
  providers: [TimeCardBreakService],
  exports: [TimeCardBreakService]
})
export class TimeCardBreakModule {}
