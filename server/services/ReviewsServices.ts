import BaseContext from "../baseContext";

export default class ReviewsServices extends BaseContext {
  public async findAll() {
    const { PropertiModel, ReviewsModel, UserModel } = this.di;
    const reviews = await ReviewsModel.findAll({
      include: [
        {
          model: PropertiModel,
        },
        {
          model: UserModel,
        },
      ],
    });
    return reviews;
  }

  public async save(body, id) {
    const { ReviewsModel } = this.di;
    let reviews = await ReviewsModel.findByPk(id);
    if (reviews) {
      reviews.set(body);
    } else {
      reviews = ReviewsModel.build(body);
    }
    return reviews.save();
  }

  public findOneByID(id) {
    const { PropertiModel, ReviewsModel, UserModel } = this.di;
    if (isNaN(id)) return Promise.reject("Parameter is not a number!");

    const reviews = ReviewsModel.findOne({
      include: [
        {
          model: PropertiModel,
        },
        {
          model: UserModel,
        },
      ],
    });
    return reviews;
  }

  public findReviewsByPropertyId(id: number) {
    const { ReviewsModel } = this.di;
    if (isNaN(id)) {
      return Promise.reject("Parameter is not a number!");
    }
    const result = ReviewsModel.findAll({
      where: {
        propertiId: id,
      },
    });
    return result;
  }
}