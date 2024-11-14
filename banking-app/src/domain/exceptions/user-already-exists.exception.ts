export class UserAlreadyExistsException extends Error{
    constructor(message: string = 'User with this email alrady exists'){
        super(message)
    }
}