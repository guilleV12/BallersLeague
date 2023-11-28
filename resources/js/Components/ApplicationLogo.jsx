import logo from "./Images/TPFL.png";
import logoSinTxt from "./Images/LogoNoTxt.png";

export default function ApplicationLogo({className='', texto=false, ...props}) {
    return (
        <img src={texto?logo:logoSinTxt} alt="Ballers League logo" title="Ballers League logo" className={className} {...props}/>
        )
}
