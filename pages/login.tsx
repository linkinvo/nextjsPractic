
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { connect } from 'react-redux';
import saga from "redux/decorators/saga";
import Entity from "redux/models/Entity";
import Identity from "redux/models/Identity";
import wrapper from "redux/store/store";


interface MyProps {
    sagaLogin: any;
    logout
}

@saga(Identity)
export class Login extends React.Component<MyProps> {

    loginUser = async event => {
        event.preventDefault();
        this.props.sagaLogin({
            email: event.target.email.value,
            password: event.target.password.value,
        });
    }

    logout() {
        const {logout} = this.props;
        logout()
    }

    render() {
        return (
            <div className="relative">
                <img
                    src="https://vwartclub.com/media/projects/1700/2.jpg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                    className="absolute inset-0 object-cover w-full h-full"
                    alt="img"
                />
                <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
                    <svg
                        className="absolute inset-x-0 bottom-0 text-white"
                        viewBox="0 0 1160 163"
                    >
                        <path
                            fill="currentColor"
                            d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                        />
                    </svg>
                    <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                        <div className="flex flex-col items-center justify-between xl:flex-row">
                            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                                    Title<br className="hidden md:block" />
                                    Description
                                </h2>
                                <p className="max-w-xl mb-4 text-base text-white md:text-lg">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                    accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                                    quae.
                                </p>
                                <a
                                    href="/"
                                    aria-label=""
                                    className="inline-flex items-center font-semibold border-collapse tracking-wider transition-colors duration-200 text-white hover:text-teal-accent-700"
                                >
                                    Learn more
                                    <svg
                                        className="inline-block w-3 ml-2"
                                        fill="currentColor"
                                        viewBox="0 0 12 12"
                                    >
                                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                                    </svg>
                                </a>
                            </div>
                            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                                    <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                                        Welcome ! let's login
                                    </h3>
                                    <br />
                                    {/* onSubmit={this.handleSubmit}  */}
                                    <form onSubmit={this.loginUser}  >
                                        <div className="mb-1 sm:mb-2">
                                            <label
                                                htmlFor="email"
                                                className="inline-block mb-1 font-medium"
                                            >
                                                E-mail
                                            </label>
                                            <input
                                                placeholder="john.doe@example.org"
                                                // onChange={this.handleChange}
                                                required
                                                type="text"
                                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                id="email"
                                                name="email"
                                            />
                                        </div>
                                        <br />
                                        <div className="mb-1 sm:mb-2">
                                            <label
                                                htmlFor="password"
                                                className="inline-block mb-1 font-medium"
                                            >
                                                Password
                                            </label>
                                            <input
                                                placeholder="password"
                                                // onChange={this.handleChange}
                                                required
                                                type="password"
                                                className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                                                id="password"
                                                name="password"
                                            />
                                        </div>
                                        <br />
                                        <div className="mt-4 mb-2 sm:mb-4">
                                            <button
                                                type="submit"
                                                className="inline-flex items-center text-black justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                                            >
                                                Sign-in
                                            </button>
                                        </div>
                                        <br />
                                        <p className="flex flex-wrap justify-center gap-5 text-xs text-gray-600 sm:text-sm">
                                            No account ?
                                            <Link href={`/registration`}>
                                                <a className=' text-blue-500' href='#'>sign Up</a>
                                            </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    const action = Identity.getListAction('sagaLogin')

    return {
        sagaLogin: (data) => dispatch(action({
            email: data.email,
            password: data.password
        }))
    }
}
//Identity.getOneAction('sagaLogin')
export default connect(null,mapDispatchToProps)(Login);