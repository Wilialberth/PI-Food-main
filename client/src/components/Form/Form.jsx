import { useState } from "react"
import validation from "../Validation/Validation"
import style from "./Form.module.css"

const Form = ({login}) => {

    const [errors, setErrors] = useState({

    })

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
        setErrors(validation({
            ...userData,
            [event.target.name] : event.target.value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        login(userData);
    }

    return(

        <div className={style.fullScreen}>
        
        <form className={style.contenedor} onSubmit={handleSubmit}>

        <div className={style.container} >
            <label className={style.email} htmlFor="email">Email: </label>
            <input name="email" type="email" value={userData.email} onChange={handleChange} className={style.input}/>
            {errors.email && <p className={style.errorEmail} >{errors.email}</p>}
        </div>

        <div className={style.container} >   
            <label className={style.password} htmlFor="password">Password: </label>
            <input name="password" type="text" value={userData.password} onChange={handleChange} className={style.input}/>
            {errors.password && <p className={style.errorPassword} >{errors.password}</p>}
        </div>

            <button className={style.submit} >Submit</button>

        </form>

        </div>

    )
}
export default Form