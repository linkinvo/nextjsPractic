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
      // properties = new PropertiModel(body)
      // properties = PropertiModel.build(body)
      properties = await PropertiModel.create(body)
      // console.log("NEW -BODY-PROPERTIES",body)
      // console.log("NEW -ID-PROPERTIES",id)
      // properties.save()
    }
    console.log("SERVISE--properties", properties)
    // return properties.save();
    return properties
  }

  // public async save(body, id) {
  //   const { PropertiModel } = this.di;
  //   let properties = await PropertiModel.findByPk(id);
  //   if (properties) {
  //     properties.set(body)
  //   } else {
  //     // properties = new PropertiModel(body)
  //     properties = PropertiModel.build(body)
  //     console.log("NEW -BODY-PROPERTIES",body)
  //     console.log("NEW -ID-PROPERTIES",id)
  //   }
  //   console.log("SERVISE--properties", properties)
  //   return properties.save();
  // }

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