import banner1 from "./Images/Banner.png";

export default function Banners({className='', numero, ...props}) {
    return (
        <img src={`${banner1}`} alt="Ballers League banner" title="Ballers League banner" className={className} {...props}/>
        )
}
