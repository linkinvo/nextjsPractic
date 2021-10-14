import * as awilix from 'awilix';

import UserService from './UserService';
import PropertiesService from './PropertiesService';
import ReviewsServices from './ReviewsServices';


export interface IServicesContainer {
    UserService: UserService;
    PropertiesService: PropertiesService;
    ReviewsServices: ReviewsServices;
}

export default {
    UserService: awilix.asClass(UserService).singleton(),
    PropertiesService: awilix.asClass(PropertiesService).singleton(),
    ReviewsServices: awilix.asClass(ReviewsServices).singleton(),
}