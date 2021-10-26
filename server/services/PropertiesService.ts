import BaseContext from "../baseContext";

export default class PropertiesService extends BaseContext {

    public  findAll() {
        const { PropertiModel, ReviewsModel, UserModel } = this.di;
        const properties =  PropertiModel.findAll({
            include: [
                { 
                    model: ReviewsModel 
                }, 
                { 
                    model: UserModel 
                }
            ],
        });
        return properties
    }

  public async save(body, id) {
    const { PropertiModel } = this.di;
    let properties = await PropertiModel.findByPk(id);
    if (properties) {
      // properties.set(body)
      properties = PropertiModel.build(body)
      properties.save()
    } else {
      properties = await PropertiModel.create(body)
      // properties.save()
    }
    return properties
  }

    public findOneByID(id) {
        const { PropertiModel, ReviewsModel, UserModel } = this.di;
        if (isNaN(id)) return Promise.reject('Parameter is not a number!');
        const properties =  PropertiModel.findOne({
            where: { id },
            include: [
              {
                model: ReviewsModel,
                include: [
                  {
                    model: UserModel,
                  },
                ],
              },
              {
                model: UserModel,
              },
            ],
          })
        return properties
    }
}