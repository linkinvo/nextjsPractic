import { call, take } from "redux-saga/effects"
import action from "redux/decorators/action";
import { ENTITIES } from "src/common";
import Entity from "./Entity";
import userEntity from "./UsersSaga";

class ReviewEntity extends Entity {
    constructor() {
        super(ENTITIES.REVIEWS, {
            user: userEntity.getSchema(),
        });
        // Entity.addAction(this.sagaGetReviewsByPropertyId);
    }

    @action()
    public * sagaGetReviewsByPropertyId() {
        while (true) {
            const data = yield take('sagaGetReviewsByPropertyId');
            let propertiId = data.propertiId;
            yield call(this.xRead, '/reviews/by_property_id/' + propertiId, {})
            // yield call(this.xRead, '/reviews/by_property_id/')
        }
    }
}

const reviewEntity = new ReviewEntity();
export default reviewEntity;