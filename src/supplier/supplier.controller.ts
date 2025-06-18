import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { SupplierClient } from 'src/common/clients/supplier-client.http';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierServiceClient:SupplierClient) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return 'this.supplierService.create(createSupplierDto);'
  }

  @Get()
  findAll(@Query() paginationDto:PaginationDto) {
    return this.supplierServiceClient.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supplierServiceClient.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return 'this.supplierService.update(+id, updateSupplierDto);'
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.supplierService.remove(+id);'
  }
}
