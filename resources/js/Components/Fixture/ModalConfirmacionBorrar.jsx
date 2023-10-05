import React from 'react';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

export const ModalConfirmacionBorrar = ({ closeModalGenerarFixture, closeModalConfirmacionFixture, confirmar }) => {
    const handleCancel = () =>{
        closeModalConfirmacionFixture();
        closeModalGenerarFixture();
    };

return (
    <div id="delete-confirmation-modal" className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center w-full h-full p-4 overflow-x-hidden overflow-y-auto`}>
        <div className="relative w-full max-w-md max-h-full shadow-lg border-black border rounded-lg">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-5 border-b rounded-t bg-orange-500 dark:border-gray-600">
                                <h3 className="text-xl font-medium text-white dark:text-white">
                                    Advertencia!
                                </h3>
                        </div>
                        <div className="p-6 space-y-6 bg-white">
                                <p className="text-lg leading-relaxed text-black dark:text-gray-400">
                                    Usted ya tiene un fixture generado, si quiere crear uno nuevo se eliminara.
                                </p>
                        </div>
                        <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <PrimaryButton className='' onClick={confirmar}>Entendido</PrimaryButton>
                                <SecondaryButton onClick={handleCancel}>Cancelar</SecondaryButton>
                        </div>
                </div>
        </div>
    </div>
  )
}
