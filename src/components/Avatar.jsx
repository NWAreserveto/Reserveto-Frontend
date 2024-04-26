import React from 'react';
import style from "../styles/Avatar.module.scss"
const Avatar = ({ src, alt }) => {
  return (
    <div className={style.container}>
        <img className={style.avatar} src={src} alt={alt}></img>
    </div>
  );
};

export default Avatar;