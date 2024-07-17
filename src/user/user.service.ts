import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { BaseService } from 'src/common';
import { User } from 'src/database/models/user.model';
import { Op, WhereOptions } from 'sequelize';
import { CreateUserDto, UpdateUserProfileDto, changePasswordDto } from './dtos';

@Injectable()
export class UserService extends BaseService {
  constructor() {
    super ();
  }

  // async createUser(payload: CreateUserDto) {
  //   const { id, email, matricNo, name, ...rest } = payload

  //   const exist = await User.findOne({ where: { [Op.or]: [{ id }, { email }, { name }, { matricNo }] } });
  //   if(exist) 
  //     return this.HandleError(
  //       new BadRequestException('User already exist')
  //     );
    
  //   const user = await User.create({
  //     ...rest,
  //     id,
  //     email,
  //     matricNo,
  //     name
  //   });

  //   return this.Results(user);
  // }
  
  async getUserByMatric(matricNo: string) {
    const user = await User.findOne({where: { matricNo }});
    if (!user)
        return this.HandleError(
          new NotFoundException('User not found'),
        );
    return this.Results(user);
  }

  async getUserByEmail(email: string) {
    const user = await User.findOne({where: { email }});
    if (!user)
        return this.HandleError(
          new NotFoundException('User not found'),
        );
    return this.Results(user);
  }

  async updateUserProfile(
    {
      id,
      email,
      matricNo,
      name,
      phone,
      avatar
    }: UpdateUserProfileDto
  ) 
  {
    const getUser = await this.getUserByMatric(matricNo);

    if (getUser.isError || !getUser.data) return getUser;

    const user = getUser.data;
  
    const updatePayload: any = {
      ...(avatar ? { avatar } : {}),
      ...(phone ? { phone } : {}),
      ...(name ? { avatar } : {}),
    };

    await user.update(updatePayload);
  }

  async updatePassword({ newPassword, password }: changePasswordDto, matricNo: string) {
    const getUser = await this.getUserByMatric(matricNo);

    if(getUser.isError || !getUser.data) return getUser;

    const user = getUser.data;

    if(!user.validatePassword(password))
      return this.HandleError(new BadRequestException('Password is incorrect'));

    await user.update({ password: newPassword });

    return this.Results(user);
  }
}