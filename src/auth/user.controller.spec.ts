import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { UserController } from "./user.controller";
import { usersEntity } from "./user.entity";
import { AuthService } from "./auth.service";

describe("UserService", () => {
    let userController: UserController;
    let userService: UserService;
    let authService: AuthService;
    let userRepository: Repository<usersEntity>;

    beforeAll(() => console.log("this logged once"))
    beforeEach(() => {
        userService = new UserService(userRepository);
        userController = new UserController(userRepository, userService, authService);
    });



    it('should return list of users', async () => {
        const result = {
            first: 1,
            last: 1,
            limit: 10,
            data: []
        };
        const ned = {
            first: 1,
            last: 1,
            limit: 10,
            data: []
        };

        const spy = jest.spyOn(userService, "getUsersWithPaginateed").mockImplementation((): any => result);

        expect(await userController.findAll(1, 2)).toEqual(ned)
        expect(spy).toBeCalledTimes(1)
    })

    it("should delete a user", () => {

    })
})  