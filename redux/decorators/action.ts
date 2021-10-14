import Entity from "redux/models/Entity";
import { action as a } from "redux/store/actions";

const action = () => {
    return (target: any, propertyKey: string) => {
        const entityName = target.constructor.name;
        const entityItem = entityName in Entity.actions ? Entity.actions[entityName] : {};
        if (!(propertyKey in entityItem)) {
            entityItem[propertyKey] = {
                decoratorFunction: (data) => a(propertyKey, data),
            };
        }
        Entity.actions[entityName] = entityItem;
    };
};

export default action;