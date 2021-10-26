import React from 'react';
import styles from './FormsControls.module.css'

{/* <div className={style.formControl + "" + styles.error}> */}


export const Input = ({input, meta, ...props}) => {
    const hesErrorField = meta.touched && meta.error;
    return (
        <div className='border'>
            <div>
            <input {...input} {...props} />
            </div>
            <div>
           {hesErrorField && <span className="text-xs text-red-700" id="passwordHelp">{meta.error}</span>}
            </div>
        </div>
    )
}