import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Query, Put } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { SupplierServiceClientNats } from 'src/common/clients/supplier-client.nats';


@Controller('suppliers')
export class SupplierController {
  constructor(private readonly supplierServiceClient:SupplierServiceClientNats) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierServiceClient.create(createSupplierDto);
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.supplierServiceClient.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supplierServiceClient.findById(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierServiceClient.update(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    // return this.supplierServiceClient.remove(id);
  }
}
