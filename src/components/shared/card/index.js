import React from 'react';
import './styles.css'

const Card = (props) => (
    <div className="card">
        <div className="card__inner">
            {props.withHeader && 
                <div className="card__header">
                    {props.withHeader}
                </div>}
                <div className="card__content">
                    {props.children}
                </div>
                {props.withFooter && 
                <div className="card__footer">
                    {props.withFooter}
                </div>}    
        </div>
    </div>    
);

export default Card;
