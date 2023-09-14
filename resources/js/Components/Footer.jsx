import React from "react";
import TextInput from "./TextInput";
import SecondaryButton from "./SecondaryButton";
import { ItemsContainer } from "./ItemsContainer";
import { SocialIcons } from "./SocialIcons";
import { Icons } from "./Footer/menu";

const Footer = () => {

    return (
        <footer className="bg-gray-900 text-white">
            <ItemsContainer/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400
                text-sm pb-8">
                    <span>© 2023. Derechos reservados.</span>
                    <span>Terminos y condiciones.</span>
                    <SocialIcons icons={Icons}/>
            </div>
        </footer>
    );
};

export default Footer;