// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-A  ·  Add validators to this DTO
// ─────────────────────────────────────────────────────────────────────────────
// Requirements:
//   - title    → required string, between 3 and 100 characters
//   - description → optional string, max 300 characters
//   - status   → optional; if provided must be one of: 'pending' | 'in-progress' | 'done'
//               hint: look up @IsEnum() from class-validator
//
// Import what you need from 'class-validator' and add the decorators below.
// ─────────────────────────────────────────────────────────────────────────────

import { IsOptional, MaxLength, MinLength, IsString, IsEnum } from "class-validator";

const TaskStatus = ['pending', 'in-progress', 'done'] as const;
type TaskStatus = (typeof TaskStatus)[number];

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
