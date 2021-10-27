import React from 'react';
import { Field, reduxForm, reducer as reduxFormReducer } from 'redux-form';
import { connect } from 'react-redux';
import entities from 'redux/store/store'
import {maxLengthCreator, requiredField} from '../../redux/validation/validators'
import {Input} from '../../redux/validation/FormsControls'




let PropertiUpdate = (props) => {
  // console.log("property", props.initialValues.form)
  const [showModal, setShowModal] = React.useState(false);


  const  {handleSubmit, pristine, reset, submitting } = props;

  const upPropertyButton = () => {
    console.log("props.initialValues.form",props.initialValues.form)
  }
  let data = {
    rating: 5,
    description: "The Football Is Good For Training And Recreational Purposes",
    beds: 5,
    price: 871,
    userId: 337,
    img: 'img',
    baths: 2,
  };
  
    return (
        <>
<button
  className="transition-colors 
          duration-200  
          text-deep-purple-accent-400 
          hover:text-deep-purple-800 
          active:bg-pink-600 
          font-bold 
          uppercase 
          text-sm 
          px-2 
          py-1 
          rounded 
          shadow 
          hover:shadow-lg 
          outline-none 
          focus:outline-none 
          mr-1 
          mb-1 
          ease-linear"
  type="button"
  onClick={() => setShowModal(true)}
>
   Update Property
  <svg
    className="inline-block w-3 ml-2"
    fill="currentColor"
    viewBox="0 0 12 12"
  >
    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
  </svg>
</button>
{showModal ? (
  <>
    <div
      className="justify-center 
                items-center 
                flex 
                overflow-x-hidden 
                overflow-y-auto 
                fixed inset-0 
                z-50 
                outline-none 
                focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        {/*content*/}
        <div className="border-0 
                      rounded-lg 
                      shadow-lg 
                      relative 
                      flex 
                      flex-col w-full  
                      outline-none 
                      focus:outline-none">
          {/*header*/}
          <div className="flex 
                        items-start 
                        justify-between 
                        p-5 
                        border-b 
                        border-solid 
                        border-blueGray-200 
                        rounded-t">
            <h3 className="text-3xl font-semibold">
              Modal Title
            </h3>
            <button
              className="p-1 
                        ml-auto 
                        bg-transparent 
                        border-0 
                        text-black 
                        opacity-3 
                        float-right 
                        text-3xl 
                        leading-none 
                        font-semibold 
                        outline-none 
                        focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <span className="bg-transparent 
                            text-black 
                            h-6 
                            w-6 
                            text-2xl 
                            block 
                            outline-none 
                            focus:outline-none">
                ×
              </span>
          </button>
        </div>
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <div className="flex 
                          mx-auto 
                          items-center 
                          justify-center 
                          shadow-lg 
                          mx-8 
                          mb-4 
                          max-w-lg">
            <form 
                  className="w-full 
                            max-w-xl 
                            bg-white 
                            rounded-lg 
                            px-4 
                            pt-2">
  <form onSubmit={handleSubmit} className="flex flex-wrap -mx-3 mb-6">
    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new property</h2>
    <div className="w-full md:w-full px-3 mb-2 mt-2">
    <div>
        <button className="  bg-yellow-500 
                               background-transparent  
                               font-bold 
                               uppercase 
                               px-6 
                               py-2 
                               text-sm 
                               outline-none 
                               focus:outline-none 
                               mr-1 
                               mb-1 
                               ease-linear 
                               transition-all 
                               duration-150" type="button" onClick={upPropertyButton}>Load Account</button>
      </div>
      <Field 
              component={Input}
              className="bg-gray-100 
                          rounded 
                          border 
                          border-gray-400 
                          leading-normal 
                          resize-none 
                          w-full 
                          h-10 
                          py-2 
                          px-3 
                          font-medium 
                          placeholder-gray-700 
                          focus:outline-none 
                          focus:bg-white 
                          text-black" 
              type="text" 
              name='description'
              validate={[requiredField]}
              placeholder='description'/>
      <Field 
              component={Input}
              className="bg-gray-100 
                          rounded
                          border 
                          border-gray-400 
                          leading-normal 
                          resize-none 
                          w-full 
                          h-10 
                          py-2 
                          px-3 
                          font-medium 
                          placeholder-gray-700 
                          focus:outline-none 
                          focus:bg-white 
                          text-black" 
            name="beds" 
            type="number"
            validate={[requiredField]} 
            placeholder='beds'/>
      <Field 
              component={Input}
              className="bg-gray-100 
                          rounded 
                          border 
                          border-gray-400 
                          leading-normal 
                          resize-none 
                          w-full 
                          h-10 
                          py-2 
                          px-3 
                          font-medium 
                          placeholder-gray-700 
                          focus:outline-none 
                          focus:bg-white 
                          text-black" 
            name="baths" 
            type="number" 
            validate={[requiredField]}
            placeholder='baths'/>
 
      <Field 
              component='input'
              className="bg-gray-100 
                          rounded 
                          border 
                          border-gray-400 
                          leading-normal 
                          resize-none 
                          w-full 
                          h-10 
                          py-2 
                          px-3 
                          font-medium 
                          placeholder-gray-700 
                          focus:outline-none 
                          focus:bg-white 
                          text-black" 
              name="rating" 
              type="number" 
              placeholder='rating'/>
      <Field 
              component={Input}
              className="bg-gray-100 
                          rounded 
                          border 
                          border-gray-400 
                          leading-normal 
                          resize-none 
                          w-full 
                          h-10 
                          py-2 
                          px-3 
                          font-medium 
                          placeholder-gray-700 
                          focus:outline-none 
                          focus:bg-white 
                          text-black" 
              name="price" 
              type="number"
              validate={[requiredField]}
              placeholder='price'/>
      <Field 
              component={Input}
              className="bg-gray-100 
                          rounded 
                          border 
                          border-gray-400 
                          leading-normal 
                          resize-none 
                          w-full 
                          h-10 
                          py-2 
                          px-3 
                          font-medium 
                          placeholder-gray-700 
                          focus:outline-none 
                          focus:bg-white 
                          text-black" 
              name="img" 
              type="text"
              validate={[requiredField]}
              placeholder='img'/>
    </div>
    <div className="w-full md:w-full flex items-start px-3">
      <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
        <svg fill="none" className="w-5 h-5 text-gray-600 mr-1" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs md:text-sm pt-px">Some HTML is okay.</p>
      </div>
      <div className="-mr-1">
                
                {/* <input type='submit' className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100" value='Post Comment' /> */}
              </div>
            </div>
          </form>
        </form>
                  </div>

                  {/* <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                    I always felt like I could do anything. That’s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They're slowed down by their perception of
                    themselves. If you're taught you can’t do anything, you
                    won’t do anything. I was taught I could do everything.
                  </p> */}
                </div>
                {/*footer*/}
                <div className="flex items-center 
                                justify-end 
                                p-6 
                                border-t 
                                border-solid 
                                border-blueGray-200 
                                rounded-b">
                  <button
                    className="text-red-500 
                               bg-blue-400 
                               background-transparent  
                               font-bold 
                               uppercase 
                               px-6 
                               py-2 
                               text-sm 
                               outline-none 
                               focus:outline-none 
                               mr-1 
                               mb-1 
                               ease-linear 
                               transition-all 
                               duration-150"
                    type="button"
                    disabled={pristine || submitting}
                    onClick={reset}
                    // onClick={() => setShowModal(false)}
                  >
                    Reset
                  </button>
                  <button
                    className="bg-emerald-500 
                             text-black 
                             bg-green-600 
                             active:bg-emerald-600 
                             font-bold 
                             uppercase 
                             text-sm 
                             px-6 
                             py-3 
                             rounded 
                             shadow 
                             hover:shadow-lg 
                             outline-none 
                             focus:outline-none 
                             mr-1 
                             mb-1 
                             ease-linear 
                             transition-all 
                             duration-150"
                    type="submit"
                    disabled={pristine || submitting}
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
    );
};


const mapStateToProps = (state, props) => {
  console.log("PROPS-M", props)
console.log("STASTE", state.entities)
  return {
    entities: state.entities,
    initialValues: {
      props,
      entities: (['properties', props.id])
      // rating: 5,
      // description: "The Football Is Good For Training And Recreational Purposes",
      // beds: 5,
      // price: 871,
      // userId: 337,
      // img: 'img',
      // baths: 2,
    }
  }
  
}


// const mapStateToProps = (state, props) => ({
//   initialValues: state.initialName
  
// })

PropertiUpdate = reduxForm({
  form: "updateProperty",
  onSubmit: values => console.log('sended', values),
  // enableReinitialize : true
})(PropertiUpdate)

PropertiUpdate = connect(
  mapStateToProps,
  // state => ({
  //   initialValues: state,
     
  // })
)(PropertiUpdate);

export default PropertiUpdate;





// const hoc = reduxForm({form: 'updateProperty'})(PropertiUpdate);

//@ts-ignore
// hoc.getInitialProps = ctx => PropertiUpdate.getInitialProps ? PropertiUpdate.getInitialProps(ctx) : {};
// export default hoc;


