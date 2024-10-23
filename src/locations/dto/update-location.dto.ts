import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { Client } from "src/clients/entity/client.entity";
import { Ranch } from "src/ranches/entity/ranch.entity";
import { CreateLocationDto } from "./create-location.dto";

export class UpdateLocationDto {
    @ApiProperty({
        type: String,
        description: 'required'
    })
    fieldName: string;
    
    @ApiProperty({
        type: String,
        description: 'required'
    })
    fieldId: string;

    @ApiProperty({
        type: String,
        description: 'required'
    })
    crop: string;

    @ApiProperty({
        type: String,
        description: 'required'
    })
    commission:string

    @ApiProperty({
        type: String,
        description: 'required'
    })
    acres: string

    @ApiProperty({
        type: String,
        description: 'required'
    })
    ranch: Ranch | string

    @ApiProperty({
        type: String,
        description: 'required'
    })
    client: Client | string

   

}