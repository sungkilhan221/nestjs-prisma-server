import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UpdateUserDto } from './dtos/UpdateUser.dto';
import { updateUserSettingsDto } from './dtos/UpdateUserSettings.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() creatUserDto: CreateUserDto) {
    return this.usersService.createUser(creatUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  @Patch(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUserById(id);
  }

  // PATCH users/:id/settings
  @Patch(':id/settings')
  updateUserSettingsByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserSettingsDto: updateUserSettingsDto,
  ) {
    return this.usersService.updateUserSettings(id, updateUserSettingsDto);
  }
}
