import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { UserAlreadyExistsException } from "src/domain/exceptions/user-already-exists.exception";

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsFilter implements ExceptionFilter{
    catch(exception: UserAlreadyExistsException, host: ArgumentsHost){
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()

        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: exception.message
            })
    }
}