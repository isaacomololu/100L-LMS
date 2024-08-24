import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class LecturerGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        return user && (user.type === 'lecturer' || user.type === 'admin');
    }
}