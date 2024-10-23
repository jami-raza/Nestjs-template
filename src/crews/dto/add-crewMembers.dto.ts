import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsUUID,
} from 'class-validator';



export class AddMembersCrewDto {
  @ApiProperty({
    type: Number,
    nullable: false,
    description: 'This is a required property'
  })
  crewId: number

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'This is a required property'
  })
  client: string
  
  @ApiProperty({
    type: String,
    nullable: false,
    description: 'This is a required property',
  })
  supervisor: string

  @ApiProperty({
    type: String,
    nullable: false,
    description: 'This is a required property'
  })
  name: string

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    nullable: false,
    isArray: true
  })
  @IsArray()
  @IsUUID('all', {each: true})
  members!: string[]
}
