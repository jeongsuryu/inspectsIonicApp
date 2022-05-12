import React from "react";
import { Link } from 'react-router-dom';


const Category = (props) => {
    const type = props.type;
    const title = props.tit;
    const subtitle = props.subtit;

    const link = type === 'dementia' ? '/intro' : `/inspects/${type}`;

    return (
        <Link to={link} className="box_wrap">
            <figure className={`box_area ${type}`}>
                <img src={`/assets/icon_${type}.svg`} alt="아이콘" />
                <figcaption>
                    <h3 className="category_tit">{title}</h3>
                    <p className="category_subtit">CareU - {subtitle} Test</p>          
                </figcaption>                        
            </figure>
        </Link>
    ); 
}

export default Category;