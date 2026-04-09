// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-C  ·  Implement UsersService
// ─────────────────────────────────────────────────────────────────────────────
// Create an in-memory service following the same pattern as ProductsService.
//
// Requirements:
//   - Store users in a private array
//   - Pre-populate with at least 2 seed users
//   - Implement: findAll, findOne(id), create(dto), update(id, dto), remove(id)
//   - findOne must throw NotFoundException when user is not found
//
// Interface to use:
//   export interface User {
//     id: number;
//     name: string;
//     email: string;
//     age: number;
//     role: string;
//   }
// ─────────────────────────────────────────────────────────────────────────────

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: UserRole;
}

@Injectable()
export class UsersService {
  private users: User[] = [
      { id: 1, name: 'Juan', email: 'juan@example.com', age: 25, role: 'student' },
      { id: 2, name: 'María', email: 'maria@example.com', age: 30, role: 'teacher' },
    ];
    private nextId = 3;
  
    findAll(): User[] {
      return this.users;
    }
  
    findOne(id: number): User {
      const user = this.users.find((t) => t.id === id);
      if (!user) throw new NotFoundException(`Task #${id} not found`);
      return user;
    }
  
    create(dto: CreateUserDto): User {
      const user: User = {
        id: this.nextId++,
        name: dto.name,
        email: dto.email,
        age: dto.age,
        role: dto.role ?? 'student',
      };
      this.users.push(user);
      return user;
    }
  
    update(id: number, dto: UpdateUserDto): User {
      const user = this.findOne(id);
      Object.assign(user, dto);
      return user;
    }
  
    remove(id: number): User {
      const user = this.findOne(id);
      this.users = this.users.filter((u) => u.id !== id);
      return user;
    }
}

