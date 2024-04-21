import style from '../styles/About.module.scss'
import AboutPic from '../images/about.png'

const About = () => {
  return (
    <div className={style.about} id='about'>
        <div className={style.container}>
          <div className={style.col1}>
            <h3>درباره ما</h3>
            <p>سایت رزروتو یک پلتفرم آنلاین است که به شما  این امکان را می‌دهد که به راحتی و با چند کلیک ساده،بین آرایشگران متفاوت با توجه به خواسته خود زمان مورد نظر را برای آرایشگاه انتخاب کنید </p>
          </div>
          <div className={style.col2}>
           <img src={AboutPic} alt="reserveto" />
          </div>
        </div>
    </div>
  )
}



export default About