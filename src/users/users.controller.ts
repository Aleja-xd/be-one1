// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-D  ·  Implement UsersController
// ─────────────────────────────────────────────────────────────────────────────
// Wire up ALL 5 endpoints under the '/users' path.
// Use ParseIntPipe for the :id param in every route that needs it.
//
//   GET    /users
//   GET    /users/:id
//   POST   /users          (201)
//   PATCH  /users/:id
//   DELETE /users/:id
// ─────────────────────────────────────────────────────────────────────────────

import { 
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus, } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @Get('search')
  findByEmail(@Query('email') email?: string) {
    return this.usersService.findByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/tasks')
  getUserTasks(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    return this.tasksService.findTasksByUserName(user.name);
  }

  @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body()createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    @Patch(':id')
      update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
      ) {
        return this.usersService.update(id, updateUserDto);
      }
      @Delete(':id')
      remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
  }
}
