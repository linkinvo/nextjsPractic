import { call, take } from "redux-saga/effects"
import action from "redux/decorators/action"
import { ENTITIES } from "src/common"
import Entity from "./Entity"
import reviewEntity from "./ReviewsSaga"
import userEntity from "./UsersSaga" 

 class PropertyEntity extends Entity {
    constructor() {
        super(ENTITIES.PROPERTIES, {
            reviews: [reviewEntity.getSchema()],
            user: userEntity.getSchema(),
        });

    }
    
    @action()
    public * sagaGetAllProperties(data) {       
            yield call(this.xRead, '/properties/', data);
    }

     @action()
    public * sagaGetPropertyById(data) {
             yield call(this.xRead, '/properties/' + data.id);
     }
}

const propertyEntity = new PropertyEntity();
export default propertyEntity;
