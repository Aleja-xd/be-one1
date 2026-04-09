// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 3-B  ·  Create UpdateUserDto
// ─────────────────────────────────────────────────────────────────────────────
// Same as CreateUserDto but every field is optional (PATCH semantics).
// ─────────────────────────────────────────────────────────────────────────────


import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
  Max,
  Min,
  IsEmail,
} from 'class-validator';

const UserRole = ['student', 'teacher', 'admin'] as const;
type UserRole = (typeof UserRole)[number];

export class UpdateUserDto {
    
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    name?: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email?:string;

    @IsNumber()
    @Min(1)
    @Max(120)
    age?:number;

    @IsEnum(UserRole)
    @IsOptional()
    role?: UserRole;
}