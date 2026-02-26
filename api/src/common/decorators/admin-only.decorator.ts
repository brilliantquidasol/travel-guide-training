import { SetMetadata } from '@nestjs/common';
import { ADMIN_ONLY } from '../guards/admin.guard';

export const AdminOnly = () => SetMetadata(ADMIN_ONLY, true);
