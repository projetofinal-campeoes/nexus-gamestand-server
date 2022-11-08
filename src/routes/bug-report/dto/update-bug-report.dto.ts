import { PartialType } from '@nestjs/swagger';
import { CreateBugReportDto } from './create-bug-report.dto';

export class UpdateBugReportDto extends PartialType(CreateBugReportDto) {}
