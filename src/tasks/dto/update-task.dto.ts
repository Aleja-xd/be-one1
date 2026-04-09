// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY 2-B  ·  Build the UpdateTaskDto
// ─────────────────────────────────────────────────────────────────────────────
// Requirements:
//   - Same fields as CreateTaskDto but ALL fields are optional (it's a PATCH)
//   - Re-use the same validators but add @IsOptional() to each field
// ─────────────────────────────────────────────────────────────────────────────

import { IsOptional, MaxLength, MinLength, IsString, IsEnum } from "class-validator";

const TaskStatus = ['pending', 'in-progress', 'done'] as const;
type TaskStatus = (typeof TaskStatus)[number];

export class UpdateTaskDto {
  @IsString()
    @MinLength(3)
    @MaxLength(100)
    title?: string;
  
    @IsString()
    @MaxLength(300)
    @IsOptional()
    description?: string;
  
    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;
}
