import logo from "./Images/TPFL.png";

export default function ApplicationLogo({className='', ...props}) {
    return <img src={logo} alt="Ballers League logo" title="Ballers League" className={className} {...props}/>
}
