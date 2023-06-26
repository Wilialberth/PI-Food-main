import { Link } from "react-router-dom";
import style from "./Card.module.css"


export default function Card({ id, name, image, diets }) {
   
   return (
      <div className={style.contenedor} >
         <Link to={`/detail/${id}`} className={style.link}>
         <h2 className={style.diet} >{name}</h2>
         </Link>
         <img src={image} alt='' className={style.image} />
         <h2 className={style.diet} >Diets: {diets}</h2>
      </div>
   );
}