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
      properties.set(body)
    } else {
      properties = PropertiModel.build(body)
    }
    return properties.save();
  }

  public async create(body) {
    const { PropertiModel } = this.di;
    let properties = await PropertiModel.findByPk();
    if (properties) {
      properties.set(body)
    } else {
      properties = PropertiModel.build(body)
    }
    return properties.save();
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





// public findReviewsByProductId(id: number) {
//     const { ReviewModel, UserModel } = this.di;
//     if (isNaN(id)) return Promise.reject('Parameter is not a number!');
//     const result = ReviewModel.findAll({
//         include: [
//             {
//                 model: UserModel,
//                 as: 'prodUser'
//             },
//         ],
        // where: {
        //     prodId: id
        // },
//     })
//     return result;
// }